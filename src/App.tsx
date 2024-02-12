import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import { AppDispatch } from "./store"
import { loadUser } from "src/slices/userSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "src/hooks"
import { Role, markersData, users} from "src/data"
import MainPage from "src/pages/Map/Map"
import { loadDevicesData } from "./slices/deviceSlice"
import UserList from "./pages/Admin/UserList/UserList"
import DeviceList from "./pages/Admin/DeviceList/DeviceList"

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
 

  useEffect(() => {
    localStorage.setItem("deviceData", JSON.stringify(markersData))
    localStorage.setItem("allUsers", JSON.stringify(users))
    dispatch(loadUser())
    dispatch(loadDevicesData())
  }, [dispatch])

  const userStatus: Role = useAppSelector((state) => state.user.userData.Role)

  if (userStatus != Role.Unloaded) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/map" element={<MainPage />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/devices" element={<DeviceList />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
