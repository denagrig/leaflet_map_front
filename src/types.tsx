import { Role, Status } from "./data"

type CordsPair = {
    latitude: number
    longitude: number
}

type DeviceData = {
    id: string,
    curCords: CordsPair
    previousCords: CordsPair[]
    previousCordsStatus: Status[]
    lastActivity: string
    status: string
}
type User = {
  Login: string,
  Password: string,
  Name: string,
  Phone: number, 
  Email : string,
  Role: Role
}

type LoginAndPassword = {
  login: string,
  password: string,
}

type UserTableItem = {
  name: string,
  login: string,
  gmail: string,
  phoneNumber: string,
  role: string,
}

type deviceTableItem = {
  id: string,
  curCords: string;
  prevCords: string;
  status: string,
}

type MarkerPos = {
  deviceNum: number,
  pastMarkerPos: number,
}

type DatabseDeviceData = {
  Id: string,
  Name: string,
  Description: string,
  Coordinate: DatabaseCoords[],
}

type DatabaseCoords = {
  id: number,
  device_id: string,
  coordinates: CordsPair,
  timestamp: string,
}

export type {DeviceData, CordsPair, User, LoginAndPassword, UserTableItem, deviceTableItem, MarkerPos, DatabseDeviceData}