"use client";

import { useEffect, useRef, useCallback } from "react";

type SSEEvent = {
  type: string;
  [key: string]: unknown;
};

/**
 * useSSE — Custom hook for Server-Sent Events
 * Connects to /api/events and calls onEvent for each incoming event.
 * Automatically reconnects on disconnection.
 */
export function useSSE(type: string = "orders", onEvent: (event: SSEEvent) => void) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const connect = useCallback(() => {
    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const url = `/api/events?type=${type}`;
    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onEventRef.current(data);
      } catch {
        // Ignore heartbeat or malformed messages
      }
    };

    es.onerror = () => {
      es.close();
      // Reconnect after 3 seconds
      setTimeout(connect, 3000);
    };
  }, [type]);

  useEffect(() => {
    connect();
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [connect]);
}

/**
 * notifyServer — Call this from API routes to trigger immediate SSE updates
 */
export async function notifyServer(type: string) {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
  } catch {
    // Silent fail for notifications
  }
}
