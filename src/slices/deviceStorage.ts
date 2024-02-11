import { startingStatus } from "src/data"
import { DatabseDeviceData, DeviceData } from "src/types"

export const loadDevices = async () => {
  return new Promise<DeviceData[]>((resolve) => {
    const axios = require("axios")
    let deviceData: DeviceData[] = []
    axios.get("http://localhost:8088/get/device").then(function (
      response: any
    ) {
      response.data.map((device: DatabseDeviceData) => {
        const newDevice: DeviceData = {
          id: device.Id,
          curCords: {
            latitude: device.Coordinate[0].coordinates.latitude,
            longitude: device.Coordinate[0].coordinates.longitude,
          },
          previousCords: [
            device.Coordinate[1].coordinates,
            device.Coordinate[2].coordinates,
            device.Coordinate[3].coordinates,
            device.Coordinate[4].coordinates,
          ],
          previousCordsStatus: startingStatus,
          lastActivity: device.Coordinate[0].timestamp,
          status:
            new Date().getTime() -
              Date.parse(device.Coordinate[0].timestamp.slice(0, 19)) <
            86400000
              ? "Активно"
              : "Неактивно",
        }
        console.log(
          new Date().getTime() -
            Date.parse(device.Coordinate[0].timestamp.slice(0, 19))
        )
        const newDeviceData = Object.assign([], deviceData)
        newDeviceData.push(newDevice)
        deviceData = newDeviceData
      })
      console.log(deviceData)
      resolve(deviceData)
    })
  })
}
