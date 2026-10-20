"use client";
import { useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import Icons from "../../../components/ui/icons";
import { Input } from "../../../components/ui/input";
import FileProgress from "../components/file-progress";
import { useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { resourceFormSchema } from "../../../shared/schema/resource";
import { uploadFile } from "../../../services/api/resource";
import toast from "react-hot-toast";




export function FileUploadForm({ children }) {
  const uploadRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, formState, watch, getValues, setValue, control } = useForm({});
  const filewatched = useWatch({
    control, // pass control from useForm()
    name: "file",
  });

  const { ref: inputRef, ...inputProps } = register("file");
  const selectedFile = filewatched instanceof FileList ? filewatched[0] : filewatched;

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      setUploadProgress(0);
      const file = data.file[0];
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await uploadFile(formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          responseType: "blob",
          onUploadProgress: (event) => {
            if (!event.total) return;

            const progress = Math.round(
              (event.loaded * 100) / event.total
            );
            
            setUploadProgress(progress);
          },
      });

      const fileName = decodeURIComponent(res?.headers["x-file-name"]);
      const url = window.URL.createObjectURL(res.data);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("File metadata removed");
    } catch(err){
      toast.error("File Upload failed");
    } finally {
      handleCloseModal();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    
    if (files && files.length > 0) {
      setValue('file', files, { shouldValidate: true, shouldDirty: true });
      if (uploadRef.current) {
        uploadRef.current.files = files;
      }
    }
  };

  const handleUpload = (e) => {
    uploadRef.current.click();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setUploading(false);
    setUploadProgress(0);
    setValue("file", null);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl space-y-2">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <DialogHeader className="mb-4">
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Upload your file or image and download a metadata-free copy.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
              {selectedFile ? 
              <FileProgress
                file={selectedFile}
                progress={uploadProgress}
                uploading={uploading}
                onRemove={() => setValue('file', null)}
              />
              :
              <div
                onClick={handleUpload}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col justify-center items-center gap-y-2 border-4 border-dashed rounded-lg h-[300px] cursor-pointer transition-colors ${
                  isDragging 
                    ? "border-primary bg-primary/5 text-primary" 
                    : "border-gray-400 text-gray-400 hover:border-gray-500"
                }`}
              >
                <Icons.upload className="size-14" />

                <p className="text-gray-500 text-sm text-center">
                  Drag and Drop <br />
                  accepts .png, .jpeg, .docx, .xlsx, .pdf files
                </p>

                <Input
                  type="file"
                  className="hidden"
                  {...inputProps}
                  ref={(e) => {
                    inputRef(e);
                    uploadRef.current = e;
                  }}
                  accept=".png,.jpeg,.pdf,.docx,.xlsx"
                />
              </div>}
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild >
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!selectedFile}>Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
