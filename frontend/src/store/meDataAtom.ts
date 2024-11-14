import { atom } from "jotai";

// Initialize the atom with an empty or initial value
export const meDataAtom = atom<{} | null>(null);
