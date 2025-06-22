import { create } from 'zustand';

export const employeeStore = create((set) => ({
  allEmployees: [],
  setAllEmployees: (employees) => set({ allEmployees: employees }),
}));
