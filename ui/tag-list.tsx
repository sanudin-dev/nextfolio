type Props = {
  tags: string[];
  className?: string;
};

export default function TagList({ tags, className }: Props) {
  if (tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1 ${className ?? "mt-3"}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
