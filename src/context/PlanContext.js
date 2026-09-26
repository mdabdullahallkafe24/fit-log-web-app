"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [planList, setPlanList] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedWorkouts = localStorage.getItem("fitlog-saved");

    if (savedPlan) {
      setPlanList(JSON.parse(savedPlan));
    }

    if (savedWorkouts) {
      setSavedList(JSON.parse(savedWorkouts));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(planList));
    localStorage.setItem("fitlog-saved", JSON.stringify(savedList));
  }, [planList, savedList, isLoaded]);

  const addToPlan = (workout) => {
    if (planList.length >= 5) {
      toast.error("Today's plan is full. Maximum 5 lifts.", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    const isAlreadyInPlan = planList.some(
      (item) => item.id === workout.id
    );

    if (isAlreadyInPlan) {
      toast.error("Already in your plan", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    setPlanList((prev) => [...prev, { ...workout, done: false }]);

    toast.success("Added to today's plan!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const saveForLater = (workout) => {
    const isAlreadySaved = savedList.some(
      (item) => item.id === workout.id
    );

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

  const removeFromPlan = (id) => {
    setPlanList((prev) => prev.filter((item) => item.id !== id));

    toast.info("Removed from plan", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const removeFromSaved = (id) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));

    toast.info("Removed from saved list", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const markAsDone = (id) => {
    setPlanList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: true } : item
      )
    );

    toast.success("Workout marked as done!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const isInPlan = (id) => {
    return planList.some((item) => item.id === id);
  };

  const isSaved = (id) => {
    return savedList.some((item) => item.id === id);
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
        markAsDone,
        isInPlan,
        isSaved,
        isPlanFull: planList.length >= 5,
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