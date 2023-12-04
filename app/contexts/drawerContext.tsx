"use client";
// DrawerContext.tsx

import React, { createContext, useState, useContext, ReactNode } from "react";

interface IDrawerContext {
  isDrawerOpen: boolean;
  toggleDrawer: (isOpen: boolean) => void;
  youtubeUrl: string;
  setYoutubeUrl: (url: string, startTimeMs: number) => void;
  startTimeMs: number;
}

export const DrawerContext = createContext<IDrawerContext | undefined>(
  undefined
);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [startTimeMs, setStartTimeMs] = useState(0);

  const toggleDrawer = (isOpen: boolean) => {
    console.log("isOpen", isOpen);
    setIsDrawerOpen(isOpen);
  };

  const updateYoutubeUrl = (url: string, startTime: number) => {
    setYoutubeUrl(url);
    setStartTimeMs(startTime);
  };

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawer,
        youtubeUrl,
        setYoutubeUrl: updateYoutubeUrl,
        startTimeMs,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
