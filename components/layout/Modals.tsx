import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Button } from "../ui/button";
import ButtonLoader from "./ButtonLoader";

export function AddUserFormModal({
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
export function DeleteModal({
  open,
  onClose,
  onClick,
  load,
}: {
  onClose(): void;
  onClick?(): void;
  open: boolean;
  load?: boolean;
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
    <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative bg-white w-full max-w-[310px] sm:max-w-sm rounded-lg shadow-lg animate-fadeIn overflow-hidden">
        <div className="pb-3 flex items-center pt-4 px-4 sm:px-5 justify-end">
          <FaXmark
            onClick={onClose}
            className="text-xl cursor-pointer shrink-0"
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-2 px-4 sm:px-5">
            <h6 className="text-base text-dark text-start font-semibold wrap-break-word">
              Are you absolutely sure?
            </h6>
            <p className="text-sm text-zinc-500  text-start font-medium wrap-break-word">
              This action cannot be undone. This will permanently delete from
              our servers.
            </p>
          </div>

          <div className="flex flex-wrap rounded-b-xl px-4 sm:px-5 items-center gap-2 justify-end bg-zinc-100 py-3">
            <Button
              onClick={onClose}
              className="cursor-pointer bg-transparent border border-border text-dark/90 px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={onClick}
              disabled={load}
              className="cursor-pointer bg-red-600 text-white px-6"
            >
              {load ? (
                <>
                  <ButtonLoader />
                  Deleting...
                </>
              ) : (
                <>Delete</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function LeaveWorkspaceModal({
  open,
  onClose,
  onClick,
  load,
}: {
  onClose(): void;
  onClick?(): void;
  open: boolean;
  load?: boolean;
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
              This action cannot be undone. You won&apos;t be able to view all task in this workspace.
            </p>
          </div>

          <div className="flex rounded-b-xl px-2.5 md:px-5  items-center gap-2 justify-end bg-zinc-100 py-3">
            <Button
              onClick={onClose}
              className="cursor-pointer bg-transparent border border-border text-dark/90 px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={onClick}
              disabled={load}
              className="cursor-pointer bg-red-600  text-white px-6"
            >
              {load ? (
                <>
                  <ButtonLoader />
                  Leaving...
                </>
              ) : (
                <>Leave</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function DeleteFarmModal({
  open,
  onClose,
  onClick,
  load,
}: {
  onClose(): void;
  onClick?(): void;
  open: boolean;
  load?: boolean;
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
              This action cannot be undone. This will permanently all your delete
              fields, crops, harvests, and finance records in this farm.
            </p>
          </div>

          <div className="flex rounded-b-xl px-2.5 md:px-5  items-center gap-2 justify-end bg-zinc-100 py-3">
            <Button
              onClick={onClose}
              className="cursor-pointer bg-transparent border border-border text-dark/90 px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={onClick}
              disabled={load}
              className="cursor-pointer bg-red-600  text-white px-6"
            >
              {load ? (
                <>
                  <ButtonLoader />
                  Deleting...
                </>
              ) : (
                <>Delete</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ValidationDeleteModal({
  open,
  onClose,
  onClick,
  load,
  farmName,
}: {
  onClose(): void;
  onClick(): void;
  open: boolean;
  load?: boolean;
  farmName: string;
}) {
  const [value, setValue] = useState("");
  const isValid = value === farmName;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white w-full max-w-[310px] sm:max-w-sm rounded-lg shadow-lg animate-fadeIn">
        <div className="pb-3 flex items-center pt-4 px-2.5 md:px-5 justify-end">
          <FaXmark onClick={()=>{
            onClose()
            setValue('')
          }} className="text-xl cursor-pointer" />
        </div>
        <div className="space-y-4 px-2.5 md:px-5 pb-4">
          <div className="space-y-2">
            <h6 className="text-base text-dark font-semibold">
              Confirm deletion
            </h6>
            <p className="text-sm text-zinc-500 font-medium">
              Please type{" "}
              <span className="font-semibold text-dark">{farmName}</span> to
              confirm you want to permanently delete this farm.
            </p>
          </div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={farmName}
            className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>
        <div className="flex rounded-b-xl px-2.5 md:px-5 items-center gap-2 justify-end bg-zinc-100 py-3">
          <Button
      onClick={()=>{
            onClose()
            setValue('')
          }}
            className="cursor-pointer bg-transparent border border-border text-dark/90 px-6"
          >
            Cancel
          </Button>
          <Button
              onClick={()=> {
              onClick()
              setValue('')
            }}
            disabled={!isValid || load}
            className="cursor-pointer bg-red-600 text-white px-6 disabled:opacity-50"
          >
            {load ? (
              <>
                <ButtonLoader />
                Deleting...
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
export function DeleteWorkspaceModal({
  open,
  onClose,
  onClick,
  load,
}: {
  onClose(): void;
  onClick?(): void;
  open: boolean;
  load?: boolean;
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
              This action cannot be undone. This will permanently delete all your farms,
              fields, crops, harvests, and finance records in this wokspace.
            </p>
          </div>

          <div className="flex rounded-b-xl px-2.5 md:px-5  items-center gap-2 justify-end bg-zinc-100 py-3">
            <Button
              onClick={onClose}
              className="cursor-pointer bg-transparent border border-border text-dark/90 px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={onClick}
              disabled={load}
              className="cursor-pointer bg-red-600  text-white px-6"
            >
              {load ? (
                <>
                  <ButtonLoader />
                  Deleting...
                </>
              ) : (
                <>Delete</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ValidationDeleteWorkspaceModal({
  open,
  onClose,
  onClick,
  load,
  farmName,
}: {
  onClose(): void;
  onClick(): void;
  open: boolean;
  load?: boolean;
  farmName: string;
}) {
  const [value, setValue] = useState("");
  const isValid = value === farmName;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white w-full max-w-[310px] sm:max-w-sm rounded-lg shadow-lg animate-fadeIn">
        <div className="pb-3 flex items-center pt-4 px-2.5 md:px-5 justify-end">
          <FaXmark  onClick={()=>{
            onClose()
            setValue('')
          }} className="text-xl cursor-pointer" />
        </div>
        <div className="space-y-4 px-2.5 md:px-5 pb-4">
          <div className="space-y-2">
            <h6 className="text-base text-dark font-semibold">
              Confirm deletion
            </h6>
            <p className="text-sm text-zinc-500 font-medium">
              Please type{" "}
              <span className="font-semibold text-dark">{farmName}</span> to
              confirm you want to permanently delete this wokspace.
            </p>
          </div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={farmName}
            className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>
        <div className="flex rounded-b-xl px-2.5 md:px-5 items-center gap-2 justify-end bg-zinc-100 py-3">
          <Button
             onClick={()=>{
            onClose()
            setValue('')
          }}
            className="cursor-pointer bg-transparent border border-border text-dark/90 px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={()=> {
              onClick()
              setValue('')
            }}
            disabled={!isValid || load}
            className="cursor-pointer bg-red-600 text-white px-6 disabled:opacity-50"
          >
            {load ? (
              <>
                <ButtonLoader />
                Deleting...
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
