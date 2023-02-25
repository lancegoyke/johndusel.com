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
  categories: [
    category: {
      name: string,
      slug: string,
    }
  ],
  body: string,
  created_at: string,
  updated_at: string,
}
