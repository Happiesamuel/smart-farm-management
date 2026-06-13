"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useState, ReactNode } from "react";

export type TableAction =
  | {
      type: "modal";
      label: string;
      icon?: React.ReactNode;
      variant?: "default" | "danger";
      modal: (onClose: () => void) => React.ReactNode;
    }
  | {
      type: "navigate";
      label: string;
      icon?: React.ReactNode;
      variant?: "default" | "danger";
      href: string;
    }
  | {
      type: "callback";
      label: string;
      icon?: React.ReactNode;
      variant?: "default" | "danger";
      onClick: () => void;
    };

interface TableActionsProps {
  actions: TableAction[];
}

export default function TableActions({ actions }: TableActionsProps) {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<
    ((onClose: () => void) => React.ReactNode) | null
  >(null);

  function handleAction(action: TableAction) {
    if (action.type === "navigate") {
      router.push(action.href);
    } else if (action.type === "modal") {
      setActiveModal(() => action.modal);
    } else if (action.type === "callback") {
      action.onClick();
    }
  }

  function handleClose() {
    setActiveModal(null);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1.5 rounded hover:bg-zinc-100 transition cursor-pointer">
            <BsThreeDotsVertical className="text-zinc-500 text-sm" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          {actions.map((action, i) => (
            <div key={i}>
              {action.variant === "danger" && i > 0 && (
                <DropdownMenuSeparator />
              )}
              <DropdownMenuItem
                onClick={() => handleAction(action)}
                className={`flex items-center gap-2 cursor-pointer text-sm ${
                  action.variant === "danger"
                    ? "text-red-500 focus:text-red-500 focus:bg-red-50"
                    : "text-zinc-700"
                }`}
              >
                {action.icon}
                {action.label}
              </DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* render active modal */}
      {activeModal?.(handleClose)}
    </>
  );
}
