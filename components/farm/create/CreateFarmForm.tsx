"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { createFarmSchema } from "@/lib/schemas";
import { PiPlant } from "react-icons/pi";
import CreateFarmInput, {
  CreateFarmInputSelect,
  CreateFarmSelect,
  CreateFarmText,
  CreateFarmUpload,
  CreateLocationField,
} from "./CreateField";
import { FiUser } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
import { toast } from "sonner";
import { useApp } from "@/stores/useAppStore";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { useCreateFarm } from "@/hooks/farms/useCreateFarm";
import { useRouter } from "next/navigation";
export default function CreateFarmForm() {
  const form = useForm<z.infer<typeof createFarmSchema>>({
    resolver: zodResolver(createFarmSchema),
  });
  const router = useRouter();
  const { workspace, user } = useApp();
  const { create, status, error } = useCreateFarm();
  // async function onSubmit(values: z.infer<typeof createFarmSchema>) {
  //   const { location, ...rest } = values;

  //   const newObj = {
  //     ...rest,
  //     address: location.address,
  //     lat: location.lat,
  //     lng: location.lng,
  //     size: +rest.size,
  //   };
  //   const obj = {
  //     userId: user!.id,
  //     workspaceId: workspace!.id,
  //     data: {
  //       ...newObj,
  //     },
  //   };
  //   createFarm(obj, {
  //     onSuccess: () => {
  //       toast("Farm created successfully", {
  //         description: "You can now proceed to managing your farm",
  //       });
  //     },
  //     onError: (err) =>
  //       toast("Error creating farm", {
  //         description: err.message,
  //         duration: 4000,
  //         closeButton: true,
  //       }),
  //   });
  // }

  async function onSubmit(values: z.infer<typeof createFarmSchema>) {
    const { location, ...rest } = values;

    const newObj = {
      ...rest,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
      users: user!.id,
      size: +rest.size,
      workspaces: workspace!.id,
    };
    try {
      create(newObj, {
        onSuccess: async () => {
          toast("Farm created successfully", {
            description: "You can now manage your farm",
            duration: 4000,
            closeButton: true,
          });
          router.push(`/user/${workspace!.workspaceId}/farms`);
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
    <div className="w-full lg:w-[90%] mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full "
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

          <div className="flex items-center gap-4 relative justify-end">
            <Button
              type="reset"
              className="text-dark bg-transparent rounded-md w-fit px-6 h-9 cursor-pointer border-border border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-dark-green rounded-md w-fit px-6 h-9 cursor-pointer border-none"
            >
              {status === "pending" ? (
                <>
                  <ButtonLoader />
                  Creating...
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegSave /> Save Farm
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
