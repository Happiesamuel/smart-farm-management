"use client";
import { DeleteModal } from "@/components/layout/Modals";
import FarmFieldList from "./FarmFieldList";
import { useState } from "react";

export default function FarmFields() {
  const [openId, setOpenId] = useState<null | string>(null);

  return (
    <div>
      <FarmFieldList setOpenId={setOpenId} />
      <DeleteModal
        open={openId ? true : false}
        onClose={() => setOpenId(null)}
      />
    </div>
  );
}
