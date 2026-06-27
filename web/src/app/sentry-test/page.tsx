"use client";

import { useEffect } from "react";

export default function SentryTestPage() {
  useEffect(() => {
    // Automatically trigger a client-side ReferenceError on mount to test Sentry catching client-side errors
    const triggerError = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).myUndefinedFunction();
    };
    
    // Give it a brief delay to ensure the page has mounted and Sentry is active
    const timer = setTimeout(triggerError, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d1117] text-white p-6">
      <div className="card-dark max-w-md p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold font-display text-[var(--accent)]">Sentry Test Page</h1>
        <p className="text-sm text-white/70">
          We are automatically triggering a client-side exception in 1 second by calling:
        </p>
        <code className="block bg-black/40 p-3 rounded font-mono text-red-400 text-xs">
          myUndefinedFunction();
        </code>
        <p className="text-xs text-white/50">
          Check your Sentry dashboard (project: <strong className="text-white">sentry-green-flower</strong>) to verify that the error was caught and reported.
        </p>
      </div>
    </div>
  );
}
