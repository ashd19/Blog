import PostList from "@/components/post/post-list";
import { getAllPosts } from "@/lib/db/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blog",
  description:
    "A simple blog built with Next.js, Tailwind CSS, and Drizzle ORM",
};

const page = async () => {
  const rawPosts = await getAllPosts();
  const posts =
    rawPosts?.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      slug: post.slug,
      createdAt: post.createdAt,
      author: {
        name: post.author?.name ?? "Unknown",
      },
    })) ?? [];
  // const posts = await getAllPosts();

  const postcard = rawPosts?.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    slug: post.slug,
    createdAt: post.createdAt,
    author: {
      name: post.author?.name ?? "Unknown",
    },
  }));

  return (
    <main className="py-10">
      <div className="max-w-7-xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Welcome to the Blog</h1>
        {posts.length === 0 ? (
          <div className="text-center py-10-">
            <h2 className="text-xl font-medium">No Posts Yet</h2>
          </div>
        ) : (
          <PostList posts={posts} />
          // <PostList posts={posts} postcard={postcard} />
        )}
      </div>
    </main>
  );
};

export default page;
