import fs from "fs";
import { Feed, FeedOptions } from "feed";
import { PostInterface } from "@/interfaces/PostInterface";
import { getPosts } from "@/utils/getPosts";

export const generateRssFeed = async () => {
  const posts: PostInterface[] = await getPosts();

  const feedOptions: FeedOptions = {
    title: `${process.env.SITE_TITLE}`,
    description: `${process.env.SITE_DESCRIPTION}`,
    id: `${process.env.SITE_URL}`,
    link: `${process.env.SITE_URL}`,
    language: "en",
    favicon: `${process.env.SITE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${process.env.SITE_TITLE}`,
    feedLinks: {
      rss2: `${process.env.SITE_URL}/rss.xml`,
    },
    author: {
      name: `${process.env.SITE_AUTHOR}`,
      email: `${process.env.SITE_EMAIL}`,
      link: `${process.env.SITE_URL}`,
    },
  };
  const feed = new Feed(feedOptions);

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${process.env.SITE_URL}/${post.slug}`,
      link: `${process.env.SITE_URL}/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.created_at),
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());
};
