import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { posts } from "./schema";

// get all posts
export async function getAllPosts() {
  try {
    const getAllPosts = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
      // relation Imp ortant for getting author details ***
      with: {
        author: true,
      },
    });

    return getAllPosts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// get post by slug
export async function getPostBySlug(slug: string) {
  try {
    const getPostBySlug = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      with: { author: true },
    });
    return getPostBySlug;
  } catch (error) {
    console.log(error);
    return null;
  }
}
