import "./globals.css";

// Global fallback for unmatched routes outside the [locale] segment.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          background: "#f6f2ea",
          color: "#14171c",
        }}
      >
        <p style={{ fontSize: "4rem", color: "#b8935a", margin: 0 }}>404</p>
        <p style={{ marginTop: "1rem" }}>This page could not be found.</p>
        <a href="/" style={{ marginTop: "1.5rem", color: "#b8935a" }}>
          Return home
        </a>
      </body>
    </html>
  );
}
