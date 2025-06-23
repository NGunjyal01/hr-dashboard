import { create } from "zustand";
import { persist } from "zustand/middleware";

export const employeeStore = create(
  persist(
    (set, get) => ({
      allEmployees: [],
      setAllEmployees: (employees) => set({ allEmployees: employees }),

      // ✅ Add new feedback to a specific employee
      updateEmployeeFeedback: (employeeId, feedback) => {
        const updatedEmployees = get().allEmployees.map((emp) =>
          emp.id === employeeId
            ? {
                ...emp,
                feedback: [...(emp.feedback || []), feedback],
              }
            : emp
        );
        set({ allEmployees: updatedEmployees });
      },

      // ✅ Hydration
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "hr-employees",
      partialize: (state) => ({
        allEmployees: state.allEmployees,
      }),
      onRehydrateStorage: () => (state) => {
        state.setHydrated?.(); // ✅ call after hydration
      },
    }
  )
);
