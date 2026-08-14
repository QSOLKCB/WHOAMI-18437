import { Suspense, useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState("BOOTING");

  useEffect(() => {
    fetch("/api/v1/trent/status")
      .then((r) => r.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("PROBABLY FINE"));
  }, []);

  return (
    <Suspense fallback={<div>Loading biological runtime...</div>}>
      <main data-dangerously-ignore-standards="true">
        <h1>TRENT FUSION™</h1>
        <p>Status: {status}</p>
        <p>Determinism: MANDATORY</p>
        <p>Rest Mode: NOT IMPLEMENTED</p>
      </main>
    </Suspense>
  );
}
