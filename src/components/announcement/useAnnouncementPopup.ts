/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

export interface UseAnnouncementPopupOptions {
  /** sessionStorage key used to remember the popup was shown. */
  storageKey?: string;
  /** Set to false to disable the popup entirely (e.g. from a CMS flag). */
  enabled?: boolean;
  /** Delay in ms before the popup appears after mount (nice small entrance beat). */
  delayMs?: number;
  /** Auto-close the popup after this many ms once it's open. Set to 0/undefined to disable. */
  autoCloseMs?: number;
}

/**
 * Shows the announcement popup once per browser session (sessionStorage),
 * or every time if `enabled` stays true and the key is cleared.
 * Optionally auto-closes itself after `autoCloseMs`.
 * Usage:
 *   const { isOpen, close } = useAnnouncementPopup({ autoCloseMs: 8000 });
 *   <AnnouncementModal isOpen={isOpen} onClose={close} />
 */
export function useAnnouncementPopup({
  storageKey = "ifs_announcement_shown",
  enabled = true,
  delayMs = 500,
  autoCloseMs = 8000,
}: UseAnnouncementPopupOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !enabled) return;

    let alreadyShown = false;
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        alreadyShown = window.sessionStorage.getItem(storageKey) === "true";
      }
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — fail open, show once per mount.
    }

    if (alreadyShown) return;

    const timer = window.setTimeout(() => setIsOpen(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [mounted, enabled, storageKey, delayMs]);

  const close = () => {
    setIsOpen(false);
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(storageKey, "true");
      }
    } catch {
      // ignore — non-fatal
    }
  };

  // Auto-close after `autoCloseMs` once the popup is actually open.
  useEffect(() => {
    if (!isOpen || !autoCloseMs) return;

    const timer = window.setTimeout(() => {
      close();
    }, autoCloseMs);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, autoCloseMs]);

  return { isOpen, close };
}