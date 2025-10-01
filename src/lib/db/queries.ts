import { desc } from "drizzle-orm";
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
  }
}
