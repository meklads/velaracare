"use client";

import { useState, useRef } from "react";
import { Loader2, Upload, X, CheckCircle2, Image } from "lucide-react";

type FileUploadProps = {
  folder?: string;
  onUpload: (url: string) => void;
  accept?: string;
  maxSize?: number; // MB
  label?: string;
  currentImage?: string | null;
};

export default function FileUpload({
  folder = "avatars",
  onUpload,
  accept = "image/*",
  maxSize = 5,
  label = "رفع صورة",
  currentImage,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");

    if (file.size > maxSize * 1024 * 1024) {
      setError(`حجم الملف يتجاوز ${maxSize} ميجابايت`);
      return;
    }

    // Show local preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "فشل الرفع");
      }

      const data = await res.json();
      setPreview(data.url);
      onUpload(data.url);
    } catch (e: any) {
      setError(e.message || "حدث خطأ في رفع الملف");
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
          preview
            ? "border-emerald/30 bg-emerald-soft/20"
            : "border-[var(--border-primary)] hover:border-emerald hover:bg-emerald-soft/10"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-emerald animate-spin" />
            <span className="text-xs text-secondary">جاري الرفع...</span>
          </div>
        ) : preview ? (
          <>
            <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-2xl" />
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Upload className="h-6 w-6 text-white" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Image className="h-8 w-8 text-secondary" />
            <span className="text-sm text-secondary">{label}</span>
            <span className="text-[10px] text-muted">اسحب الصورة أو اضغط للاختيار</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-500">
          <X className="h-3 w-3" /> {error}
        </div>
      )}

      {preview && !uploading && (
        <button
          onClick={() => { setPreview(null); inputRef.current && (inputRef.current.value = ""); }}
          className="text-xs text-secondary hover:text-red-500 transition-colors"
        >
          إزالة الصورة
        </button>
      )}
    </div>
  );
}
