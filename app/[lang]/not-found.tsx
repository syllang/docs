import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-fd-muted-foreground">This page is not available.</p>
      <Link className="mt-8 w-fit rounded-full border px-4 py-2 text-sm font-semibold" href="/docs">
        Go to docs
      </Link>
    </main>
  );
}
