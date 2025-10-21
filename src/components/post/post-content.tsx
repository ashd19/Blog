import { PostContentProps } from "@/lib/types";
import { formatDate, formatDateInSec } from "@/lib/utils";
import { User } from "lucide-react";

function PostContent({ posts, isAuthor }: PostContentProps) {
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
    </section>
  );
}

export default PostContent;
