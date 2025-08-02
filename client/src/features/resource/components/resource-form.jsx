"use client";
import { useRef } from "react";
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
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { resourceFormSchema } from "../../../shared/schema/resource";
import { getGoogleSheet } from "../../../lib/utils";
import { resourceCreate } from "../../../services/api/resource";

export function FormModal({ children }) {
  const uploadRef = useRef(null);
  const { register, handleSubmit, formState, watch, getValues, control } =
    useForm({
      resolver: joiResolver(resourceFormSchema),
      defaultValues: {
        type: "file",
        sheet: null,
        sheetLink: "",
      },
    });

  const { ref: inputRef, ...inputProps } = register("sheet");
  const typeValue = watch("type");

  const onSubmit = async (data) => {
    const { spreadSheetId } = getGoogleSheet(data.sheetLink);
    console.log(data);
    // await resourceCreate(spreadSheetId);
  };

  const handleUpload = (e) => {
    uploadRef.current.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Open Dialog</Button> */}
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
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <Label htmlFor="file" className={`${typeValue === "file" ? "bg-gray-50 border" : ""} rounded-xl p-6`}>
                    <RadioGroupItem value="file" id="file" className="size-6" />
                    Upload File
                  </Label>
                    <Label htmlFor="link" className={`${typeValue === "link" ? "bg-gray-50 border" : ""} rounded-xl p-6`}>
                      <RadioGroupItem
                        value="link"
                        id="link"
                        className="size-6"
                      />
                      Add Link
                    </Label>
                </RadioGroup>
              )}
            />

            {typeValue === "file" ? (
              <div
                onClick={handleUpload}
                className="flex flex-col justify-center items-center gap-y-2 text-gray-400 border-4 border-dashed border-gray-400 rounded-lg h-[300px]"
              >
                <Icons.upload className="size-14" />
                <p className="text-gray-500 text-sm">
                  Drap and Drop the .xlsx file
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
              </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
