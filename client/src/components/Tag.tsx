interface TagProps {
  tagName: string;
}

const Tag = (props: TagProps) => {
  return (
    <span className="bg-purple-300 text-purple-600 p-1 pl-2 pr-2 mr-2 mt-1 rounded-3xl items-center">
      #{props.tagName}
    </span>
  );
};

export default Tag;
