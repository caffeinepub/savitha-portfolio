import { useCallback, useState } from "react";

export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export function useFileUpload() {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
  });

  const uploadAsDataUrl = useCallback(
    async (file: File): Promise<string | null> => {
      setState({ isUploading: true, progress: 0, error: null });
      try {
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setState({ isUploading: false, progress: 100, error: null });
            resolve(e.target?.result as string);
          };
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.onprogress = (e) => {
            if (e.lengthComputable) {
              const pct = Math.round((e.loaded / e.total) * 100);
              setState((prev) => ({ ...prev, progress: pct }));
            }
          };
          reader.readAsDataURL(file);
        });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Read failed";
        setState({ isUploading: false, progress: 0, error: errorMsg });
        return null;
      }
    },
    [],
  );

  return { uploadAsDataUrl, ...state };
}
