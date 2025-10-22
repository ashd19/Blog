export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <section className="bg-card rounded-xl shadow-lg border border-border p-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          About BlogVerse
        </h1>
        <p className="text-muted-foreground mb-6 text-base">
          BlogVerse is a modern, community-driven platform for writers and
          readers. We help creators share their stories, grow their audience,
          and connect with like-minded people—all in a beautiful,
          distraction-free environment.
        </p>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1 text-foreground">
            Our Mission
          </h2>
          <p className="text-muted-foreground text-sm">
            Empower every writer to publish, engage, and thrive. We believe in
            open expression, thoughtful discussion, and building a supportive
            creative community.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1 text-foreground">
            What We Offer
          </h2>
          <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
            <li>Beautiful, customizable blog themes</li>
            <li>Built-in audience engagement tools</li>
            <li>SEO optimization and analytics</li>
            <li>Community features and networking</li>
            <li>Monetization options for creators</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <span className="text-xs text-muted-foreground">
            Contact us:{" "}
            <a
              href="mailto:help@blogverse.com"
              className="underline hover:text-primary"
            >
              help@blogverse.com
            </a>
          </span>
          <span className="text-xs text-muted-foreground">
            Made with ❤️ by the BlogVerse team
          </span>
        </div>
      </section>
    </main>
  );
}
