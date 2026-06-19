"use client";
import { useGetCrops } from "@/hooks/crops/useCrops";
import FarmList from "./FarmList";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetFields } from "@/hooks/fields/useFields";
import { useApp } from "@/stores/useAppStore";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { buildFarmList } from "@/lib/stat";
import { useState } from "react";
import { useDeleteDoc } from "@/hooks/useDelete";
import {
  DeleteFarmModal,
  ValidationDeleteModal,
} from "@/components/layout/Modals";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function Farms() {
  const { workspaceId } = useParams();
  const { workspace, user, ready } = useApp();
  const { crops, status, error } = useGetCrops(
    workspace?.id ?? null,
    user?.id ?? null,
  );
  const {
    farms,
    status: farmStat,
    error: farmErr,
  } = useGetFarm(workspace?.id ?? null, user?.id ?? null);
  const {
    fields,
    status: fieldStat,
    error: fieldErr,
  } = useGetFields(workspace?.id ?? null, user?.id ?? null);
  const [openId, setOpenId] = useState<null | string>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { remove, status: deleteStat } = useDeleteDoc();

  if (!ready)
    return (
      <div className="h-110">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-110">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading =
    status === "pending" || fieldStat === "pending" || farmStat === "pending";

  if (isLoading)
    return (
      <div className="h-110">
        <FormLoader>Loading farm records...</FormLoader>
      </div>
    );

  const errorMessage = error?.message || fieldErr?.message || farmErr?.message;

  if (errorMessage)
    return (
      <div className="h-110">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  const data = buildFarmList({ farms, fields, crops });

  if (!data.length) {
    return (
      <div className="h-110">
        <NoResult>No farms available</NoResult>
      </div>
    );
  }

  const selectedFarm = data.find((f) => f.id === openId);

  const handleFirstConfirm = () => {
    setConfirmOpen(true); // just open second modal, keep openId intact
  };

  const handleDelete = () => {
    if (!openId) return;
    remove(
      {
        collection: "farms",
        id: openId,
        workspaceId: workspace!.id,
        userId: user!.id,
      },
      {
        onSuccess: () => {
          toast("Deleted successfully", {
            description: "You've deleted a farm",
          });
          setConfirmOpen(false);
          setOpenId(null);
        },
        onError: (err) =>
          toast("Error deleting farm", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      },
    );
  };
  return (
    <>
      <FarmList
        openModal={openId ? true : false}
        setOpenId={setOpenId}
        farms={data}
      />

      <DeleteFarmModal
        open={!!openId && !confirmOpen}
        load={false}
        onClick={handleFirstConfirm}
        onClose={() => {
          setOpenId(null);
          setConfirmOpen(false);
        }}
      />
      <ValidationDeleteModal
        open={confirmOpen}
        load={deleteStat === "pending"}
        farmName={selectedFarm ? `${workspaceId}/${selectedFarm.name}` : ""}
        onClick={handleDelete}
        onClose={() => {
          setConfirmOpen(false);
          setOpenId(null);
        }}
      />
    </>
  );
}
