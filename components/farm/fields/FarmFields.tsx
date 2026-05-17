"use client";
import { DeleteModal } from "@/components/layout/Modals";
import FarmFieldList from "./FarmFieldList";
import FieldHeader from "./FieldHeader";
import { useState } from "react";

export default function FarmFields() {
  const [openId, setOpenId] = useState<null | number>(null);
  return (
    <div>
      <FieldHeader />
      <FarmFieldList setOpenId={setOpenId} />
      <DeleteModal
        open={openId ? true : false}
        onClose={() => setOpenId(null)}
      />
    </div>
  );
}
