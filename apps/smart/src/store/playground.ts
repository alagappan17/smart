import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PromptBlock } from '@smart/types';

type ResponseStore = {
  model: string;
  response: string;
  responseTime?: number;
};

type PlaygroundState = {
  selectedBlocks: PromptBlock[];
  responses: ResponseStore[];
  gettingResponses: boolean;
};

const initialState: PlaygroundState = {
  selectedBlocks: [],
  responses: [],
  gettingResponses: false,
};

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState: { ...initialState },
  reducers: {
    addBlock: (state, action: PayloadAction<PromptBlock>) => {
      state.selectedBlocks.push(action.payload);
    },
    removeBlock: (state, action: PayloadAction<PromptBlock>) => {
      state.selectedBlocks = state.selectedBlocks.filter((block) => block.id !== action.payload.id);
    },
    addResponse: (state, action: PayloadAction<ResponseStore>) => {
      state.responses.push(action.payload);
    },
    setGettingResponses: (state, action: PayloadAction<boolean>) => {
      state.gettingResponses = action.payload;
    },
    clear: (state) => {
      state.selectedBlocks = [];
    },
  },
});

export const { clear, addBlock, removeBlock, addResponse, setGettingResponses } = playgroundSlice.actions;

export default playgroundSlice.reducer;
