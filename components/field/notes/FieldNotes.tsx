"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FinanceModal } from "@/components/modals/FinanceModal";
import { RiFileList3Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import CreateNoteFetch from "./NoteForm";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDeleteDoc } from "@/hooks/useDelete";
import { useApp } from "@/stores/useAppStore";
import { useWorkspaceUser } from "@/hooks/useAssign";
import { useGetFarmNotes } from "@/hooks/notes/useNotes";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { format, formatDistanceToNow } from "date-fns";
import TableActions from "@/components/layout/TableAction";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import Paginate from "@/components/layout/Pagination";

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

export default function FieldNotes() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [editingNote, setEditingNote] = useState<{
    [key: string]: string;
  } | null>(null);
  const { farmId, fieldId } = useParams();
  const { remove, status: deleteStat } = useDeleteDoc();
  const { workspace, user, ready } = useApp();
  const searchFromUrl = searchParams.get("search") || "";
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>(
    {},
  );
  const [val, setVal] = useState(searchFromUrl);

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

  const { notes, status, error } = useGetFarmNotes(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );

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

  const isLoading = status === "pending" || userStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading notes record...</FormLoader>
      </div>
    );
  const errorMessage = error?.message || userErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );
  const newNotes = notes?.filter((n) => n.fields === fieldId) ?? [];
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
            <CreateNoteFetch onClose={() => setOpen(false)} />
          </FinanceModal>
        </div>
      </div>
    );
  function handleSearch(v: string) {
    setVal(v);
  }
  const query = debouncedValue?.toLowerCase().replace(/\+/g, " ").trim();

  const filteredNotes = newNotes.filter((note) => {
    const matchesSearch = query
      ? note.title.toLowerCase().startsWith(query) ||
        note.title.toLowerCase().includes(query)
      : true;

    return matchesSearch;
  });
  const toggleNote = (id: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const PAGE_SIZE = 10;

  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(filteredNotes.length / PAGE_SIZE);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const userMap = new Map(users?.map((u) => [u.id, u]));
  return (
    <div className=" pt-4">
      <div className="flex flex-col sm:flex-row w-full gap-2 sm:items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dark/90">Field Notes</h2>

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
          <CreateNoteFetch
            def={editingNote ?? undefined}
            onClose={() => {
              setOpen(false);
              setEditingNote(null);
            }}
          />
        </FinanceModal>
        <div className="flex w-full sm:w-[45%] items-center border border-border gap-2 rounded-lg px-2">
          <IoSearch />
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
              handleSearch(e.target.value);
            }}
            value={val}
            placeholder="Search notes..."
            className="border-none p-0 group focus-visible:none shadow-none"
          />
        </div>
        <Button
          onClick={() => {
            setEditingNote(null);
            setOpen(true);
          }}
          className="bg-primary-green w-full  sm:w-fit cursor-pointer text-white rounded-sm"
        >
          <GoPlus />
          <p>Add Notes</p>
        </Button>
      </div>
      <div className="space-y-4">
        {paginatedNotes.map((note) => {
          const user = userMap.get(note.users);
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
                        onClick: () =>
                          remove(
                            {
                              collection: "notes",
                              id: note.$id,
                              workspaceId: workspace.id,
                              userId: user!.id,
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
                          ),
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
                    <p>{formatDistanceToNow(new Date(note.$createdAt))} ago</p>
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
      <Paginate totalPages={totalPages} />
    </div>
  );
}
