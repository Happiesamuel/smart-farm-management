import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { FinanceModal } from "@/components/modals/FinanceModal";
import { RiFileList3Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import NoteForm from "./NoteForm";

const initialNotes = [
  {
    id: 1,
    color: "bg-orange-50",
    text: "The soil is responding well to the fertilizer application. Maize plants are healthy and growing uniformly.",
    date: "May 27, 2025",
    author: "John Farmer",
  },
  {
    id: 2,
    color: "bg-green-50",
    text: "Observed some armyworm presence on the eastern side. Applied treatment and monitor.",
    date: "May 10, 2025",
    author: "Mary Jane",
  },
  {
    id: 3,
    color: "bg-blue-50",
    text: "Weed growth is under control. Next weeding in 2 weeks.",
    date: "May 02, 2025",
    author: "John Farmer",
  },
  {
    id: 4,
    color: "bg-purple-50",
    text: "Prepare for possible dry spell. Increase irrigation monitoring.",
    date: "Apr 25, 2025",
    author: "Peter Obi",
  },
];

export default function FieldNotes() {
  const [notes, setNotes] = useState(initialNotes);
  const [open, setOpen] = useState(false);

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

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
          <NoteForm />
        </FinanceModal>
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary-green w-fit  cursor-pointer text-white rounded-sm"
        >
          <GoPlus />
          <p>Add Notes</p>
        </Button>
      </div>
      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${note.color} p-5 rounded-xl  border border-border/80`}
          >
            {/* Text */}
            <p className="text-gray-700 text-sm leading-relaxed">{note.text}</p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">
                {note.date} • {note.author}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-3 text-gray-500">
                <button className="hover:text-blue-600">
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
