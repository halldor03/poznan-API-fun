import { useEffect } from "react";
import proj4 from "proj4";

declare global {
  interface Window {
    initMap: () => void;
  }
}

interface MapAPIType {
  selectedStreetCoords: string[];
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

  function initMap(): void {
    const centerPosition = {
      lat: selectedStreetCoordsTransformed[
        (selectedStreetCoordsTransformed.length / 2).toFixed()
      ][1],
      lng: selectedStreetCoordsTransformed[
        (selectedStreetCoordsTransformed.length / 2).toFixed()
      ][0],
    };
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 17,
        center: centerPosition,
      }
    );

    const streetLine = new google.maps.Polyline({
      path: streetCoords,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 5,
    });

    streetLine.setMap(map);
  }

  useEffect(() => {
    initMap();
  });

  return (
    <>
      Hi
      <div id="map"></div>
    </>
  );
}
