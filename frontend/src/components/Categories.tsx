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
          <div className="category">
            <Link href={`/category/${category.slug}`} key={category.slug}>
              {category.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
