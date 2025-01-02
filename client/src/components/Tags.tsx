import Tag from "./Tag.tsx";
interface TagsProp {
  tags: string[];
}
const Tags = (props: TagsProp) => {
  const tags = props.tags;
  return (
    <div className="pt-5 pb-5 flex flex-wrap">
      {tags.map((tag) => {
        return <Tag key={tag} tagName={tag} />;
      })}
    </div>
  );
};

export default Tags;
