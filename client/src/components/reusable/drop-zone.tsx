"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { UseControllerProps, useController } from "react-hook-form";
import { FormControl } from "../ui/form";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Props extends UseControllerProps {
  onFilesChange: (files: any) => void;
}

const DropZone = (props: Props) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
  const { fieldState } = useController({ ...props, defaultValue: null });
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filesWithPreviews = acceptedFiles.map((file: File) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      setPreviews((prevPreviews) => [
        ...prevPreviews,
        ...filesWithPreviews.map((file) => file.preview),
      ]);

      setFiles((prevFiles) => {
        const newFiles = [...prevFiles, ...filesWithPreviews];
        props.onFilesChange(newFiles);
        return newFiles;
      });
    },
    [props.onFilesChange]
  );

  useEffect(() => {
    // Revoke the data URIs to avoid memory leaks
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <FormControl
      className={`flex border-dashed border-2 border-[#eee] rounded-md items-center h-[200px] w-full cursor-pointer ${
        isDragActive && "border-blue-600"
      }`}
    >
      <div {...getRootProps()} className="gap-2">
        <Input {...getInputProps()} />

        {previews.length > 0 ? (
          previews.map((preview) => (
            <Image
              key={preview}
              src={preview}
              alt={preview}
              width={200}
              height={200}
            />
          ))
        ) : isDragActive ? (
          <>
            <p>Drop the files here!</p>
          </>
        ) : (
          <div className="flex flex-col space-y-3 justify-center items-center mx-auto">
            <PhotoIcon className="h-20 w-20 mx-auto fill-blue-600" />
            <p>Click or drag file to this area to upload</p>
            <p>Support for a single or bulk upload.</p>
          </div>
        )}

        <p>{fieldState.error?.message}</p>
      </div>
    </FormControl>
  );
};

export default DropZone;
