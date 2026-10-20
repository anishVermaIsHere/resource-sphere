"use client";
import { useRef, useState } from "react";
import { useQueryClient } from '@tanstack/react-query'
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
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Controller, useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { resourceFormSchema } from "../../../shared/schema/resource";
import { getGoogleSheet } from "../../../lib/utils";
import { createSheet } from "../../../services/api/resource";
import FileProgress from "./file-progress";
import toast from "react-hot-toast";


export function FormModal({ children }) {
  const uploadRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, watch, getValues, setValue, control, reset} =
    useForm({
      resolver: joiResolver(resourceFormSchema),
      defaultValues: {
        type: "text",
        file: null,
        sheetLink: "",
        sheetTitle: "Sheet1"
      },
    });
  const filewatched = useWatch({
    control, // pass control from useForm()
    name: "file",
  });

  const typeValue = useWatch({
    control,
    name: "type",
  });

  const { ref: inputRef, ...inputProps } = register("file");
  const selectedFile = filewatched instanceof FileList ? filewatched[0] : filewatched;

  const onSubmit = async (data) => {
    try{ 
      if(data.type === 'file') {
        toast("Currently not available this feature");
      } else {
        const { spreadSheetId } = getGoogleSheet(data.sheetLink);
        await createSheet({ spreadSheetId, sheetTitle: data.sheetTitle });
        queryClient.invalidateQueries({ queryKey: ['resources'] });
      }

    } catch(err){
      toast.error("File Upload failed");
    }
    finally {
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
    setValue("sheetLink", "");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={()=>setIsOpen(!isOpen)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl space-y-2">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <DialogHeader className="mb-4">
            <DialogTitle>Add Data</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={(value)=>{
                  field.onChange(value);
                  if(typeValue === "file"){
                    setValue("sheetTitle", "");
                    setValue("sheetLink", "");
                  } else {
                    setValue("file", null);
                  }
                 }} value={field.value}>
                  <Label htmlFor="file" className={`${typeValue === "file" ? "bg-gray-50 border" : ""} rounded-md p-3`}>
                    <RadioGroupItem value="file" id="file" className="size-6" />
                    Upload File
                  </Label>
                    <Label htmlFor="text" className={`${typeValue === "text" ? "bg-gray-50 border" : ""} rounded-md p-3`}>
                      <RadioGroupItem
                        value="text"
                        id="text"
                        className="size-6"
                      />
                      Add Link
                    </Label>
                </RadioGroup>
              )}
            />

            {typeValue === "file" ? (
              selectedFile ? 
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
                  <p className="text-gray-500 text-sm">
                    Drag and Drop the .xlsx file
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    {...inputProps}
                    ref={(e) => {
                      inputRef(e);
                      uploadRef.current = e;
                    }}
                    accept=".csv,.xlsx"
                  />
                </div>
            ) : (
              <div className="space-y-3 h-[300px]">
                <Label htmlFor="sheet-link">Google Sheet Link</Label>
                <Input
                  id="sheet-link"
                  {...register("sheetLink")}
                />
                <Label htmlFor="sheet-title">Sheet Title</Label>
                <Input
                  id="sheet-title"
                  {...register("sheetTitle")}
                />
              </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild >
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
