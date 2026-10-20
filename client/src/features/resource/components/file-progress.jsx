import { Button } from "../../../components/ui/button";


export default function FileProgress({
  file,
  progress,
  uploading,
  onRemove,
}) {

  return (
    <div className="w-full rounded-lg border bg-white p-3">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file?.name}</p>
          <p className="text-xs text-muted-foreground">
            {(file?.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>

        {!uploading && onRemove && (
          <Button
            type="button"
            onClick={onRemove}
            variant="outline"
            size="small"
            className="text-sm px-2 py-1 text-foreground"
          >
            Remove
          </Button>
        )}
      </div>

      {uploading && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Uploading...</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-[width] duration-200 bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}