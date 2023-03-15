export interface CategoryInterface {
  name: string;
  slug: string;
}

export interface PostInterface {
  id: number;
  title: string;
  slug: string;
  author: {
    id: number;
    name: string;
    email: string;
    username: string;
  };
  categories: [category: CategoryInterface];
  body: string;
  excerpt: string;
  created_at: string;
  updated_at: string;
}
