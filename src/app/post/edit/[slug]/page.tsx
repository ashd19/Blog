import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { toast } from "sonner";

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
  return <div></div>;
}

export default EditPostPage;
