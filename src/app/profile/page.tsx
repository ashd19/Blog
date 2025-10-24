import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, FileText, Edit, Plus } from "lucide-react";
import Link from "next/link";

async function getUserPosts(userId: string) {
  try {
    return await db.query.posts.findMany({
      where: eq(posts.authorId, userId),
      orderBy: [desc(posts.createdAt)],
      with: {
        author: true,
      },
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
}

async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/auth");
  }

  const userPosts = await getUserPosts(session.user.id);

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      {/* User Profile Card */}
      <Card className="p-8 mb-8 bg-card border border-border">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border border-border">
            <User className="text-muted-foreground" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              {session.user.name}
            </h1>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Calendar size={14} />
              Member since{" "}
              {new Date(session.user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground">
              {userPosts.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground">
              {
                userPosts.filter(
                  (post) =>
                    new Date(post.createdAt).getMonth() ===
                    new Date().getMonth()
                ).length
              }
            </div>
            <div className="text-sm text-muted-foreground">This Month</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground">
              {session.user.emailVerified ? "Verified" : "Unverified"}
            </div>
            <div className="text-sm text-muted-foreground">Email Status</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button asChild>
            <Link href="/post/create">
              <Plus size={16} className="mr-2" />
              New Post
            </Link>
          </Button>
          <Button variant="outline">
            <Edit size={16} className="mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* User Posts Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText size={24} />
            Your Posts
          </h2>
        </div>

        {userPosts.length === 0 ? (
          <Card className="p-8 text-center bg-card border border-border">
            <FileText
              className="mx-auto mb-4 text-muted-foreground"
              size={48}
            />
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              No posts yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start sharing your thoughts with the world!
            </p>
            <Button asChild>
              <Link href="/post/create">
                <Plus size={16} className="mr-2" />
                Create Your First Post
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {userPosts.map((post) => (
              <Card
                key={post.id}
                className="p-6 bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      <Link
                        href={`/post/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      {post.createdAt !== post.updatedAt && (
                        <span className="text-xs">
                          Updated{" "}
                          {new Date(post.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/post/edit/${post.slug}`}>
                        <Edit size={14} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Profile;
