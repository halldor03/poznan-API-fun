interface StreetsType {
  inputValues: InputsChildrenType;
  fetchedStreets: string[];
  filteredStreets: string[];
  setSelectedStreetCoords: (children: string[]) => void;
}

interface InputsChildrenType {
  name: string;
  select: string;
}

export default function Streets({
  inputValues,
  fetchedStreets,
  filteredStreets,
  setSelectedStreetCoords,
}: StreetsType) {
  return (
    <>
      {inputValues.name === "" && inputValues.select === ""
        ? fetchedStreets.map((street: any) => {
            //FIX THIS "ANY" LATER
            return (
              <div
                key={street.id}
                className="streetElement"
                onClick={() =>
                  setSelectedStreetCoords(street.geometry.coordinates)
                }
              >
                {street.properties.a4} {street.properties.a6}
              </div>
            );
          })
        : filteredStreets.map((street: any) => {
            //FIX THIS "ANY" LATER
            return (
              <div
                key={street.id}
                className="streetElement"
                onClick={() =>
                  setSelectedStreetCoords(street.geometry.coordinates)
                }
              >
                {street.properties.a4} {street.properties.a6}
              </div>
            );
          })}
    </>
  );
}
