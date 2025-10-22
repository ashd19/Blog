import Container from "@/components/layout/container";
import PostForm from "@/components/post/post-form";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

async function EditPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!post) {
    notFound();
  }
  // otherwise user could directly type the edit url and edit other's posts.
  if (post.authorId != session?.user?.id) {
    redirect("/");
  }
  return (
    <Container>
      <h1 className="max-w-2xl text-4xl mt-1 font-bold mb-6">Edit Post</h1>
      <PostForm
        isEditing={true}
        post={{
          id: post.id,
          title: post.title,
          description: post.description,
          content: post.content,
          slug: post.slug,
        }}
      />
    </Container>
  );
}

export default EditPostPage;
