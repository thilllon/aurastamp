// import { KeyMap } from 'react-hotkeys';
export const defaultShortcutKeyMap = {
  CHOOSE_1: ['1'],
  CHOOSE_2: ['2'],
  CHOOSE_3: ['3'],
  CHOOSE_4: ['4'],
  CHOOSE_5: ['5'],
  CHOOSE_6: ['6'],
  SAVE_TO_FILE: ['ctrl+s'],
  OPEN_SHORTCUT_DIALOG: ['shift+/'],
  OPEN_QUICK_SEARCH: ['ctrl+/'],
  MOVE_TO_NEXT: ['e', 'E', '1+e', '2+e'],
  MOVE_TO_PREVIOUS: ['q', 'Q', '1+q', '2+q'],
  // MOVE_TO_NEXT: ['e', 'E', 'ctrl+right', '1+e', '2+e'],
  // MOVE_TO_PREVIOUS: ['q', 'Q', 'ctrl+left', '1+q', '2+q'],
};
export type ShortcutKey = keyof typeof defaultShortcutKeyMap;
export type ShortcutKeyMap = Record<ShortcutKey, string[]>;
