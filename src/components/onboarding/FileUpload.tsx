import { useState, useRef } from "react";
import { Upload, X, FileIcon, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept: string;
  maxSize: number; // in MB
  multiple?: boolean;
  onUpload: (files: File[]) => void;
  preview?: boolean;
  required?: boolean;
  label?: string;
  description?: string;
  className?: string;
  existingFiles?: File[];
}

export const FileUpload = ({ 
  accept, 
  maxSize, 
  multiple = false,
  onUpload,
  preview = true,
  required = false,
  label,
  description,
  className = "",
  existingFiles = []
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>(existingFiles);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
        return false;
      }
      
      // Check file type
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type.match(type);
      });
      
      if (!isValidType) {
        alert(`File ${file.name} is not a supported format.`);
        return false;
      }
      
      return true;
    });

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1);
    setFiles(updatedFiles);
    onUpload(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onUpload(updatedFiles);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const isImage = (file: File) => file.type.startsWith('image/');

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label} {required && <span className="text-destructive">*</span>}
          </label>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors",
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          "hover:border-primary/50 hover:bg-primary/5"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onButtonClick}
              className="mb-2"
            >
              Choose {multiple ? 'Files' : 'File'}
            </Button>
            <p className="text-sm text-muted-foreground">
              or drag and drop {multiple ? 'files' : 'a file'} here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max {maxSize}MB • {accept.replace(/\./g, '').toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files:</h4>
          <div className="grid gap-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg bg-muted/50">
                {preview && isImage(file) ? (
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : isImage(file) ? (
                  <ImageIcon className="w-10 h-10 text-muted-foreground flex-shrink-0" />
                ) : (
                  <FileIcon className="w-10 h-10 text-muted-foreground flex-shrink-0" />
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};