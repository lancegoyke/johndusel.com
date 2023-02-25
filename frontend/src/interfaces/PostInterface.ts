export default interface CategoryInterface {
  name: string,
  slug: string,
}

export default interface PostInterface {
  id: number,
  title: string,
  slug: string,
  author: {
    id: number,
    name: string,
    email: string,
    username: string,
  },
  categories: [category: CategoryInterface],
  body: string,
  created_at: string,
  updated_at: string,
}
