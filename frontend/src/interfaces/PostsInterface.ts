export default interface PostsInterface {
  posts: [
    post: {
      id: number,
      title: string,
      slug: string,
      author: {
        id: number,
        name: string,
        email: string,
        username: string,
      },
      content: string,
      created_at: string,
      updated_at: string,
    }
  ];
}