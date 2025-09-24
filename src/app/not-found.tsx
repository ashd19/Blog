import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid  place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-400">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
           <Button asChild variant='outline'>
            {/*  don't render your own element  ,  let me do it */}
            <Link href='/'>Go To home</Link>
            
           </Button>
            <a href="#" className="text-sm font-semibold text-white">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
