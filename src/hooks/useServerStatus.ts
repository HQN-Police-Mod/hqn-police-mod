"use client";

import { useState, useEffect, useCallback } from "react";
import type { ServerStatus } from "@/types";

const REFRESH_INTERVAL = 60000; // 60 seconds

export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/server-status");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ServerStatus = await res.json();
      setStatus(data);
    } catch {
      setError("تعذر جلب حالة السيرفر");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return { status, loading, error, refresh: fetchStatus };
}
