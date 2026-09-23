"use client";

import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [planList, setPlanList] = useState([]);
  const [savedList, setSavedList] = useState([]);

  // Today's Plan-এ যুক্ত করার লজিক
  const addToPlan = (workout) => {
    const isAlreadyInPlan = planList.some((item) => item.id === workout.id);

    if (isAlreadyInPlan) {
      toast.error("Already in your plan", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    setPlanList((prev) => [...prev, workout]);
    toast.success("Added to today's plan!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  // Save for later-এ যুক্ত করার লজিক
  const saveForLater = (workout) => {
    const isAlreadySaved = savedList.some((item) => item.id === workout.id);

    if (isAlreadySaved) {
      toast.error("Already saved for later", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    setSavedList((prev) => [...prev, workout]);
    toast.success("Saved for later!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  // Plan থেকে রিমুভ করার লজিক
  const removeFromPlan = (id) => {
    setPlanList((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from plan", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  // Saved থেকে রিমুভ করার লজিক
  const removeFromSaved = (id) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from saved list", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <PlanContext.Provider
      value={{
        planList,
        savedList,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};