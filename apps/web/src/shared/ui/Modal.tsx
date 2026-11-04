import "./modal.css";
import { useEffect, useRef, type ReactNode } from "react";

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement;
    const element = dialog.current!;
    element.showModal();
    return () => {
      element.close();
      const target =
        previous instanceof HTMLElement &&
        previous.isConnected &&
        !previous.matches(":disabled")
          ? previous
          : document.querySelector<HTMLElement>("main");
      target?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="bruma-modal"
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <h2>{title}</h2>
      {children}
    </dialog>
  );
}
