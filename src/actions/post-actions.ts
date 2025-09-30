"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(formdata: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      // this shouldn't work anyways as we have the post/create route protected ..
      return {
        redirect: "/auth",
        success: false,
        message: "You must be logged in to create a post.",
      };
    }

    //get form data  via their id's
    const title = formdata.get("title") as string;
    const description = formdata.get("description") as string;
    const content = formdata.get("content") as string;

    // create the slug  from title
    const slug = slugify(title);

    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message:
          "A post with this title already exists. Please choose another title.",
      };
    }
    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

    // revalidate the homepage to get the latest posts
    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post created successfully!",
      slug,
    };
  } catch (error) {
    return {
      success: true,
      message: "Failed to create the post. Please try again.",
    };
  }
}
