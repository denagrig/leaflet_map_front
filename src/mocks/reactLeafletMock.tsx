const MapContainer = ({ children } : {children : any}) => <div data-testId="MapContainer">{children}</div>

const useMap = () => ({ fitBounds: () => {} })

const TileLayer = () => <div data-testId="TileLayer" />

const Marker = ({ children } : {children : any}) => <div data-testId="Marker">{children}</div>

const Popup = ({ children } : {children : any}) => <div data-testId="Popup">{children}</div>

export { MapContainer, TileLayer, Marker, Popup, useMap }