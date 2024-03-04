import { PreloadedState, configureStore } from "@reduxjs/toolkit"
import userReducer from "src/slices/userSlice"
import deviceReducer from "src/slices/deviceSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer
  },
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      user: userReducer,
      device: deviceReducer
    },
    preloadedState
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch
