"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { createFieldSchema } from "@/lib/schemas";
import { PiFarm } from "react-icons/pi";
import { ImDroplet } from "react-icons/im";
import { FiUser } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import CreateFieldInput, {
  CreateFieldInputSelect,
  CreateFieldSelect,
  CreateFieldText,
  CreateFieldUpload,
} from "./CreateFieldField";
import { TbRipple } from "react-icons/tb";
import { useCreateField } from "@/hooks/fields/useFields";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { toast } from "sonner";
import { useApp } from "@/stores/useAppStore";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { FormLoader } from "@/components/loader/GeneralLoader";
import { useParams, useRouter } from "next/navigation";
import { useUpdateDocWithImg } from "@/hooks/useUpdate";
import { safeUpdateLastSeen } from "@/hooks/useLastSeen";

export default function CreateFieldFormFetch({
  onClose,
  def,
}: {
  onClose?(): void;
  def?: { [key: string]: string | number };
}) {
  const { workspace, user, ready } = useApp();

  const { farms, status, error } = useGetFarm(
    workspace?.id ?? null,
    user?.id ?? null,
  );
  const { farmId: x } = useParams();
  if (!ready)
    return (
      <div className="h-100">
        <FormLoader>Loading...</FormLoader>
      </div>
    );
  if (!user && ready) return <p>error</p>;
  if (status === "pending")
    return (
      <div className="h-100">
        <FormLoader>Loading form...</FormLoader>
      </div>
    );
  if (status === "error") return <p>{error?.message}</p>;

  const farmId = farms?.find((y) => y.$id === x)?.$id ?? undefined;

  const farmOptions =
    farms?.map((f) => ({
      name: f.farmName,
      value: f.$id,
    })) ?? [];
  return (
    <CreateFieldForm
      farmId={farmId as string}
      workspaceId={workspace!.id}
      userId={user!.id}
      def={def}
      onClose={onClose}
      farms={farmOptions}
    />
  );
}

function CreateFieldForm({
  workspaceId,
  userId,
  farmId,
  farms,
  def,
  onClose,
}: {
  workspaceId: string;
  userId: string;
  farmId: string;
  farms: { name: string; value: string }[];
  onClose?(): void;
  def?: { [key: string]: string | number };
}) {
  const defaultValue = def?.id
    ? {
        fieldName: def?.name ?? "",
        farm: farmId ?? def.farmId ?? "",
        fieldImage: def?.image ?? "",
        size: def?.size.toString(),
        sizeUnit: def?.sizeUnit,
        soilType: (def?.soilType as string).toLowerCase() ?? "",
        irrigationType: (def?.irrigationType as string).toLowerCase() ?? "",
        status: (def?.status as string).toLowerCase() ?? "",
        description: def?.description ?? "",
      }
    : {
        farm: farmId ? farmId : "",
      };
  const { update, status: upStat } = useUpdateDocWithImg();
  const { createField, status } = useCreateField();
  const { workspace } = useApp();
  const router = useRouter();
  const form = useForm<z.infer<typeof createFieldSchema>>({
    resolver: zodResolver(createFieldSchema) as Resolver<
      z.infer<typeof createFieldSchema>
    >,
    defaultValues: defaultValue as unknown as z.infer<typeof createFieldSchema>,
  });
  async function onSubmit(values: z.infer<typeof createFieldSchema>) {
    const { farm, ...val } = values;
    const obj = {
      userId: userId,
      workspaceId: workspaceId,
      data: {
        ...val,
        size: +values.size,
        farms: farm,
      },
    };
    safeUpdateLastSeen(userId);
    if (def?.id) {
      const o = obj.data;

      update(
        {
          id: def.id as string,
          data: o,
          workspaceId: workspaceId,
          userId: userId,
          collection: "fields",
        },
        {
          onSuccess: () => {
            toast("Field updated successfully", {
              description: "You've updated your field",
            });
            onClose?.();
          },
          onError: (err) =>
            toast("Error updating field", {
              description: err.message,
              duration: 4000,
              closeButton: true,
            }),
        },
      );
    } else {
      createField(obj, {
        onSuccess: () => {
          toast("Field created successfully", {
            description: "You can now proceed to managing your field",
          });
          router.push(`/user/${workspace?.workspaceId}/farms/${farmId}`);
        },
        onError: (err) =>
          toast("Error creating field", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      });
    }
  }

  const soil = [
    {
      value: "sandy",
      name: "Sandy",
    },
    {
      value: "loamy",
      name: "Loamy",
    },
    {
      value: "clay",
      name: "Clay",
    },
    {
      value: "silty",
      name: "Silty",
    },
    {
      value: "peaty",
      name: "Peaty",
    },
    {
      value: "chalky",
      name: "Chalky",
    },
  ];

  const arrSize = [
    {
      name: "acres",
      value: "acres",
    },
    {
      name: "hectares",
      value: "hectares",
    },
    {
      name: "square.m",
      value: "square.m",
    },
  ];

  const stat = [
    {
      name: "Active",
      value: "active",
    },
    {
      name: "Inactive",
      value: "inactive",
    },
  ];
  const irrigation = [
    {
      name: "Rain-fed",
      value: "rain-fed",
    },
    {
      name: "Drip",
      value: "drip",
    },
    {
      name: "Sprinkler",
      value: "sprinkler",
    },
    {
      name: "Manual",
      value: "manual",
    },
    {
      name: "Flood",
      value: "flood",
    },
    {
      name: "Pivot",
      value: "pivot",
    },
  ];

  return (
    <div className="w-full lg:w-[90%] mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full "
        >
          <p className="text-primary-green  pb-1 text-sm w-full font-semibold border-border border-b">
            Field Information
          </p>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateFieldInput
              label="Field Name"
              placeholder="e.g Field A"
              Icon={FiUser}
              name="fieldName"
              control={form.control}
            />
            <CreateFieldSelect
              name="farm"
              control={form.control}
              label="Select Farm"
              placeholder={
                farmId
                  ? (farms.find((x) => x.value === farmId)?.name ?? "")
                  : "Select farm"
              }
              disabled={farmId ? true : false}
              array={[]}
              Icon={PiFarm}
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateFieldInputSelect
              array={arrSize}
              control={form.control}
              label="Field Size"
              placeholder="e.g. 100"
              placeholder2={
                def?.id
                  ? ((arrSize.find(
                      (x) => x.value === (def.sizeUnit as string).toLowerCase(),
                    )?.name ?? "arces") as string)
                  : "arces"
              }
              type={"number"}
              name1="size"
              name2="sizeUnit"
            />
            <CreateFieldSelect
              name="soilType"
              control={form.control}
              label="Soil Type"
              placeholder={
                def?.id
                  ? ((soil.find(
                      (x) => x.value === (def.soilType as string).toLowerCase(),
                    )?.name ?? "Select soil type") as string)
                  : "Select soil type"
              }
              array={soil}
              Icon={TbRipple}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateFieldSelect
              name="irrigationType"
              control={form.control}
              label="Irrigation Type (Optional)"
              placeholder={
                def?.id
                  ? ((irrigation.find(
                      (x) =>
                        x.value ===
                        (def.irrigationType as string).toLowerCase(),
                    )?.name ?? "Select irrigation type") as string)
                  : "Select irrigation type"
              }
              array={irrigation}
              Icon={ImDroplet}
            />
            <CreateFieldUpload
              img={def?.image as string}
              control={form.control}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateFieldSelect
              name="status"
              control={form.control}
              label="Status"
              placeholder={
                def?.id
                  ? ((stat.find(
                      (x) => x.value === (def.status as string).toLowerCase(),
                    )?.name ?? "Select Farm Status") as string)
                  : "Select Farm Status"
              }
              array={stat}
              Icon={TbRipple}
            />
            <CreateFieldText
              label="Description (optional)"
              placeholder="Enter Field description"
              name="description"
              control={form.control}
            />
          </div>

          <div className="flex items-center gap-4 relative justify-end">
            <Button
              type="reset"
              onClick={() => (def?.id ? onClose?.() : router.back())}
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
                  {def?.id ? "Updating..." : "Creating..."}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegSave /> {def?.id ? "Update Field" : "Save Field"}
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
