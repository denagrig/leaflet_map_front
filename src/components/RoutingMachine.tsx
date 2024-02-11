import L from "leaflet"
import "leaflet-routing-machine"

export const createRoutineMachineLayer = (props : any) => {
  const { waypoints } = props
  const plan = new L.Routing.Plan(waypoints, {
    createMarker: () => {
      return false
    },
  })

  const instance = L.Routing.control({
    waypoints,
    lineOptions: {
      styles: [{ color: "#6366F1", weight: 4 }],
      extendToWaypoints: true,
      missingRouteTolerance: 10,
    },
    plan: plan,
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
  })

  return instance
}

//const RoutingMachine = createControlComponent(createRoutineMachineLayer)

//export default RoutingMachine
