import { Link } from "react-router";

function ErrorPage() {
  return (
    <main className="py-16 w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-3xl font-semibold">404</h1>
        <p className="text-xl">Page not found</p>
        <Link
          to="/"
          className="text-xl font-semibold text-black text-center border-2 border-black px-3 py-1 rounded-sm hover:bg-black hover:text-white transition-all duration-100 ease-linear"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
}

export default ErrorPage;
