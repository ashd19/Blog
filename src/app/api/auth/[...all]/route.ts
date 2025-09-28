import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth.handler);

export const POST = async (req: Request) => {
  try {
    return await handler.POST(req); // ✅ call POST explicitly
  } catch (err) {
    console.error("Better Auth POST error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};

export const GET = async (req: Request) => {
  try {
    return await handler.GET(req); // ✅ call GET explicitly
  } catch (err) {
    console.error("Better Auth GET error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
