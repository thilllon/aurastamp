import { mailbox } from '@/mocks/mailbox';
import type { Mail, Tag } from '@/models/mailbox';
import type { AppThunk } from '@/store';
import objectArray from '@/utils/objectArray';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface MailState {
  mails: {
    byId: Record<string, Mail>;
    allIds: string[];
  };
  tags: Tag[];
  sidebarOpen: boolean;
}

const initialState: MailState = {
  mails: {
    byId: {},
    allIds: [],
  },
  tags: [],
  sidebarOpen: false,
};

const slice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    getTags(state: MailState, action: PayloadAction<Tag[]>): void {
      state.tags = action.payload;
    },
    getMails(state: MailState, action: PayloadAction<Mail[]>): void {
      const mails = action.payload;
      state.mails.byId = objectArray(mails);
      state.mails.allIds = Object.keys(state.mails.byId);
    },
    getMail(state: MailState, action: PayloadAction<Mail>): void {
      const mail = action.payload;

      state.mails.byId[mail.id] = mail;

      if (!state.mails.allIds.includes(mail.id)) {
        state.mails.allIds.push(mail.id);
      }
    },
    openSidebar(state: MailState): void {
      state.sidebarOpen = true;
    },
    closeSidebar(state: MailState): void {
      state.sidebarOpen = false;
    },
  },
});

export const { reducer } = slice;

export const getTags =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    const response = await mailbox.getTags();
    dispatch(slice.actions.getTags(response));
  };

export const getMails =
  ({ tag }: { tag: string }): AppThunk =>
  async (dispatch): Promise<void> => {
    const response = await mailbox.getMails({ tag });

    dispatch(slice.actions.getMails(response));
  };

export const getMail =
  (mailId: string): AppThunk =>
  async (dispatch): Promise<void> => {
    const response = await mailbox.getMail(mailId);

    dispatch(slice.actions.getMail(response));
  };

export const openSidebar =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(slice.actions.openSidebar());
  };

export const closeSidebar =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(slice.actions.closeSidebar());
  };
