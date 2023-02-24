import { useEffect } from "react";
import proj4 from "proj4";
import { MapContainer, TileLayer, useMap, Polyline } from "react-leaflet";

declare global {
  interface Window {
    initMap: () => void;
  }
}

interface MapMainType {
  selectedStreetCoords: string[];
}

export default function MapMain({ selectedStreetCoords }: MapMainType) {
  const starterCoords = [52.408263, 16.934161];
  const PL2000 =
    "+proj=tmerc +lat_0=0 +lon_0=18 +k=0.999923 +x_0=6500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs";
  const WGS84 = "+proj=longlat +datum=WGS84 +no_defs +type=crs";

  const selectedStreetCoordsTransformed: any = [];
  selectedStreetCoords.forEach((element: any) => {
    const transformedCoord = proj4(PL2000, WGS84, element);
    selectedStreetCoordsTransformed.push(transformedCoord);
  });

  const streetCoords = selectedStreetCoordsTransformed.map((item: any) => {
    return { lng: item[0], lat: item[1] };
  });

  let centerPosition: any;
  selectedStreetCoords.length !== 0
    ? (centerPosition = {
        lat: selectedStreetCoordsTransformed[
          (selectedStreetCoordsTransformed.length / 2).toFixed()
        ][1],
        lng: selectedStreetCoordsTransformed[
          (selectedStreetCoordsTransformed.length / 2).toFixed()
        ][0],
      })
    : (centerPosition = starterCoords);
  // console.log(selectedStreetCoords);
  // console.log(centerPosition);
  // console.log(streetCoords);

  return (
    <>
      <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        />
        {selectedStreetCoords.length !== 0 ? (
          <MapFlyTo
            selectedStreetCoords={selectedStreetCoords}
            centerPosition={centerPosition}
          />
        ) : null}
        {selectedStreetCoords.length !== 0 ? (
          <Polyline
            pathOptions={{ color: "red", weight: 7 }}
            positions={streetCoords}
          />
        ) : null}
      </MapContainer>
    </>
  );
}

function MapFlyTo({ centerPosition }: any) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(centerPosition, 17, { duration: 2 });
  }, [centerPosition]);

  return null;
}
