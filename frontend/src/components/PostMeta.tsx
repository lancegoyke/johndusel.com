import Categories from "../components/Categories";
import Date from "../components/Date";
import { CategoryInterface } from "../interfaces/PostInterface";

export default function PostMeta({
  categories,
  date,
}: {
  categories: CategoryInterface[];
  date: string;
}) {
  return (
    <div className="post-meta">
      <Date dateString={date} />
      {categories && <Categories categories={categories} />}
    </div>
  );
}
