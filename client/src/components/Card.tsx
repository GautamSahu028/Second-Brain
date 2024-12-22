import { DeleteIcon } from "../icons/DeleteIcon.tsx";
import { ShareIcon } from "../icons/ShareIcon.tsx";
import { ArticleIcon } from "../icons/ArticleIcon.tsx";
import { TweetIcon } from "../icons/TweetIcon.tsx";
import Tags from "./Tags.tsx";
import { YoutubeIcon } from "../icons/YoutubeIcon.tsx";

interface CardProps {
  link: string;
  type: string;
  title: string;
  tags: string[];
  addedDate: string; // Added for flexibility in rendering date
}

export const Card = ({ link, type, title, tags, addedDate }: CardProps) => {
  const renderIcon = () => {
    switch (type) {
      case "video":
        return <YoutubeIcon size="md" />;
      case "tweet":
        return <TweetIcon size="md" />;
      case "article":
        return <ArticleIcon size="md" />;
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
          className="w-full h-40 rounded"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      );
    } else if (type === "tweet") {
      // Convert x.com URLs to twitter.com URLs
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
    } else {
      return <p className="text-gray-500">Unsupported content type</p>;
    }
  };

  return (
    <div className="p-4 bg-white rounded-md border border-gray-200 w-fit h-fit max-w-md">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">{renderIcon()}</div>
          <span>{title}</span>
        </div>
        <div className="flex items-center">
          <div className="text-gray-500 pr-2">
            <ShareIcon size="md" />
          </div>
          <div className="text-gray-500">
            <DeleteIcon size="md" />
          </div>
        </div>
      </div>

      <div className="pt-4">{renderMedia()}</div>

      <Tags tags={tags} />

      <div className="text-gray-500 text-md mt-2">
        <p>Added on {addedDate}</p>
      </div>
    </div>
  );
};
