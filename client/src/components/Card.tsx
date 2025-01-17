import { DeleteIcon } from "../icons/DeleteIcon.tsx";
import { ShareIcon } from "../icons/ShareIcon.tsx";
import { ArticleIcon } from "../icons/ArticleIcon.tsx";
import { TweetIcon } from "../icons/TweetIcon.tsx";
import Tags from "./Tags.tsx";
import { YoutubeIcon } from "../icons/YoutubeIcon.tsx";
import axios from "axios";
import { BACKEND_URL } from "../config.tsx";
import { DefaultValue, useRecoilState } from "recoil";
import { readMore } from "../store/readMore.atom.tsx";
import { ImageIcon } from "../icons/ImageIcon.tsx";

interface CardProps {
  contentId: string; // Change from key to contentId
  link: string;
  type: string;
  title: string;
  tags: string[];
  addedDate: string;
  desc: string;
  viewOnly?: boolean;
}

export const Card = ({
  contentId,
  link,
  type,
  title,
  tags,
  addedDate,
  desc,
  viewOnly,
}: CardProps) => {
  const renderIcon = () => {
    switch (type) {
      case "video":
        return <YoutubeIcon size="md" />;
      case "tweet":
        return <TweetIcon size="md" />;
      case "article":
        return <ArticleIcon size="md" />;
      case "image":
        return <ImageIcon size="md" />;
      default:
        return null;
    }
  };

  const renderMedia = () => {
    if (type === "video") {
      const videoIdMatch = link.match(
        /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      const embedUrl = videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : link;

      return (
        <iframe
          className="w-full h-40 rounded object-contain"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      );
    } else if (type === "tweet") {
      const twitterLink = link.replace(
        /^https:\/\/x\.com/,
        "https://twitter.com"
      );

      return (
        <blockquote className="twitter-tweet">
          <a href={twitterLink}>View Tweet</a>
        </blockquote>
      );
    } else if (type === "article") {
      return (
        <a
          href={link}
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read Article
        </a>
      );
    } else if (type === "image") {
      return (
        <img
          src={link}
          alt={title}
          className="w-full h-60 object-contain rounded hover:cursor-pointer bg-gray-100"
          onError={(e) => (e.currentTarget.src = "fallback-image-url")}
          onClick={() => window.open(link, "_blank")}
        />
      );
    } else {
      return <p className="text-gray-500">Unsupported content type</p>;
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this content?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: accessToken,
          contentId: contentId, // Send contentId in headers
        },
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        alert(`Failed to delete content: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("An error occurred while deleting the content. Please try again.");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link.");
      console.error("Error copying text: ", err);
    }
  };

  const [isReadMore, setIsReadMore] = useRecoilState(readMore(contentId));

  return (
    <div className="p-4 bg-white rounded-md border border-gray-200 w-fit h-fit max-w-xs">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">{renderIcon()}</div>
          <span>{title}</span>
        </div>
        <div className="flex items-center">
          <div
            className="text-gray-500 pr-2 hover:cursor-pointer"
            onClick={handleCopy}
          >
            <ShareIcon size="md" />
          </div>
          {viewOnly ? null : (
            <div
              className="text-gray-500 hover:cursor-pointer"
              onClick={handleDelete}
            >
              <DeleteIcon size="md" />
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">{renderMedia()}</div>

      <div className="mt-2">
        <p>
          {isReadMore ? desc : desc.substring(0, 150) + "..."}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsReadMore(!isReadMore)}
          >
            {isReadMore ? " read less" : "read more"}
          </span>
        </p>
      </div>

      <Tags tags={tags} />

      <div className="text-gray-500 text-md mt-2">
        <p>Added on {addedDate}</p>
      </div>
    </div>
  );
};
