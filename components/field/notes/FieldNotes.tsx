import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { FinanceModal } from "@/components/modals/FinanceModal";
import { RiFileList3Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import CreateNoteFetch from "./NoteForm";
import { useParams } from "next/navigation";
import { useDeleteDoc } from "@/hooks/useDelete";
import { useApp } from "@/stores/useAppStore";
import { useWorkspaceUser } from "@/hooks/useAssign";
import { useGetFarmNotes } from "@/hooks/notes/useNotes";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";

export default function FieldNotes() {
  const [open, setOpen] = useState(false);

  const { farmId, fieldId } = useParams();
  const { remove, status: deleteStat } = useDeleteDoc();
  const { workspace, user, ready } = useApp();
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
        <FormLoader>Loading task record...</FormLoader>
      </div>
    );
  const errorMessage = error?.message || userErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );
  console.log(fieldId, notes);
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
  console.log(newNotes, "sls");
  return (
    <div className=" pt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dark/90">Field Notes</h2>

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
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary-green w-fit  cursor-pointer text-white rounded-sm"
        >
          <GoPlus />
          <p>Add Notes</p>
        </Button>
      </div>
      {/* <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${note.color} p-5 rounded-xl  border border-border/80`}
          >
       
            <p className="text-gray-700 text-sm leading-relaxed">{note.text}</p>

       
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">
                {note.date} • {note.author}
              </span>

         
              <div className="flex items-center gap-3 text-gray-500">
                <button className="hover:text-blue-600">
                  <Pencil size={16} />
                </button>
                <button
                  // onClick={() => deleteNote(note.id)}
                  className="hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
