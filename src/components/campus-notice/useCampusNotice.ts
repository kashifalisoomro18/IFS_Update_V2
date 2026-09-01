import { useEffect, useRef, useState } from "react";

interface UseCampusNoticeOptions {
  storageKey?: string;
  autoOpenDelayMs?: number;
  autoCloseDelayMs?: number;
  enabled?: boolean;
}

export function useCampusNotice({
  storageKey = "ifs_campus_notice_shown",
  autoOpenDelayMs = 1500,
  autoCloseDelayMs = 12000,
  enabled = true,
}: UseCampusNoticeOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const open = () => {
    clearCloseTimer();
    setIsOpen(true);
    closeTimer.current = setTimeout(() => setIsOpen(false), autoCloseDelayMs);
  };

  const close = () => {
    clearCloseTimer();
    setIsOpen(false);
  };

  const toggle = () => (isOpen ? close() : open());

  // Auto-open once per browser session, a moment after the page loads
  useEffect(() => {
    if (!enabled) return;
    if (sessionStorage.getItem(storageKey)) return;

    const openTimer = setTimeout(() => {
      sessionStorage.setItem(storageKey, "true");
      open();
    }, autoOpenDelayMs);

    return () => {
      clearTimeout(openTimer);
      clearCloseTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => clearCloseTimer, []);

  return { isOpen, open, close, toggle };
}