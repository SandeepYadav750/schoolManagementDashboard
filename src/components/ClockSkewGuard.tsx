"use client";

import { useEffect, useState } from "react";

const CLOCK_SKEW_MESSAGES = [
  "clock skew",
  "token-not-active-yet",
  "token-iat-in-the-future",
  "nbf",
];

const ClockSkewGuard = ({ children }: { children: React.ReactNode }) => {
  const [clockError, setClockError] = useState(false);

  useEffect(() => {
    const originalError = console.error;

    console.error = (...args: any[]) => {
      const message = args.join(" ").toLowerCase();

      if (CLOCK_SKEW_MESSAGES.some((m) => message.includes(m))) {
        setClockError(true);
      }

      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  if (clockError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md rounded-lg bg-white p-6 shadow-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Device Time Issue Detected
          </h2>
          <p className="text-gray-700 mb-4">
            Your device time appears to be incorrect. Authentication cannot
            continue securely.
          </p>
          <p className="text-sm text-gray-500">
            Please enable automatic time synchronization in your system settings
            and refresh the page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ClockSkewGuard;
