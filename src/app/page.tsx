import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PenTool,
  Users,
  Search,
  Zap,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
  BookOpen,
  Heart,
  Star,
} from "lucide-react";
import Link from "next/link";

function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground mb-6">
              <Star size={14} className="text-primary" />
              Modern blogging platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Share Your Stories with the{" "}
              <span className="text-primary">World</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              BlogVerse is a modern, community-driven platform for writers and
              readers. Create beautiful blogs, connect with your audience, and
              grow your reach.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/post/create">
                <PenTool className="mr-2" size={20} />
                Start Writing
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-lg px-8 py-6"
            >
              <Link href="/explore">
                <BookOpen className="mr-2" size={20} />
                Explore Posts
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">
                Active Writers
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">200+</div>
              <div className="text-sm text-muted-foreground">
                Published Posts
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">1K+</div>
              <div className="text-sm text-muted-foreground">Monthly Reads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Everything you need to blog
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you create, publish, and grow
              your audience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-card border border-border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PenTool className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Beautiful Editor
              </h3>
              <p className="text-muted-foreground">
                Write with a clean, distraction-free editor that helps you focus
                on your content.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border border-border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Community
              </h3>
              <p className="text-muted-foreground">
                Connect with fellow writers, share ideas, and build meaningful
                relationships.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border border-border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                SEO Optimized
              </h3>
              <p className="text-muted-foreground">
                Built-in SEO features help your content reach a wider audience
                organically.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border border-border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Fast & Reliable
              </h3>
              <p className="text-muted-foreground">
                Lightning-fast performance with 99.9% uptime. Your content is
                always available.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border border-border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Rich Content
              </h3>
              <p className="text-muted-foreground">
                Support for images, code blocks, and rich formatting to make
                your posts shine.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border border-border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Analytics
              </h3>
              <p className="text-muted-foreground">
                Track your post performance and understand your audience with
                detailed analytics.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-primary/5 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to start your blogging journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of writers who are already sharing their stories on
              BlogVerse. It&apos;s free to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/auth">
                  Get Started Free
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="text-lg px-8 py-6"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary" size={24} />
                <span className="text-xl font-bold text-foreground">
                  BlogVerse
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                A modern platform for writers and readers to connect, create,
                and share amazing content.
              </p>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://github.com/ashd19" target="_blank">
                    <Github size={16} />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://twitter.com" target="_blank">
                    <Twitter size={16} />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://linkedin.com" target="_blank">
                    <Linkedin size={16} />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="mailto:ashtondsouza192@gmail.com">
                    <Mail size={16} />
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Platform</h3>
              <div className="space-y-2 text-sm">
                <Link
                  href="/explore"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Explore Posts
                </Link>
                <Link
                  href="/post/create"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Write a Post
                </Link>
                <Link
                  href="/search"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Search
                </Link>
                <Link
                  href="/profile"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  My Profile
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <div className="space-y-2 text-sm">
                <Link
                  href="/about"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="mailto:help@blogverse.com"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <div className="space-y-2 text-sm">
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Writing Guide
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Community Guidelines
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2025 BlogVerse. Made with ❤️ by Ashton Dsouza. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Page;
