import { PostCardProps } from "@/lib/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

function PostCard({ postcard }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <Link className="hover:underline" href={`/post/${postcard.slug}`}>
          <CardTitle className="text-2xl">{postcard.title}</CardTitle>
        </Link>
        <CardDescription>
            By - {postcard.author.name}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default PostCard;
