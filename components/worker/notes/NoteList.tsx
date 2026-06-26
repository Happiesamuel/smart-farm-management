"use client";
import { useEffect, useRef, useState } from "react";
import { FinanceModal } from "@/components/modals/FinanceModal";
import { RiFileList3Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeleteDoc } from "@/hooks/useDelete";
import { useApp } from "@/stores/useAppStore";
import { useWorkspaceUser } from "@/hooks/useAssign";
import { useWorkerNotes } from "@/hooks/notes/useNotes";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { format, formatDistanceToNow } from "date-fns";
import TableActions from "@/components/layout/TableAction";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import Paginate from "@/components/layout/Pagination";
import { useAssignedFarms } from "@/hooks/farms/useFarm";
import { useGetFields } from "@/hooks/fields/useFields";
import CreateNoteWorkerFetch from "@/components/field/notes/NoteWorkerForm";
import NoteHeader from "./NoteHeader";
import { useCropFilter } from "@/hooks/useCropFilter";

const typeStyles: Record<string, string> = {
  general: "bg-gray-100 text-gray-700",
  crop: "bg-green-100 text-green-700",
  pest: "bg-red-100 text-red-700",
  irrigation: "bg-blue-100 text-blue-700",
  fertilizer: "bg-orange-100 text-orange-700",
  harvest: "bg-purple-100 text-purple-700",
  weather: "bg-cyan-100 text-cyan-700",
  maintenance: "bg-yellow-100 text-yellow-700",
};

const priorityStyles: Record<string, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export default function NoteList() {
  const [open, setOpen] = useState(false);
  const { user: u } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [editingNote, setEditingNote] = useState<{
    [key: string]: string;
  } | null>(null);
  const { remove, status: deleteStat } = useDeleteDoc();
  const { workspace, user, ready } = useApp();
  const searchFromUrl = searchParams.get("search") || "";
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>(
    {},
  );
  const { filterCrop } = useCropFilter();
  const [val, setVal] = useState(searchFromUrl);
  const {
    data: farms,
    status: farmStat,
    error: farmErr,
  } = useAssignedFarms(workspace?.id ?? null, user?.id ?? null);
  const [debouncedValue] = useDebounce(val, 500);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) {
      params.set("search", debouncedValue);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }, [debouncedValue]);
  const {
    users,
    status: userStat,
    error: userErr,
  } = useWorkspaceUser(workspace?.id ?? null);

  const { notes, status, error } = useWorkerNotes(
    workspace?.id ?? null,
    user?.id ?? null,
  );

  const {
    fields,
    status: fieldStat,
    error: fieldErr,
  } = useGetFields(workspace?.id ?? null, user?.id ?? null);

  if (!ready)
    return (
      <div className="h-70">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-70">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading =
    status === "pending" ||
    userStat === "pending" ||
    farmStat === "pending" ||
    fieldStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading notes record...</FormLoader>
      </div>
    );
  const errorMessage =
    error?.message || userErr?.message || fieldErr?.message || farmErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );
  const newNotes = notes;
  if (!newNotes?.length)
    return (
      <div className="h-70 flex items-center justify-center">
        <div className="flex items-center flex-col gap-1 ">
          <NoResult>No note record!</NoResult>
          <Button
            onClick={() => setOpen(true)}
            className="bg-primary-green w-fit  cursor-pointer text-white rounded-sm"
          >
            <GoPlus />
            <p>Add Notes</p>
          </Button>
          <FinanceModal
            text={"Add a new note to your farm"}
            type={"Note"}
            iconColor={"bg-green-100 text-green-500"}
            Icon={RiFileList3Line}
            open={open}
            onClose={() => setOpen(false)}
          >
            <CreateNoteWorkerFetch onClose={() => setOpen(false)} />
          </FinanceModal>
        </div>
      </div>
    );
  function handleSearch(v: string) {
    setVal(v);
  }

  const toggleNote = (id: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const PAGE_SIZE = 10;

  const currentPage = Number(searchParams.get("page") || 1);
  const filtered = filterCrop(newNotes ?? []);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginatedNotes = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const userMap = new Map(users?.map((u) => [u.id, u]));
  const farmMap = new Map(farms?.map((f) => [f.$id, f]));
  const fieldMap = new Map(fields?.map((f) => [f.$id, f]));

  function handleClick() {
    setEditingNote(null);
    setOpen(true);
  }

  return (
    <div className=" pt-2.5">
      <div className="flex flex-col sm:flex-row w-full gap-2 sm:items-center justify-between mb-6 w-full">
        <FinanceModal
          text={
            editingNote ? "Update this note" : "Add a new note to your farm"
          }
          type={"Note"}
          iconColor={"bg-green-100 text-green-500"}
          Icon={RiFileList3Line}
          open={open}
          onClose={() => {
            setOpen(false);
            setEditingNote(null);
          }}
        >
          <CreateNoteWorkerFetch
            def={editingNote ?? undefined}
            onClose={() => {
              setOpen(false);
              setEditingNote(null);
            }}
          />
        </FinanceModal>
        <NoteHeader
          handleSearch={handleSearch}
          val={val}
          handleClick={handleClick}
        />
      </div>

      {!paginatedNotes.length ? (
        <div className="h-110">
          <NoResult>No notes found!</NoResult>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedNotes.map((note) => {
            const user = userMap.get(note.users);
            const farm = farmMap.get(note.farms);
            const field = fieldMap.get(note.fields);
            return (
              <div
                key={note.$id}
                className="rounded-xl border border-border bg-white p-5 transition hover:border-primary-green/20 hover:shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          typeStyles[note.type]
                        }`}
                      >
                        {note.type}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          priorityStyles[note.priority]
                        }`}
                      >
                        {note.priority}
                      </span>
                    </div>

                    {note.title && (
                      <h4 className="text-base font-semibold text-dark">
                        {note.title}
                      </h4>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <TableActions
                      actions={[
                        {
                          type: "callback",
                          label: "Edit",
                          icon: <LuPencil className="text-sm" />,
                          onClick: () => {
                            setEditingNote(note);
                            setOpen(true);
                          },
                        },
                        {
                          type: "callback",
                          label:
                            deleteStat === "pending" ? "Deleting..." : "Delete",
                          icon: <LuTrash2 className="text-sm" />,
                          variant: "danger",

                          onClick: () => {
                            if (note.users !== u!.id) {
                              return toast("You can't delete this note", {
                                description:
                                  "You can only delete notes that you created.",
                              });
                            }

                            remove(
                              {
                                collection: "notes",
                                id: note.$id,
                                workspaceId: workspace.id,
                                userId: u!.id,
                              },
                              {
                                onSuccess: () => {
                                  toast("Deleted successfully", {
                                    description: "You've deleted a note record",
                                  });
                                },
                                onError: (err) =>
                                  toast("Error deleting note", {
                                    description: err.message,
                                    duration: 4000,
                                    closeButton: true,
                                  }),
                              },
                            );
                          },
                        },
                      ]}
                    />
                  </div>
                </div>

                {/* Note */}
                <div className="mt-2">
                  <p
                    className={`text-sm leading-7 text-zinc-700 whitespace-pre-wrap transition-all duration-300 ${
                      expandedNotes[note.$id] ? "" : "line-clamp-4"
                    }`}
                  >
                    {note.description}
                  </p>

                  <div className="text-xs text-zinc-500 mt-2 flex items-center gap-2">
                    <p>{farm?.farmName}</p>
                    <p className="size-1 rounded-full bg-zinc-400" />
                    <p>{field?.fieldName}</p>
                  </div>

                  {note.description.length > 250 && (
                    <button
                      onClick={() => toggleNote(note.$id)}
                      className="mt-2 text-sm font-medium text-primary-green hover:underline"
                    >
                      {expandedNotes[note.$id] ? "See less" : "See more"}
                    </button>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <img
                      className="flex h-8 w-8 object-center object-cover rounded-full "
                      src={user?.avatar}
                    />

                    <div>
                      <p className="font-medium text-zinc-700">
                        {user?.name ?? "Guest"}
                      </p>
                      <p>
                        {formatDistanceToNow(new Date(note.$createdAt))} ago
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400">
                    {format(new Date(note.$createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Paginate totalPages={totalPages} />
    </div>
  );
}
