import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { Button } from "../ui/button";

export function DeleteModal({
  open,
  onClose,
}: {
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

      <div className="relative bg-white w-full max-w-[310px] sm:max-w-sm rounded-lg shadow-lg  animate-fadeIn">
        <div>
          <div className="pb-3 flex items-center pt-4 px-2.5 md:px-5  justify-end">
            <FaXmark onClick={onClose} className="text-xl cursor-pointer" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="space-y-2 px-2.5 md:px-5">
            <h6 className="text-base text-dark font-semibold">
              Are you absolutely sure?
            </h6>
            <p className="text-sm text-zinc-500 font-medium">
              This action cannot be undone. This will permanently delete from
              our servers.
            </p>
          </div>

          <div className="flex rounded-b-xl px-2.5 md:px-5  items-center gap-2 justify-end bg-zinc-100 py-3">
            <Button
              onClick={onClose}
              className="cursor-pointer bg-transparent border border-border text-dark/90 px-6"
            >
              Cancel
            </Button>
            <Button className="cursor-pointer bg-red-600  text-white px-6">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
