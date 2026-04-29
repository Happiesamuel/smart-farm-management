"use client";
import { ReactNode, useEffect } from "react";
import { IconType } from "react-icons";
import { FaXmark } from "react-icons/fa6";

export function FinanceModal({
  open,
  onClose,
  children,
  type,
  Icon,
  text,
  iconColor,
}: {
  children: ReactNode;
  type: string;
  Icon: IconType;
  iconColor: string;
  text: string;
  onClose(): void;
  open: boolean;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // cleanup (important)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 " />

      <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-lg p-5 animate-fadeIn">
        <div>
          <div className="pb-3 flex items-center justify-between">
            <div className="text-xl text-dark font-semibold ">Add {type}</div>
            <FaXmark onClick={onClose} className="text-xl cursor-pointer" />
          </div>
          <div className={`flex items-center  gap-4`}>
            <div
              className={` ${iconColor} size-12 rounded-xl items-center justify-center flex `}
            >
              <Icon className="text-2xl" />
            </div>
            <p className="text-sm text-dark/80 font-medium">{text}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
