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
          <span className="category" key={category.slug}>
            {category.name}
          </span>
        );
      })}
    </div>
  );
}
