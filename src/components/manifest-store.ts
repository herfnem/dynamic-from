import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ManifestStore {
  manifestJSON: string;
  setManifestJSON: (value: string) => void;
}

export const useManifestStore = create<ManifestStore>()(
  persist(
    (set) => ({
      manifestJSON: "",
      setManifestJSON: (value) => set({ manifestJSON: value }),
    }),
    {
      name: "form-manifest-storage",
      partialize: (state) => ({ manifestJSON: state.manifestJSON }),
    }
  )
);
