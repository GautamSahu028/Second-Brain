import React from "react";
import { Card } from "./Card";
interface CardsProps {
  data: Object[];
}

const Cards: React.FC<CardsProps> = ({ data }) => {
  return (
    <div className="flex md:flex-wrap md:flex-row flex-col align-center gap-x-4 gap-y-4 pl-20 md:pl-72 mr-18 h-full mt-4">
      {data && data.length > 0 ? (
        // @ts-ignore
        data.map(({ _id, link, type, title, tags, date }) => (
          <Card
            key={_id}
            contentId={_id}
            link={link}
            type={type}
            title={title}
            tags={tags}
            addedDate={date}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-screen w-full">
          <p>Add Memory</p>
        </div>
      )}
    </div>
  );
};

export default Cards;
