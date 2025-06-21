import { create } from 'zustand';
import { QuizState, AgeGroup } from '../types';

interface QuizStore extends QuizState {
  setAnswer: (field: keyof QuizState, value: any) => void;
  reset: () => void;
}

const initialState: QuizState = {
  ageGroup: null,
  fallenLastYear: null,
  takingPsychoactiveMeds: null,
  difficultyWithADL: null,
  fearfulOfFalling: null,
  useAssistiveDevice: null,
  gotInjuryFromFall: null,
  multipleLastYear: null,
  unableToGetUp: null,
  lostConsciousness: null,
  hasFrailty: null,
  tandemStance22: null,
  tandemStance30: null,
  tandemWalk: null,
  sitToStand12: null,
  sitToStand30: null,
  singleLimbStance: null
};

export const useQuizStore = create<QuizStore>((set) => ({
  ...initialState,
  setAnswer: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set(initialState)
}));