"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { notesSchema } from "@/lib/schemas";

import { FaRegSave } from "react-icons/fa";
import NoteInput, { NoteSelect, NoteText } from "./NoteField";
import { useApp } from "@/stores/useAppStore";
import { useAssignedFarms } from "@/hooks/farms/useFarm";
import { useGetFields } from "@/hooks/fields/useFields";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useUpdateDoc } from "@/hooks/useUpdate";
import { useCreateNote } from "@/hooks/notes/useNotes";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { PiFarm } from "react-icons/pi";
import { IoMdGrid } from "react-icons/io";
import { GrFlag } from "react-icons/gr";
import { safeUpdateLastSeen } from "@/hooks/useLastSeen";
import { toast } from "sonner";

export default function CreateNoteWorkerFetch({
  onClose,
  def,
}: {
  onClose?(): void;
  def?: { [key: string]: string };
}) {
  const { workspace, user, ready } = useApp();
  const {
    data: farms,
    status: assStat,
    error: assErr,
  } = useAssignedFarms(workspace?.id ?? null, user?.id ?? null);

  const {
    error: fieldErr,
    fields,
    status: fieldStat,
  } = useGetFields(workspace?.id ?? null, user?.id ?? null);

  if (!ready)
    return (
      <div className="h-100">
        <FormLoader>Loading...</FormLoader>
      </div>
    );
  if (!user && ready) return <p>error</p>;
  const isLoading = fieldStat === "pending" || assStat === "pending";
  if (status === "pending" || isLoading)
    return (
      <div className="h-100">
        <FormLoader>Loading form...</FormLoader>
      </div>
    );
  const errMssg = fieldErr?.message || assErr?.message;
  if (errMssg)
    return (
      <div className="h-100">
        <NoResult>{errMssg}</NoResult>;
      </div>
    );
  const farmOptions =
    farms?.map((f) => ({
      name: f.farmName,
      value: f.$id,
    })) ?? [];

  return (
    <NoteForm
      workspaceId={workspace!.id}
      userId={user!.id}
      farms={farmOptions}
      field={fields}
      onClose={onClose}
      def={def}
    />
  );
}

export function NoteForm({
  workspaceId,
  userId,
  farms,
  field,
  def,
  onClose,
}: {
  workspaceId: string;
  userId: string;
  farms: { name: string; value: string }[];
  field: { [key: string]: string }[] | undefined;
  onClose?(): void;
  def?: { [key: string]: string };
}) {
  const defaultValue = def?.$id
    ? {
        title: def?.title ?? "",
        farm: def.farms ?? "",
        description: def?.description ?? "",
        field: def?.fields ?? "",
        priority: (def?.priority as string).toLowerCase() ?? "",
        type: (def?.type as string).toLowerCase() ?? "",
      }
    : {};
  const form = useForm<z.infer<typeof notesSchema>>({
    resolver: zodResolver(notesSchema),
    defaultValues: defaultValue as unknown as z.infer<typeof notesSchema>,
  });
  const { update, status: upStat } = useUpdateDoc();
  const { createNote, status } = useCreateNote();
  async function onSubmit(values: z.infer<typeof notesSchema>) {
    const { farm, field, ...val } = values;
    const obj = {
      userId: userId,
      workspaceId: workspaceId,
      data: {
        ...val,
        farms: farm,
        fields: field,
      },
    };
    safeUpdateLastSeen(userId);
    if (def?.$id) {
      update(
        {
          collection: "notes",
          id: def.$id as string,
          data: obj.data,
          workspaceId: workspaceId,
          userId: userId,
        },
        {
          onSuccess: () => {
            toast("Note updated successfully", {
              description: "You've updated your note",
            });
            onClose?.();
          },
          onError: (err) =>
            toast("Error updating note", {
              description: err.message,
              duration: 4000,
              closeButton: true,
            }),
        },
      );
    } else {
      createNote(obj, {
        onSuccess: () => {
          toast("Note created successfully", {
            description: "You can now proceed to managing your farm",
          });
          onClose?.();
        },
        onError: (err) =>
          toast("Error creating note", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      });
    }
  }

  const watchedFarmId = form.watch("farm");
  const filteredFields = field?.filter((f) => f.farms === watchedFarmId) ?? [];
  const fields =
    filteredFields?.map((f) => ({
      name: f.fieldName,
      value: f.$id,
    })) ?? [];
  const priority = [
    {
      name: "High",
      value: "high",
    },
    {
      name: "Medium",
      value: "medium",
    },
    {
      name: "Low",
      value: "low",
    },
  ];
  const type = [
    {
      name: "General",
      value: "general",
    },
    {
      name: "Crop",
      value: "crop",
    },
    {
      name: "Pest",
      value: "pest",
    },
    {
      name: "Irrigation",
      value: "irrigation",
    },
    {
      name: "Fertilizer",
      value: "fertilizer",
    },
    {
      name: "Harvest",
      value: "harvest",
    },
    {
      name: "Weather",
      value: "weather",
    },
    {
      name: "Maintenance",
      value: "maintenance",
    },
  ];
  return (
    <div className="w-full pt-3">
      <p className="text-primary-green pb-1 text-sm w-full font-semibold border-border border-b">
        Note Information
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full overflow-scroll no-scroll max-h-[73vh]"
        >
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <NoteSelect
              name="farm"
              control={form.control}
              label="Select Farm"
              placeholder={
                def?.$id
                  ? (farms.find((x) => x.value === def.farms)?.name ?? "")
                  : "Select farm"
              }
              array={farms}
              Icon={PiFarm}
            />
            <NoteSelect
              name="field"
              control={form.control}
              label="Select Field"
              placeholder={
                def?.$id
                  ? ((fields.find((x) => x.value === def.fields)?.name ??
                      "Select Field") as string)
                  : "Select field"
              }
              array={fields as { [key: string]: string }[]}
              Icon={IoMdGrid}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <NoteSelect
              name="priority"
              control={form.control}
              label="Priority"
              placeholder={
                def?.$id
                  ? ((priority.find(
                      (x) => x.value === (def.priority as string).toLowerCase(),
                    )?.name ?? "Select priority") as string)
                  : "Select priority"
              }
              array={priority}
              Icon={GrFlag}
            />
            <NoteSelect
              name="type"
              control={form.control}
              label="Type"
              placeholder={
                def?.$id
                  ? ((type.find(
                      (x) => x.value === (def.type as string).toLowerCase(),
                    )?.name ?? "Select Type") as string)
                  : "Select Type"
              }
              array={type}
              Icon={GrFlag}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <NoteInput
              label="Title"
              placeholder="Note title..."
              name="title"
              control={form.control}
            />
            <NoteText
              label="Description"
              placeholder="Write note..."
              name="description"
              control={form.control}
            />
          </div>

          <div className="flex items-center gap-4 relative justify-end">
            <Button
              type="reset"
              onClick={() => onClose?.()}
              className="text-dark bg-transparent rounded-md w-fit px-6 h-9 cursor-pointer border-border border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={status === "pending" || upStat === "pending"}
              className="text-white bg-dark-green rounded-md w-fit px-6 h-9 cursor-pointer border-none"
            >
              {status === "pending" || upStat === "pending" ? (
                <>
                  <ButtonLoader />
                  {def?.$id ? "Updating..." : "Creating..."}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegSave /> {def?.$id ? "Update Note" : "Save Note"}
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
