"use client";

import NoteList from "./NoteList";

export default function Notes() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 md:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Notes</h6>
          <p className="text-dark/80 text-sm">Create and View all notes</p>
        </div>
      </div>
      <NoteList />
    </div>
  );
}
