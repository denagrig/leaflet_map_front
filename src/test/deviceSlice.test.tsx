import { testDeviceData, testDeviceDataFirstActive, testMarkerPos } from "src/data"
import reducer, { loadDevicesData, changeMarkerStatus } from "src/slices/deviceSlice"

describe("Device slice tests", () => {
  describe("reducers", () => {
    const initialState = { devicesData: testDeviceData }
  
    it("load devices", () => {
      const action = { type: loadDevicesData.fulfilled.type, payload: testDeviceData}
      const state = reducer(initialState, action)
      expect(state).toEqual({ devicesData: testDeviceData })
    })
    it("change marker data", () => {
      const action = { type: changeMarkerStatus, payload: testMarkerPos}
      const state = reducer(initialState, action)
      expect(state).toEqual({ devicesData: testDeviceDataFirstActive })
      const secondAction = { type: changeMarkerStatus, payload: testMarkerPos}
      const secondState = reducer(state, secondAction)
      expect(secondState).toEqual({ devicesData: testDeviceData })
    })
  })
})