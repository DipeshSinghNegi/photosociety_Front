// src/app/page.tsx
"use client";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 font-sans">
      <main className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-md w-full border border-gray-200 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Welcome
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          Share your moments with us by uploading your photos and instantly see them appear live on the event screen.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/upload"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Upload a Photo
          </a>
          <a
            href="/main"
            className="px-6 py-3 rounded-lg bg-white text-indigo-700 font-semibold border border-indigo-200 shadow-sm hover:bg-indigo-50 transition"
          >
            View Live Gallery
          </a>
        </div>
      </main>
    </div>
  );
}
