import { useEffect } from "react";
import proj4 from "proj4";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

declare global {
  interface Window {
    initMap: () => void;
  }
}

interface MapAPIType {
  selectedStreetCoords: string[];
}

function FlyMapTo({ selectedStreetCoords }: any) {
  const PL2000 =
    "+proj=tmerc +lat_0=0 +lon_0=18 +k=0.999923 +x_0=6500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs";
  const WGS84 = "+proj=longlat +datum=WGS84 +no_defs +type=crs";

  const selectedStreetCoordsTransformed: any = [];
  selectedStreetCoords.forEach((element: any) => {
    const a = proj4(PL2000, WGS84, element);
    selectedStreetCoordsTransformed.push(a);
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
    : (centerPosition = {
        lat: 0,
        lng: 0,
      });

  const map = useMap();

  useEffect(() => {
    map.flyTo(centerPosition, 17);
  }, [centerPosition]);

  return null;
}

export default function MapAPI({ selectedStreetCoords }: MapAPIType) {
  const PL2000 =
    "+proj=tmerc +lat_0=0 +lon_0=18 +k=0.999923 +x_0=6500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs";
  const WGS84 = "+proj=longlat +datum=WGS84 +no_defs +type=crs";

  const selectedStreetCoordsTransformed: any = [];
  selectedStreetCoords.forEach((element: any) => {
    const a = proj4(PL2000, WGS84, element);
    selectedStreetCoordsTransformed.push(a);
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
    : (centerPosition = {
        lat: 0,
        lng: 0,
      });
  // console.log(selectedStreetCoords);
  // console.log(centerPosition);

  return (
    <>
      {selectedStreetCoords.length === 0 ? (
        <MapContainer
          center={[52.408263, 16.934161]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          />
        </MapContainer>
      ) : (
        <MapContainer center={centerPosition} zoom={18} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          />
          <FlyMapTo selectedStreetCoords={selectedStreetCoords} />
        </MapContainer>
      )}
    </>
  );
}

// TO DO:
// - zoom speed increase
// - polylines
// - pagination

// https://react-leaflet.js.org/
// https://leafletjs.com/
