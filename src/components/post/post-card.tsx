import { PostCardProps } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

function PostCard({ postcard }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <Link className="hover:underline" href={`/post/${postcard.slug}`}>
          <CardTitle className="text-3xl">{postcard.title}</CardTitle>
        </Link>
      </CardHeader>
    </Card>
  );
}

export default PostCard;
