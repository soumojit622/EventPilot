"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
// @ts-ignore
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [setFiles, onFieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <div
      {...getRootProps()}
      className={`flex-center flex h-72 w-full cursor-pointer flex-col overflow-hidden 
      rounded-xl border border-border bg-background transition-all
      hover:border-primary/50 hover:shadow-sm focus-within:ring-2 focus-within:ring-primary/50 ${
        !imageUrl ? "border-dashed" : ""
      }`}
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="h-full w-full overflow-hidden rounded-xl">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex-center flex-col text-muted-foreground py-6">
          <img
            src="/assets/icons/upload.svg"
            width={60}
            height={60}
            alt="Upload"
            className="opacity-60 transition-all group-hover:scale-105"
          />

          <p className="mt-4 text-sm text-foreground font-medium">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, SVG — Max 10MB
          </p>

          <Button
            type="button"
            className="mt-4 rounded-full"
            variant="secondary"
          >
            Browse files
          </Button>
        </div>
      )}
    </div>
  );
}
