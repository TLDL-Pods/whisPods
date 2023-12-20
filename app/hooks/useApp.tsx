"use client";

import { useContext } from "react";
import { AppStateContext } from "../contexts/StateContext";

export function useApp() {
  const { state, setState } = useContext(AppStateContext);

  return {
    state,
    setState,
  };
}
