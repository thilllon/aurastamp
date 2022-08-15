import { reducer as calendarReducer } from '@/slices/calendar';
import { reducer as mailboxReducer } from '@/slices/mailbox';
import { reducer as projectsBoardReducer } from '@/slices/projects_board';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  projectsBoard: projectsBoardReducer,
  mailbox: mailboxReducer,
});
