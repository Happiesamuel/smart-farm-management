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
import { useParams } from "next/navigation";

export default function CreateFieldFormFetch() {
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
      farms={farmOptions}
    />
  );
}

function CreateFieldForm({
  workspaceId,
  userId,
  farmId,
  farms,
}: {
  workspaceId: string;
  userId: string;
  farmId: string;
  farms: { name: string; value: string }[];
}) {
  const { createField, status } = useCreateField();

  const form = useForm<z.infer<typeof createFieldSchema>>({
    resolver: zodResolver(createFieldSchema) as Resolver<
      z.infer<typeof createFieldSchema>
    >,
    defaultValues: {
      farm: farmId ? farmId : "",
    },
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
    createField(obj, {
      onSuccess: () => {
        toast("Field created successfully", {
          description: "You can now proceed to managing your field",
        });
      },
      onError: (err) =>
        toast("Error creating field", {
          description: err.message,
          duration: 4000,
          closeButton: true,
        }),
    });
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
              placeholder2="arces"
              type={"number"}
              name1="size"
              name2="sizeUnit"
            />
            <CreateFieldSelect
              name="soilType"
              control={form.control}
              label="Soil Type"
              placeholder="Select soil type"
              array={soil}
              Icon={TbRipple}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateFieldSelect
              name="irrigationType"
              control={form.control}
              label="Irrigation Type (Optional)"
              placeholder="Select irrigation type"
              array={irrigation}
              Icon={ImDroplet}
            />
            <CreateFieldUpload control={form.control} />
          </div>
          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateFieldSelect
              name="status"
              control={form.control}
              label="Status"
              placeholder="Select status"
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
              className="text-dark bg-transparent rounded-md w-fit px-6 h-9 cursor-pointer border-border border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={status === "pending"}
              className="text-white bg-dark-green rounded-md w-fit px-6 h-9 cursor-pointer border-none"
            >
              {status === "pending" ? (
                <>
                  <ButtonLoader />
                  Creating...
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegSave /> Add Field
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
