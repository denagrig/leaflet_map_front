import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DeviceData, MarkerPos } from "src/types"
import { loadDevices } from "./deviceStorage"
import { Status } from "src/data"

export interface DeviceState {
  devicesData: DeviceData[];
}

const initialState: DeviceState = {
  devicesData: [
    {
      id: "-1",
      curCords: {
        latitude: 0,
        longitude: 0,
      },
      previousCords: [],
      previousCordsStatus: [],
      lastActivity: "",
      status: "",
    },
  ],
}

export const loadDevicesData = createAsyncThunk<DeviceData[], void>(
  "userSlice/logIn",
  async (params: void, thunkAPI) => {
    try {
      return await loadDevices()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

const deviceSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    changeMarkerStatus(state, action: PayloadAction<MarkerPos>) {
      const deviceNum = action.payload.deviceNum
      const pastMarkerPos = action.payload.pastMarkerPos
      const deviceStatus =
        state.devicesData[deviceNum].previousCordsStatus[pastMarkerPos]
      if (deviceStatus == Status.Active) {
        state.devicesData[deviceNum].previousCordsStatus[pastMarkerPos] =
          Status.Inactive
      } else {
        state.devicesData[deviceNum].previousCordsStatus[pastMarkerPos] =
          Status.Active
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDevicesData.fulfilled, (state, action) => {
      state.devicesData = action.payload
      console.log("devices data loaded")
    })
  },
})

export default deviceSlice.reducer
export const { changeMarkerStatus } = deviceSlice.actions
