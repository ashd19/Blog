"use client";
import { PostContentProps } from "@/lib/types";
import { formatDateInSec } from "@/lib/utils";
import { User, SquarePen, Trash2, XCircle, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePost } from "@/actions/post-actions";

function PostContent({ posts, isAuthor }: PostContentProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deletePost(posts.id);
      if (res?.success) {
        setShowConfirm(false);
        toast.success("Post deleted successfully!", { position: "top-center" });
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (e) {
      toast.error("Unable to delete post.");
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl bg-card rounded-xl shadow-lg border border-border p-8 mt-10 mb-16 transition-all">
      <h1 className="text-3xl font-bold mb-2 tracking-tight text-foreground">
        {posts.title}
      </h1>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border">
          <User className="text-muted-foreground" size={18} />
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <span className="font-medium text-foreground">
            {posts.author?.name ?? "Unknown"}
          </span>
          <span className="opacity-60">•</span>
          <span>{formatDateInSec(posts.updatedAt)} </span>
          {isAuthor && (
            <span className="ml-2 px-2 py-0.5 rounded bg-primary text-primary-foreground text-xs font-semibold shadow">
              You
            </span>
          )}
        </div>
      </div>
      {posts.description && (
        <blockquote className="mb-8 text-base text-muted-foreground italic border-l-4 border-primary pl-4 bg-muted/60 py-2 rounded">
          {posts.description}
        </blockquote>
      )}
      <hr className="my-6 border-border" />
      <article className="prose prose-neutral max-w-none whitespace-pre-wrap text-foreground text-base leading-relaxed">
        {posts.content}
      </article>
      <div className="flex mt-5 gap-5">
        {isAuthor ? (
          <>
            <Button variant={"outline"} onClick={() => router.push(`/explore`)}>
              Edit <SquarePen />
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => setShowConfirm(true)}
            >
              Delete <Trash2 />
            </Button>
          </>
        ) : null}
      </div>

      {/* Delete Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card border border-border rounded-xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center">
            <XCircle className="text-destructive mb-2" size={40} />
            <h2 className="text-lg font-bold mb-2 text-destructive">
              Delete Blog Post?
            </h2>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Are you sure you want to delete this blog post? <br />
              <span className="font-semibold text-destructive">
                This action cannot be undone and you will not be able to
                retrieve the blog once deleted.
              </span>
            </p>
            <div className="flex gap-4 mt-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
              >
                Cancel <XCircle className="ml-1" size={18} />
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                {!deleting ? "Delete" : "Deleting"}
                <CheckCircle className="ml-1" size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PostContent;
