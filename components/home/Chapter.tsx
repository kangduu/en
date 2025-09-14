interface ChapterProps {
  title: React.ReactNode;
  desc: React.ReactNode;
}
export default function Chapter({ title, desc }: ChapterProps) {
  return (
    <>
      <h2 className="text-3xl m-0">{title}</h2>
      <div className="text-muted font-normal leading-6">{desc}</div>
    </>
  );
}
