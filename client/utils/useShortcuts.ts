import React, { useEffect, useState } from 'react';
import { defaultShortcutKeyMap, ShortcutKeyMap } from '@/utils/keymap';

export const useShorcuts = () => {
  const [shortcuts, setShortcuts] = useState<ShortcutKeyMap>(defaultShortcutKeyMap);

  useEffect(() => {
    // TODO: fetch shortcut data

    return () => {
      setShortcuts(defaultShortcutKeyMap);
    };
  }, []);

  return { shortcuts };
};
