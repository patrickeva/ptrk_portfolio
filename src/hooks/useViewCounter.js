import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { ref, runTransaction, onValue } from "firebase/database";

const CACHE_KEY = "pv_count";
const SESSION_KEY = "pv_counted";

export function useViewCounter() {
  const [count, setCount] = useState(() => {
    // Show cached value immediately so it never disappears on refresh
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? parseInt(cached, 10) : null;
  });

  useEffect(() => {
    const counterRef = ref(db, "portfolio/views");

    if (!sessionStorage.getItem(SESSION_KEY)) {
      runTransaction(counterRef, current => (current || 0) + 1);
      sessionStorage.setItem(SESSION_KEY, "1");
    }

    const unsub = onValue(counterRef, snap => {
      const val = snap.val() ?? 0;
      setCount(val);
      localStorage.setItem(CACHE_KEY, String(val));
    });

    return unsub;
  }, []);

  return count;
}
