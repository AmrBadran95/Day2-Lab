import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <nav className="bg-cyan-600 text-white px-6 py-4 shadow-md">
          <ul className="flex gap-6 font-medium">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/(auth)/signup">Sign Up</Link>
            </li>
            <li>
              <Link href="/(auth)/signin">Sign In</Link>
            </li>
            <li>
              <Link href="/todo">Todo</Link>
            </li>
          </ul>
        </nav>
        <main className="max-w-3xl mx-auto py-10 px-4">{children}</main>
      </body>
    </html>
  );
}
