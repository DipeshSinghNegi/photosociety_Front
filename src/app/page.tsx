"use client";

export default function Home() {
  return (
    <div className="container">
      <main className="card">
        <h1 className="title">PhotoWall</h1>
        <h2 className="title">Welcome Freshers</h2>

        <p className="description">
          Share your moments by uploading your favorite photos and instantly see them appear in the live gallery.
        </p>

        <div className="button-group">
          <a href="/upload" className="btn primary">
            📷 Upload a Photo
          </a>
          <a href="/main" className="btn secondary">
            👀 View Live Gallery
          </a>
        </div>
      </main>

      {/* Embedded CSS */}
      <style jsx>{`
        /* Container setup */
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          font-family: sans-serif;
          background: linear-gradient(to bottom right, #e0e7ff, #ffffff, #f3e8ff);
        }

        /* Card styling */
        .card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border-radius: 24px;
          padding: 48px 32px;
          max-width: 500px;
          width: 100%;
          text-align: center;
        }

        /* Title with gradient text */
        .title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(to right, #4f46e5, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 24px;
        }

        /* Description text */
        .description {
          color: #4b5563;
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        /* Button group layout */
        .button-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .button-group {
            flex-direction: row;
          }
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s;
          text-decoration: none;
        }

        .btn:hover {
          transform: scale(1.05);
        }

        /* Primary button */
        .btn.primary {
          background: linear-gradient(to right, #4f46e5, #a855f7);
          color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        /* Secondary button */
        .btn.secondary {
          background: white;
          color: #4f46e5;
          border: 1px solid #c7d2fe;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .btn.secondary:hover {
          background: #eef2ff;
        }
      `}</style>
    </div>
  );
}
