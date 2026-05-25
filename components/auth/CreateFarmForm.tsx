"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { createFarmSchema } from "@/lib/schemas";
import { PiPlant } from "react-icons/pi";

import { FiUser } from "react-icons/fi";
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
import CreateFarmInput, {
  CreateFarmInputSelect,
  CreateFarmSelect,
  CreateFarmText,
  CreateFarmUpload,
  CreateLocationField,
} from "../farm/create/CreateField";
import ButtonLoader from "../layout/ButtonLoader";
import { useCreateFarm } from "@/hooks/farms/useCreateFarm";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { login } from "@/servers/auth-actions";
export default function CreateFarmForm({
  id,
  workspaceId,
  email,
  password,
  activeWorkspace,
}: {
  id: string;
  workspaceId: string;
  email?: string;
  password?: string;
  activeWorkspace?: string;
}) {
  const { create, status, error } = useCreateFarm();
  const form = useForm<z.infer<typeof createFarmSchema>>({
    resolver: zodResolver(createFarmSchema),
  });
  const router = useRouter();
  const pathname = usePathname();

  async function callFunc() {
    if (pathname !== "/create-farm") {
      await login(email!, password!);
      toast("Farm created successfully", {
        description: "You can now manage your farm",
        duration: 4000,
        closeButton: true,
      });
      localStorage.clear();
      return router.push(`/user/${activeWorkspace}/dashboard`);
    } else {
      toast("Farm created successfully", {
        description: "You can now manage your farm",
        duration: 4000,
        closeButton: true,
      });
      localStorage.clear();
      return router.push(`/select-workspace`);
    }
  }

  async function onSubmit(values: z.infer<typeof createFarmSchema>) {
    const { location, ...rest } = values;

    const newObj = {
      ...rest,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
      users: id,
      size: +rest.size,
      workspaces: workspaceId,
    };
    try {
      create(newObj, {
        onSuccess: async () => {
          await callFunc();
        },
        onError: (err) =>
          toast("Error creating farm", {
            description: error?.message || err.message,
            duration: 4000,
            closeButton: true,
          }),
      });
    } catch (error) {
      toast("Error creating farm", {
        description: (error as Error).message,
        duration: 4000,
        closeButton: true,
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
      value: "acre",
    },
    {
      name: "hectares",
      value: "ha",
    },
    {
      name: "square.m",
      value: "mm",
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
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-4 pt-10 w-[98%] md:w-[98%] mx-auto"
      >
        <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
          <CreateFarmInput
            label="Farm Name"
            placeholder="Enter farm name"
            Icon={FiUser}
            name="farmName"
            control={form.control}
          />
          <CreateFarmInputSelect
            array={arrSize}
            control={form.control}
            label="Total Size"
            placeholder="e.g. 100"
            placeholder2="arces"
            name1="size"
            name2="unit"
          />
        </div>
        <CreateLocationField control={form.control} />

        <div className="flex items-start flex-col md:flex-row justify-between gap-4 md:gap-6">
          <CreateFarmText
            label="Description (optional)"
            placeholder="Enter farm description"
            name="description"
            control={form.control}
          />
          <CreateFarmUpload control={form.control} />
        </div>

        <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
          <CreateFarmSelect
            name="soilType"
            control={form.control}
            label="Soil Type"
            placeholder="Select soil type"
            array={soil}
            Icon={PiPlant}
          />
          <CreateFarmSelect
            name="status"
            control={form.control}
            label="Status"
            placeholder="Select farm status"
            array={stat}
            Icon={MdOutlineSignalWifiStatusbar4Bar}
          />
        </div>

        <Button
          type="submit"
          disabled={status === "pending"}
          className="disabled:opacity-70 text-white transition-all duration-200 bg-primary-green h-10 rounded-md w-full cursor-pointer border-none flex items-center justify-center gap-2"
        >
          {status === "pending" ? (
            <>
              <ButtonLoader />
              Creating...
            </>
          ) : (
            "Create Farm"
          )}
        </Button>
      </form>
    </Form>
  );
}
