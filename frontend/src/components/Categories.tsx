import Link from "next/link";
import { CategoryInterface } from "../interfaces/PostInterface";

export default function Categories({
  categories,
}: {
  categories: CategoryInterface[];
}) {
  return (
    <div className="categories">
      {categories.map((category) => {
        return (
          <div className="category" key={category.slug}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </div>
        );
      })}
    </div>
  );
}
