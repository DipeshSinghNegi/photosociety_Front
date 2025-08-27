"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image"; // Only for your logo at the top, not for dynamic photos

const MIN_DISPLAY_MS = 5000; // Each image at least 5 seconds

export default function Main() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5001";
  const [err, setErr] = useState<string>("");

  const lastSwapAtRef = useRef<number>(0);

  const preload = (src: string): Promise<boolean> =>
    new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });

  useEffect(() => {
    let cancelled = false;

    const fetchPhoto = async () => {
      try {
        const r = await fetch(`${apiBase}/display_pic?ts=${Date.now()}`, {
          cache: "no-store",
        });
        if (r.ok) {
          const d = await r.json();
          if (d?.photo) {
            const fullUrl = d.photo.startsWith("http")
              ? d.photo
              : `${apiBase}${d.photo}`;
            if (!cancelled && (await preload(fullUrl))) {
              setImgSrc(fullUrl);
              setErr("");
              lastSwapAtRef.current = Date.now();
            }
          }
        } else {
          setErr("No photo yet.");
        }
      } catch {
        setErr("Error fetching photo.");
      }
    };

    fetchPhoto(); // initial fetch
    const interval = setInterval(fetchPhoto, 3000); // poll every 3s
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [apiBase]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ff 0%, #fff 50%, #f3e8ff 100%)",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      {/* HEADER with logo - FIXED: No gap between logo and status */}
      <div
        style={{
          textAlign: "center",
          padding: "36px 0 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <img
          src="img/logo.png"
          alt="Photo Society Logo"
          style={{
            width: 80,
            height: 60,
            objectFit: "contain",
            margin: "0 auto 4px",
            display: "block",
            filter: "drop-shadow(0 4px 12px rgba(103, 72, 228, 0.12))",
          }}
        />

        {/* Status text */}
        <div
          style={{
            margin: "0",
            fontSize: "1.15rem",
            color: "#10b981",
            fontWeight: 700,
            letterSpacing: "0.01em",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "0.5rem 1.5rem",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              background: "#10b981",
              borderRadius: "50%",
              display: "inline-block",
              boxShadow: "0 0 16px #10b981, 0 0 2px #10b981",
              marginRight: 8,
              animation: "feedpulse 1.4s infinite",
            }}
          />
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.15rem",
              letterSpacing: "0.01em",
              textShadow: "0 1px 8px #10b98122",
            }}
          >
            Live & Receiving Photos
          </span>
        </div>
      </div>

      {/* MAIN DISPLAY */}
      <div
        style={{
          maxWidth: 900,
          margin: "34px auto",
          background: "rgba(255,255,255,0.93)",
          borderRadius: 32,
          boxShadow: "0 8px 32px 0 rgba(99,102,241,0.14)",
          border: "1px solid #e0e7ff",
          padding: "32px 16px 24px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {imgSrc ? (
          <>
            <img
              src={imgSrc}
              alt="Current event photo"
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: 540,
                margin: "0 auto",
                borderRadius: "20px",
                boxShadow:
                  "0 8px 32px rgba(103,72,234,0.13),0 0 1px #e0e7ff",
              }}
            />
            <div style={{ height: 16 }} />
            {err && (
              <div
                style={{
                  color: "#e11d48",
                  background: "#fef2f2",
                  borderRadius: 8,
                  padding: "8px 14px",
                  fontWeight: 500,
                  maxWidth: 400,
                  margin: "16px auto 0",
                }}
              >
                {err}
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              color: "#6b7280",
              fontSize: 21,
              fontWeight: 400,
              padding: "30px 0",
            }}
          >
            {err ? (
              <>{err}</>
            ) : (
              <>
                <span style={{ fontSize: 38 }}>🕰️</span>
                <br />
                No image yet — waiting…
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer status WITH LIVE WAVE */}
      <div
        style={{
          textAlign: "center",
          margin: "10px auto 0",
          color: "#a76",
          fontSize: 19,
          fontWeight: 500,
          opacity: 0.93,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        Photos updating in real time. Enjoy the event!
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <span
            style={{
              width: "3px",
              height: "12px",
              background: "#a78bfa",
              borderRadius: "2px",
              animation: "wave1 1.2s infinite ease-in-out",
            }}
          ></span>
          <span
            style={{
              width: "3px",
              height: "16px",
              background: "#10B981",
              borderRadius: "2px",
              animation: "wave2 1.2s infinite ease-in-out",
            }}
          ></span>
          <span
            style={{
              width: "3px",
              height: "10px",
              background: "#a78bfa",
              borderRadius: "2px",
              animation: "wave3 1.2s infinite ease-in-out",
            }}
          ></span>
          <span
            style={{
              width: "3px",
              height: "14px",
              background: "#10B981",
              borderRadius: "2px",
              animation: "wave4 1.2s infinite ease-in-out",
            }}
          ></span>
        </span>
      </div>

      <style jsx>{`
        @keyframes feedpulse {
          0%,
          100% {
            box-shadow: 0 0 16px #10b981, 0 0 2px #10b981;
            opacity: 1;
          }
          50% {
            box-shadow: 0 0 32px #10b981, 0 0 40px #10b98166;
            opacity: 0.7;
          }
        }
        @keyframes wave1 {
          0%,
          40%,
          100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1.2);
          }
        }
        @keyframes wave2 {
          0%,
          40%,
          100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1);
          }
        }
        @keyframes wave3 {
          0%,
          40%,
          100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1.4);
          }
        }
        @keyframes wave4 {
          0%,
          40%,
          100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(0.8);
          }
        }
        span:nth-child(1) {
          animation-delay: 0s;
        }
        span:nth-child(2) {
          animation-delay: 0.1s;
        }
        span:nth-child(3) {
          animation-delay: 0.2s;
        }
        span:nth-child(4) {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
