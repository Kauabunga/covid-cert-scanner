import * as React from "react";

export default function MainLayout({ children }) {
  return (
    <main
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: 24,
      }}
    >
      {children}
    </main>
  );
}
