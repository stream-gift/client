import { ChangeEvent, useState } from "react";

export function UploadButton(props: {
  onClientUploadComplete: (file: { name: string; url: string }) => unknown;
  onUploadError: (error: Error) => unknown;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function uploadFile(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/uploadipfs", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = (await response.json()) as { cid: string; name: string };
      return props.onClientUploadComplete({
        name: data.name,
        url: `https://ipfs.io/ipfs/${data.cid}`,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      props.onUploadError(error as Error);
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    if (file) uploadFile(file);
  };

  return (
    <>
      <div className="relative transition-all duration-200 cursor-pointer">
        <button
          type="button"
          className="flex cursor-pointer items-center bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/40"
        >
          <span className="mr-2 pointer-events-none">Choose File</span>
          {selectedFile && (
            <span className="text-indigo-200 text-sm truncate pointer-events-none">
              {selectedFile.name}
            </span>
          )}
          <input
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </button>
      </div>
    </>
  );
}
