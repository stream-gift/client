"use client";

import { GradientPicker } from "@/components/gradient-picker";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useState } from "react";
import { ClientAPIService } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { TbLoader2 } from "react-icons/tb";

export function ProfileEditor({ streamer }: { streamer: Streamer }) {
  const [profileImage, setProfileImage] = useState(streamer.profileImage);
  const [profileBanner, setProfileBanner] = useState(streamer.profileBanner);
  const [profileColor, setProfileColor] = useState(streamer.profileColor);

  const [isSaving, setIsSaving] = useState(false);

  const hasChanges =
    profileImage !== streamer.profileImage ||
    profileBanner !== streamer.profileBanner ||
    profileColor !== streamer.profileColor;

  const updateProfile = async () => {
    setIsSaving(true);
    try {
      const payload = {
        profileImage,
        profileBanner,
        profileColor,
      };

      await ClientAPIService.Streamer.updateProfile(payload);
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="border border-white/10 bg-zinc-900 p-5 rounded-lg col-span-1">
        <div className="flex items-center gap-1.5 text-white/60 mb-4">
          <h3 className="text-lg font-medium">Profile Settings</h3>
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-md">Profile Photo</div>
            <div className="text-sm text-white/60">
              This will be displayed on your donation page.
            </div>

            <div className="flex items-center gap-2.5 mt-3">
              <UploadButton
                endpoint="imageUploader"
                className="w-fit items-start"
                appearance={{
                  button:
                    "h-8 rounded-md px-3 text-xs w-fit bg-white text-black shadow hover:bg-white/90",
                  allowedContent: "hidden",
                }}
                onClientUploadComplete={([file]) => {
                  setProfileImage(file.url);
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Error uploading photo: ${error.message}`);
                }}
              />
              <span className="text-xs text-white/60">
                {profileImage?.split("/").pop() || ""}
              </span>
            </div>
            <div className="mt-1.5 text-xs text-white/60">
              1:1 Recommended, Max 2MB
            </div>
          </div>

          <div>
            <div className="text-md">Banner</div>
            <div className="text-sm text-white/60">
              This will be displayed at the top of your donation page.
            </div>

            <div className="flex items-center gap-2.5 mt-3">
              <UploadButton
                endpoint="imageUploader"
                className="w-fit items-start"
                appearance={{
                  button:
                    "h-8 rounded-md px-3 text-xs w-fit bg-white text-black shadow hover:bg-white/90",
                  allowedContent: "hidden",
                }}
                onClientUploadComplete={([file]) => {
                  setProfileBanner(file.url);
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Error uploading banner: ${error.message}`);
                }}
              />
              <span className="text-xs text-white/60">
                {profileBanner?.split("/").pop() || ""}
              </span>
            </div>
            <div className="mt-1.5 text-xs text-white/60">Max 2MB</div>
          </div>

          <div>
            <div className="text-md">Color Theme</div>
            <div className="text-sm text-white/60">
              This will be displayed on your donation page.
            </div>
            <GradientPicker
              className="mt-2"
              background={profileColor || "#e2e2e2"}
              setBackground={(color) => {
                setProfileColor(color);
              }}
            />
          </div>
        </div>

        <div className="mt-3">
          <Button
            onClick={updateProfile}
            disabled={!hasChanges || isSaving}
            className="w-full"
          >
            {isSaving ? (
              <>
                <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      <div className="border border-white/10 bg-zinc-900 p-5 rounded-lg col-span-1">
        <div className="flex items-center gap-1.5 text-white/60 mb-4">
          <h3 className="text-lg font-medium">Preview</h3>
        </div>

        <div className="bg-white rounded-xl p-3 text-black">
          <div
            className="h-full w-full rounded-lg transition-all duration-500 ease-in-out"
            style={{ background: profileColor || "#e2e2e2" }}
          >
            <div className="flex flex-col justify-center items-center h-full min-h-[200px] w-full relative">
              <div className="bg-white rounded-sm shadow-sm w-2/3 h-20 mt-2 overflow-hidden">
                <img
                  src={profileBanner || "https://i.imgur.com/iugfnT6.jpg"}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-row items-start w-1/2">
                <div
                  className="rounded-full p-[1.75px] size-14 -mt-9 -ml-2 transition-all duration-500 ease-in-out"
                  style={{ background: profileColor || "#e2e2e2" }}
                >
                  <img
                    src={
                      profileImage ||
                      "https://static-cdn.jtvnw.net/user-default-pictures-uv/de130ab0-def7-11e9-b668-784f43822e80-profile_image-300x300.png"
                    }
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
