import { create } from 'zustand';
import type { BasicInfoValues } from '@/components/admin/trainers/step1/page';

interface AddTrainerState {
  basicInfo: BasicInfoValues | null;
  mediaFiles: File[];
  setBasicInfo: (values: BasicInfoValues | null) => void;
  setMediaFiles: (files: File[]) => void;
  reset: () => void;
}

export const useAddTrainerStore = create<AddTrainerState>((set) => ({
  basicInfo: null,
  mediaFiles: [],
  setBasicInfo: (basicInfo) => set({ basicInfo }),
  setMediaFiles: (mediaFiles) => set({ mediaFiles }),
  reset: () => set({ basicInfo: null, mediaFiles: [] }),
}));
