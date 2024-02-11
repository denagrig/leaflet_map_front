import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"
import "leaflet-defaulticon-compatibility"
import {
  MainPageContainer
} from "src/pages/Map/Map.styled"
import L from "leaflet"
import React from "react"

const MainPage = () => {
  const mapRef = React.useRef() as React.MutableRefObject<L.Map>


  return (
    <MainPageContainer>
      <MapContainer
        style={{ height: "100vh", width: "80%", overflow: "hidden" }}
        center={[60.038353, 30.322507]}
        minZoom={3}
        zoom={12}
        maxZoom={18}
        worldCopyJump
        maxBoundsViscosity={1}
        ref = {mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </MainPageContainer>
  )
}

export default MainPage
