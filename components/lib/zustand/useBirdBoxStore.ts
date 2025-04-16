import { create } from 'zustand';

type BirdBoxStore = {
  birdSingingBack: boolean;
  setBirdSingingBack: (value: boolean) => void;
  getBirdSingingBack: () => boolean;
};

const useBirdBoxStore = create<BirdBoxStore>((set, get) => ({
  birdSingingBack: false,

  setBirdSingingBack: (value: boolean) => set({ birdSingingBack: value }),
  getBirdSingingBack: () => get().birdSingingBack,
}));

export default useBirdBoxStore;
