import { parseISO, format } from "date-fns";

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);
  return (
    <div className="date">
      Posted on
      <br />
      <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>
    </div>
  );
}
