import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"
import "leaflet-defaulticon-compatibility"
import {
  Page,
  Role,
  Status,
  green_icon,
  red_icon,
  yellow_icon,
} from "src/data"
import { CordsPair, DeviceData, MarkerPos, User } from "src/types"
import {
  ExportButton,
  MainPageContainer,
  MarkerButton,
  MarkerLi,
  ShowMoreButton,
} from "src/pages/Map/Map.styled"
import { createRoutineMachineLayer } from "src/components/RoutingMachine"
import L from "leaflet"
import { useAppSelector } from "src/hooks"
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/store"
import { changeMarkerStatus } from "src/slices/deviceSlice"
import { createControlComponent } from "@react-leaflet/core"
import Sidebar from "src/components/Sidebar/Sidebar"
import React, { useEffect } from "react"
import { useNavigate } from "react-router"

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const curUser: User = useAppSelector((state) => state.user.userData)
  const markersData: DeviceData[] = useAppSelector(
    (state) => state.device.devicesData
  )
  const mapRef = React.useRef() as React.MutableRefObject<L.Map>
  console.log(markersData)
  const showMore = (id: string) => {
    const curField = document.getElementById(id + "")
    const curButton = document.getElementById("button" + id)
    if (curField?.style.display == "none") {
      curField.style.display = "inline"
      curButton!.innerHTML = "-"
    } else if (curField?.style.display == "inline") {
      curField.style.display = "none"
      curButton!.innerHTML = "+"
    }
  }

  const convertCords = (
    curCords: CordsPair,
    cordsArray: CordsPair[],
    activity: Status[]
  ) => {
    const latLngArray: L.LatLng[] = [
      L.latLng(curCords.latitude, curCords.longitude),
    ]
    cordsArray.map((cordsPair: CordsPair, index) => {
      if (activity[index] == Status.Active)
        latLngArray.push(L.latLng(cordsPair.latitude, cordsPair.longitude))
    })
    return latLngArray
  }

  const showAdditionalMarker = (
    markerDataIndex: number,
    pastCordsIndex: number
  ) => {
    const newMarkerPos: MarkerPos = {
      deviceNum: markerDataIndex,
      pastMarkerPos: pastCordsIndex,
    }
    dispatch(changeMarkerStatus(newMarkerPos))
  }

  const RoutingMachine = createControlComponent(createRoutineMachineLayer)

  const chooseIcon = (markerStatus: string) => {
    if (markerStatus == "Активно") return green_icon
    else return red_icon
  }

  useEffect(() => {
    if (mapRef.current) {
      document.addEventListener("onunload", clearMap)
    }
    if (curUser.Role == Role.LoggedOut || curUser.Role == Role.HasErrors)
      navigate("/login")
  }, [curUser.Role, navigate])

  const clearMap = () => {
    mapRef.current.remove()
    mapRef.current.off()
  }

  const exportData = (marker: DeviceData) => {
    console.log(marker)

    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += "id" + ";" + marker.id + "\r\n",
    csvContent +=
      "curent coordinates" +
      ";" +
      marker.curCords.latitude +
      ";" +
      marker.curCords.longitude +
      "\r\n"
    csvContent +=
      "previous coordinates: " +
      ";" +
      marker.previousCords[0].latitude +
      ";" +
      marker.previousCords[0].longitude +
      ";" +
      marker.previousCords[1].latitude +
      ";" +
      marker.previousCords[1].longitude +
      ";" +
      marker.previousCords[2].latitude +
      ";" +
      marker.previousCords[2].longitude +
      ";" +
      marker.previousCords[3].latitude +
      ";" +
      marker.previousCords[3].longitude +
      "\r\n",
    csvContent += "last activity" + ";" + marker.lastActivity + "\r\n"
    if (marker.status == "Активен")
      csvContent += "status" + ";" + "active" + "\r\n"
    else csvContent += "status" + ";" + "inactive" + "\r\n"
    const encodedUri = encodeURI(csvContent)
    window.open(encodedUri)
  }

  return (
    <MainPageContainer>
      <Sidebar curPage={Page.userData} />
      <MapContainer
        style={{ height: "100vh", width: "85%", overflow: "hidden" }}
        center={[60.038353, 30.322507]}
        minZoom={3}
        zoom={12}
        maxZoom={18}
        worldCopyJump
        maxBoundsViscosity={1}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markersData.map((marker: DeviceData, index) => (
          <>
            <Marker
              position={[marker.curCords.latitude, marker.curCords.longitude]}
              key={marker.id}
              icon={chooseIcon(marker.status)}
            >
              <Popup>
                <div>id: {marker.id}</div>
                <div>
                  текущие координаты: {marker.curCords.latitude},{" "}
                  {marker.curCords.longitude}
                </div>
                <div>
                  {marker.previousCords.length > 0 ? (
                    <>
                      предыдущие координаты{" "}
                      <ShowMoreButton
                        id={"button" + marker.id}
                        onClick={() => showMore(marker.id)}
                      >
                        {" "}
                        +{" "}
                      </ShowMoreButton>{" "}
                      <br />
                      <MarkerLi>
                        {" "}
                        {marker.previousCords[0].latitude},{" "}
                        {marker.previousCords[0].longitude}{" "}
                        <MarkerButton
                          onClick={() => showAdditionalMarker(index, 0)}
                        >
                          +
                        </MarkerButton>
                      </MarkerLi>
                      <span id={marker.id + ""} style={{ display: "none" }}>
                        {marker.previousCords
                          .slice(1, marker.previousCords.length)
                          .map((cordsPair: CordsPair, pastCordsIndex) => {
                            return (
                              <MarkerLi key={cordsPair.latitude}>
                                {cordsPair.latitude}, {cordsPair.longitude}{" "}
                                <MarkerButton
                                  onClick={() =>
                                    showAdditionalMarker(
                                      index,
                                      pastCordsIndex + 1
                                    )
                                  }
                                >
                                  +
                                </MarkerButton>
                              </MarkerLi>
                            )
                          })}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>последнее обновление: {marker.lastActivity}</div>
                <div>статус: {marker.status}</div>
                <ExportButton onClick={() => exportData(marker)}>
                  Экспортировать данные
                </ExportButton>
              </Popup>
            </Marker>
            {marker.previousCordsStatus.map(
              (markerStatus: Status, index: number) => (
                <>
                  {markerStatus == Status.Active ? (
                    <Marker
                      position={[
                        marker.previousCords[index].latitude,
                        marker.previousCords[index].longitude,
                      ]}
                      key={marker.id}
                      icon={yellow_icon}
                    ></Marker>
                  ) : (
                    <></>
                  )}
                </>
              )
            )}
            <RoutingMachine
              waypoints={convertCords(
                marker.curCords,
                marker.previousCords,
                marker.previousCordsStatus
              )}
            />
          </>
        ))}
      </MapContainer>
    </MainPageContainer>
  )
}

export default MainPage
