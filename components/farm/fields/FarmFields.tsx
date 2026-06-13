"use client";
import { DeleteModal } from "@/components/layout/Modals";
import FarmFieldList from "./FarmFieldList";
import { useState } from "react";
import { FinanceModal } from "@/components/modals/FinanceModal";
import { IoGrid } from "react-icons/io5";
import CreateFieldFormFetch from "./CreateFieldForm";
import { useDeleteDoc } from "@/hooks/useDelete";
import { toast } from "sonner";
import { useApp } from "@/stores/useAppStore";

export default function FarmFields() {
  const [openId, setOpenId] = useState<null | string>(null);
  const [openModal, setOpenModal] = useState<null | {
    [key: string]: string | number;
  }>(null);
  const { remove, status: deleteStat } = useDeleteDoc();
  const { user, workspace } = useApp();
  function handleModal(e: { [key: string]: string | number }) {
    setOpenModal(e);
  }
  return (
    <div>
      <FarmFieldList
        openModal={openId ? true : false}
        handleModal={handleModal}
        setOpenId={setOpenId}
      />
      <DeleteModal
        open={openId ? true : false}
        load={deleteStat === "pending"}
        onClick={() =>
          openId
            ? remove(
                {
                  collection: "fields",
                  id: openId,
                  workspaceId: workspace!.id,
                  userId: user!.id,
                },
                {
                  onSuccess: () => {
                    toast("Deleted successfully", {
                      description: "You've deleted a field",
                    });
                    setOpenId(null);
                  },
                  onError: (err) =>
                    toast("Error deleting field", {
                      description: err.message,
                      duration: 4000,
                      closeButton: true,
                    }),
                },
              )
            : console.log("delete")
        }
        onClose={() => setOpenId(null)}
      />
      <FinanceModal
        text={"Edit your field"}
        forWhat="Edit"
        type={"Field"}
        iconColor="bg-[#e8f5ec] text-[#2d8952]"
        Icon={IoGrid}
        open={openModal?.id ? true : false}
        onClose={() => setOpenModal(null)}
      >
        {openModal?.id && (
          <CreateFieldFormFetch
            def={openModal}
            onClose={() => setOpenModal(null)}
          />
        )}
      </FinanceModal>
    </div>
  );
}
