import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import deviceSlice from "./slices/deviceSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    device: deviceSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
