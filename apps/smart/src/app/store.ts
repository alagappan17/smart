import { configureStore } from '@reduxjs/toolkit';
import playgroundSlice from '../store/playground';

export const store = configureStore({
  reducer: {
    playground: playgroundSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
