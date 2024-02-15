import MainPage from "src/pages/Map/Map"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import UserList from "src/pages/Admin/UserList/UserList"
import DeviceList from "src/pages/Admin/DeviceList/DeviceList"
import { AppDispatch } from "./store"
import { loadUser } from "src/slices/userSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "src/hooks"
import { Role, markersData, users} from "src/data"
import Register from "src/pages/Admin/Register/Register"
import { loadDevicesData } from "./slices/deviceSlice"

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userStatus: Role = useAppSelector((state) => state.user.userData.Role)
  const deviceStatus: string = useAppSelector((state) => state.device.devicesData[0].id)

  useEffect(() => {
    localStorage.setItem("deviceData", JSON.stringify(markersData))
    localStorage.setItem("allUsers", JSON.stringify(users))
    if(deviceStatus != "-1")
      setInterval(() => {dispatch(loadDevicesData())}, 50000)
    else
      dispatch(loadDevicesData())
    dispatch(loadUser())
  }, [deviceStatus, dispatch])


  if (userStatus != Role.Unloaded) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/map" element={<MainPage />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/devices" element={<DeviceList />} />
          <Route path="/admin/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
