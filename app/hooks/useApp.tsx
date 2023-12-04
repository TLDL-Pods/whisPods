'use client';

import { useContext } from 'react';
import { AppStateContext } from '../StateContext';

export function useApp() {
  const { state, setState } = useContext(AppStateContext);

  return {
    state,
    setState,
  };
}
