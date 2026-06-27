"use client";

import { useEffect, useState, type FunctionComponent } from "react";

// Accept a plain shape so both the block fragment (NoticeBarBlockData) and the
// single-property fragment (NoticeBarBlockPropertyData) satisfy it structurally.
export type NoticeBarData = {
  labelText?: string | null;
  message?: string | null;
  linkText?: string | null;
  linkUrl?: string | null;
  dismissible?: boolean | null;
};

type NoticeBarProps = {
  data: NoticeBarData;
  cmsId?: string;
};

/**
 * Client child for NoticeBarBlock — renders the advisory and handles dismissal.
 * The dismissed state is remembered for the session and keyed to the message,
 * so editing the copy resurfaces the bar.
 */
const NoticeBar: FunctionComponent<NoticeBarProps> = ({ data }) => {
  const {
    labelText = "",
    message = "",
    linkText = "",
    linkUrl = "",
    dismissible = false,
  } = data ?? {};

  const storageKey = `noticebar-dismissed:${labelText ?? ""}|${message ?? ""}`;
  const [hidden, setHidden] = useState(false);

  // Read persisted state only after mount to avoid a hydration mismatch.
  useEffect(() => {
    if (
      dismissible &&
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(storageKey) === "1"
    ) {
      setHidden(true);
    }
  }, [dismissible, storageKey]);

  if (hidden) return null;
  if (!labelText && !message && !linkText) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      window.sessionStorage.setItem(storageKey, "1");
    } catch {
      /* sessionStorage unavailable — dismiss for this view only */
    }
  };

  return (
    <div
      role="region"
      aria-label="Important notice"
      className="on-slate flex items-center justify-center gap-3 px-4 py-2 text-center text-sm"
    >
      <p className="m-0">
        {labelText && <strong className="font-semibold">{labelText} </strong>}
        {message}
        {linkText && linkUrl && (
          <a
            href={linkUrl}
            className="ml-2 underline underline-offset-2 hover:no-underline"
          >
            {linkText}
          </a>
        )}
      </p>
      {dismissible && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss notice"
          className="ml-2 shrink-0 text-lg leading-none opacity-80 transition-opacity hover:opacity-100"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default NoticeBar;
