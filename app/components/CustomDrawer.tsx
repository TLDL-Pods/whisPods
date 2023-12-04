"use client";

import React from "react";
import { useDrawer } from "@/app/contexts/drawerContext";
import YouTubeEmbed from "@/app/components/YoutubeEmbed";

const CustomDrawer = () => {
  const { isDrawerOpen, youtubeUrl, startTimeMs, toggleDrawer } = useDrawer();

  return (
    <div
      className={`fixed inset-x-0 bottom-0 transform ${
        isDrawerOpen ? "translate-y-0" : "translate-y-full"
      } transition-transform duration-300 ease-in-out z-50`}
      style={{ maxHeight: "33vh" }} // Set the maximum height to 1/3 of the viewport height
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black opacity-50 ${
          isDrawerOpen ? "block" : "hidden"
        }`}
        onClick={() => toggleDrawer(false)}
      ></div>

      {/* Drawer Content */}
      <div className="bg-gray-800 p-4 relative overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={() => toggleDrawer(false)}
        >
          &#10005; {/* Unicode for "X" */}
        </button>

        <YouTubeEmbed
          youtubeUrl={youtubeUrl}
          startTimeMs={startTimeMs}
          maxWidth="screen-sm"
        />
        {/* Add additional drawer content here */}
      </div>
    </div>
  );
};

export default CustomDrawer;
