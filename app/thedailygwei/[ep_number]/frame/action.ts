'use client';


import { HubHttpUrlOptions } from 'frames.js';


export const DEBUG_HUB_OPTIONS: HubHttpUrlOptions = {
    hubHttpUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/debug/hub'
        : undefined,
  };