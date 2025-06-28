import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        <nav className="bg-cyan-600 text-white px-6 py-4 shadow">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-lg font-bold">TodoApp</h1>
            <ul className="flex gap-6 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:underline">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/todo" className="hover:underline">
                  Todo
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
