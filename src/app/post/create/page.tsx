import PostForm from "@/components/post/post-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function CreatePost() {

  return (
    <div>
      <main className="py-10">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold">
                Create New Post
              </CardTitle>
              <CardContent />
              <PostForm />
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default CreatePost;
