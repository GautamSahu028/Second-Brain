import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { userAuthMiddleware } from "../middlewares/user.auth.middleware.js";
import { contentModel } from "../models/content.model.js";
import { tagModel } from "../models/tags.model.js";
import { linkModel } from "../models/links.model.js";
const userRouter = Router();

userRouter.post("/sign-up", async (req, res) => {
  // validate username and password using ZOD
  const requiredBody = z.object({
    name: z.string(),
    username: z.string().min(5),
    password: z
      .string()
      .min(8, "The password length must have minimum eight characters")
      .max(20, "The password is too long")
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/),
  });

  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    throw new ApiError(400, "Bad request");
  }

  // get the data from body
  const { name, username, password } = req.body;

  // check if user already exist
  const userExists = await userModel.findOne({
    username: username,
  });
  if (userExists) throw new ApiError(400, "User already Exists");

  // hash the password using bcrypt lib
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT)
  );

  // create a new user
  const user = await userModel.create({
    name,
    username,
    password: hashedPassword,
  });

  // Check if user is created
  const createdUser = await userModel.findById(user._id);
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully."));
});

userRouter.post("/sign-in", async (req, res) => {
  // get the data
  const { username, password } = req.body;

  // check if the incoming data is empty
  if (!username && !password) {
    throw new ApiError(400, "Please provide both email and password");
  }

  // check if the user exists in userModel
  const user = await userModel.findOne({ username });
  if (!user) {
    throw new ApiError(400, "User does not exist, Please sign-up");
  }

  // verify the password if the user exists
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new ApiError(403, "Invalid credentials");
  }

  // if password verified -> generate jwt
  const accessToken = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.JWT_USER_SECRET_KEY
  );

  // sign-in
  const signedInUser = await userModel.findById(user._id);
  if (!signedInUser) {
    throw new ApiError(500, "Internal server error.");
  }

  // return response
  return res
    .status(200)
    .header("authorization", accessToken)
    .json(
      new ApiResponse(
        200,
        accessToken,
        `User signed in successfully. Access_token`
      )
    );
});

userRouter.post("/content", userAuthMiddleware, async (req, res) => {
  const { type, link, title, tags, date } = req.body;
  const tagIds = await Promise.all(
    tags.map(async (tagTitle) => {
      let tag = await tagModel.findOne({ title: tagTitle });
      // console.log("Found Tag:", tag);
      if (!tag) {
        tag = await tagModel.create({ title: tagTitle });
        // console.log("Created Tag:", tag);
      }
      return tag._id;
    })
  );

  if (tags.length !== tagIds.length) {
    throw new ApiError(400, "Tags do not exist, Please create");
  }
  const content = await contentModel.create({
    type,
    link,
    title,
    tags: tagIds,
    userId: req.userId,
    date,
  });
  const createdContent = await contentModel.findOne(content._id);
  if (!createdContent) {
    throw new ApiError(500, "Internal server error");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, content, "Content created successfully"));
});

userRouter.get("/content", userAuthMiddleware, async (req, res) => {
  try {
    const user = req.userId;
    const allData = await contentModel.find({ userId: user });
    const temp = await contentModel
      .find({ userId: user })
      .populate("tags", "title");
    // const titles = temp.map((content) => content.tags.map((tag) => tag.title));
    // console.log(titles);
    // console.log(temp);

    // console.log(
    //   temp.map(
    //     (content) => content.tags.map((tag) => tag.title) // Map over the tags array to extract titles
    //   )
    // );

    // console.log(temp);

    // for (const obj of temp) {
    //   let titles = obj.tags.map((tag) => tag.title);
    //   obj.tags = titles;
    // }
    // console.log(temp);

    if (allData.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, "No content found for the user"));
    }
    const transformedData = allData.map((content) => ({
      ...content.toObject(), // Convert Mongoose document to plain object
      tags: content.tags.map((tag) => tag.title), // Replace tags with titles
    }));
    // console.log(transformedData);

    return res.status(200).json(new ApiResponse(200, allData));
  } catch (error) {
    console.error("Error fetching content:", error);
    return res.status(500).json(new ApiResponse(500, "Internal server error"));
  }
});

userRouter.delete("/content", userAuthMiddleware, async (req, res) => {
  try {
    const contentId = req.headers.contentid; // Extract contentId from headers
    if (!contentId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Content ID is required"));
    }

    const deletedContent = await contentModel.findOneAndDelete({
      _id: contentId,
      userId: req.userId,
    });
    if (!deletedContent) {
      return res.status(404).json(new ApiResponse(404, "Content not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Content deleted successfully"));
  } catch (error) {
    console.error("Error deleting content:", error);
    return res.status(500).json(new ApiResponse(500, "Internal server error"));
  }
});

userRouter.post("/share", userAuthMiddleware, async (req, res) => {
  try {
    const { share } = req.body;
    const user = req.userId;

    if (!share) {
      return res.status(400).json(new ApiResponse(400, "Share is required"));
    }

    let shareLink = await linkModel.findOne({ userId: user });
    if (!shareLink) {
      const shareHash = `${req.userId}-${Date.now()}`;
      shareLink = await linkModel.create({
        hash: shareHash,
        userId: user,
      });
    }

    const link = `https://yourdomain.com/brain/${shareLink.hash}`;

    return res
      .status(200)
      .json(
        new ApiResponse(200, { link }, "Shareable link generated successfully")
      );
  } catch (error) {
    console.error("Error generating shareable link:", error);
    return res.status(500).json(new ApiResponse(500, "Internal server error"));
  }
});

userRouter.get("/brain/:shareLink", async (req, res) => {
  try {
    const { hash } = req.params.shareLink;

    // Find the share link document
    const link = await linkModel.find({ hash });
    // console.log(link);

    if (!link) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Share link not found or sharing disabled"));
    }

    // Fetch the user's content
    const content = await contentModel.find({ userId: link.userId });

    // Fetch user
    const user = await userModel.findOne({ userId: link.userId });

    // Map content data to the desired format
    const contentData = content.map((item) => ({
      id: item._id,
      type: item.type,
      link: item.link,
      title: item.title,
      tags: item.tags.map((tagId) => tagId.toString()), // Convert ObjectId tags to strings
    }));

    // Return the response with the username and content data
    return res.status(200).json(
      new ApiResponse(200, {
        username: user.username,
        content: contentData,
      })
    );
  } catch (error) {
    console.error("Error fetching shareable link data:", error);
    return res.status(500).json(new ApiResponse(500, "Internal server error"));
  }
});

export { userRouter };
