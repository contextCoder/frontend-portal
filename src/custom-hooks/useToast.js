import { useState, useCallback } from "react";

let idCounter = 0;

export default function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message) => {
    const id = ++idCounter;
    const newToast = { id, type, message };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 8 sec
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 8000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
