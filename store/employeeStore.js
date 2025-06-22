import { create } from "zustand";
import { persist } from "zustand/middleware";

export const employeeStore = create(
  persist(
    (set) => ({
      allEmployees: [],
      setAllEmployees: (employees) => set({ allEmployees: employees }),
    }),
    {
      name: "hr-employees", // localStorage key
      partialize: (state) => ({ allEmployees: state.allEmployees }), // what to persist
    }
  )
);
