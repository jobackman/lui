import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { readRememberedEdition, rememberEdition, resolveGameEdition, updateSearchParameter } from '@/lib/game-edition';
import type { GameEdition } from '@/types/exports';

interface EditionContextValue {
  gameEdition: GameEdition;
  setGameEdition: (next: GameEdition) => void;
}

const EditionContext = createContext<EditionContextValue | null>(null);

function getPreference(): string | null {
  try { return readRememberedEdition(window.localStorage); }
  catch { return null; }
}

/** URL-driven selection shared by navigation, catalog, and detail pages. */
export function EditionProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams();
  const [remembered, setRemembered] = useState<string | null>(getPreference);
  const gameEdition = resolveGameEdition(params.get('edition'), remembered);

  useEffect(() => {
    if (params.get('edition') !== gameEdition) {
      setParams((current) => updateSearchParameter(current, 'edition', gameEdition), { replace: true });
    }
    setRemembered(gameEdition);
    try { rememberEdition(window.localStorage, gameEdition); }
    catch { /* Accessing localStorage itself can throw in restricted browsers. */ }
  }, [params, gameEdition, setParams]);

  const value = useMemo<EditionContextValue>(() => ({
    gameEdition,
    setGameEdition: (next: GameEdition): void => {
      setParams((current) => updateSearchParameter(current, 'edition', next));
    },
  }), [gameEdition, setParams]);

  return <EditionContext.Provider value={value}>{children}</EditionContext.Provider>;
}

/** Read and change the active edition; callers must be inside EditionProvider. */
export function useEdition(): EditionContextValue {
  const value = useContext(EditionContext);
  if (!value) throw new Error('useEdition must be used inside EditionProvider');
  return value;
}
