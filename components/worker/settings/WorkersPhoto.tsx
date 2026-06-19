"use client";

import { Button } from "@/components/ui/button";
import { UserObjId } from "@/lib/types";
import Image from "next/image";
import User from "../../../public/user.png";
import { useState } from "react";

import { toast } from "sonner";
import {
  deleteAvatarFromStorage,
  removeUserAvatar,
  updateUserAvatar,
  uploadAvatarToStorage,
} from "@/servers/user-action";
import { useApp } from "@/stores/useAppStore";

export default function WorkersProfilePhoto({ user }: { user: UserObjId }) {
  const [avatar, setAvatar] = useState(user?.avatar);
  const [loading, setLoading] = useState(false);
  const { setUser } = useApp();
  const isDefaultAvatar = avatar?.startsWith(
    "https://fra.cloud.appwrite.io/v1/avatars/initials",
  );

  // Extract file ID from current avatar URL (if it's a storage URL)
  const getCurrentFileId = () => {
    if (!avatar || isDefaultAvatar) return null;
    const match = avatar.match(/files\/([^/]+)\/view/);
    return match?.[1] ?? null;
  };

  const handleRemove = async () => {
    try {
      setLoading(true);
      const updated = await removeUserAvatar(user.id, user.fullName);
      setAvatar(updated.avatar);
      setUser(updated);
      toast("Photo removed", { description: "Reset to default avatar" });
    } catch (err) {
      toast("Error", { description: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  // 📤 Upload new avatar
  const handleUpload = async (file: File) => {
    try {
      setLoading(true);

      // Delete old storage file if exists
      const fileId = getCurrentFileId();
      if (fileId) await deleteAvatarFromStorage(fileId);

      // Upload new file
      const formData = new FormData();
      formData.append("file", file);
      const { url } = await uploadAvatarToStorage(formData);

      // Save URL to DB
      const updated = await updateUserAvatar({ avatar: url }, user.id);
      setAvatar(updated.avatar);
      setUser(updated);
      toast("Photo updated", { description: "Your avatar has been updated" });
    } catch (err) {
      toast("Error", { description: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-border rounded-md p-4 shadow-xs bg-white">
      <h6 className="text-base text-dark/90 pb-3 font-medium">Profile Photo</h6>

      <div className="flex sm:items-center gap-4 flex-col">
        {/* Avatar */}
        <div className="relative aspect-square mx-auto text-primary-green border border-dark/15 rounded-full flex items-center justify-center size-22">
          <Image
            src={avatar || User}
            fill
            alt="user"
            className="rounded-full object-cover object-top"
          />
          {loading && (
            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">Saving...</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 items-center">
          <label
            className={`bg-primary-green text-white px-4 py-2 rounded-sm text-sm ${loading ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
          >
            {loading ? "Uploading..." : "Change Photo"}
            <input
              type="file"
              hidden
              accept="image/*"
              disabled={loading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
          </label>

          {/* Only show Remove if user has a real uploaded photo */}
          {!isDefaultAvatar && (
            <Button
              onClick={handleRemove}
              disabled={loading}
              className="bg-transparent text-red-500 border border-dark/15 cursor-pointer rounded-sm"
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
