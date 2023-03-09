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
          <Link href={`/category/${category.slug}`} key={category.slug}>
            <span className="category">{category.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
