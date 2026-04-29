"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import { IconType } from "react-icons";

export default function AddModal({
  children,
  type,
  trigger,
  Icon,
  text,
  iconColor,
}: {
  children: ReactNode;
  type: string;
  trigger: ReactNode;
  Icon: IconType;
  iconColor: string;
  text: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="w-full">
        <AlertDialogHeader className="w-full">
          <AlertDialogTitle className="w-full">
            <h6 className="text-xl text-dark font-semibold pb-2">Add {type}</h6>
            <div className={`flex items-center  gap-2`}>
              <div
                className={` ${iconColor} size-10 rounded-xl items-center justify-center flex `}
              >
                <Icon className="text-xl" />
              </div>
              <p className="text-sm text-dark/80 font-medium">{text}</p>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full">
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
