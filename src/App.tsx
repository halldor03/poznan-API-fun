import { useState, useEffect } from "react";
import Inputs from "./components/Inputs";
import GeoportalAPI from "./components/GeoportalAPI";

// interface StreetsType {
//   id: number;
//   properties: PropertiesType;
// }

// interface PropertiesType {
//   a3: string;
//   a4: string;
//   a5: string;
//   a6: string;
// }

function App() {
  const [fetchedStreets, setFetchedStreets] = useState<string[]>([]);
  const [filteredStreets, setFilteredStreets] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState({
    name: "",
    select: "",
  });

  useEffect(() => {
    fetch(
      "https://www.poznan.pl/featureserver/featureserver.cgi/ulice/all.json"
    )
      .then((response) => response.json())
      .then((data) => setFetchedStreets(data.features));
  }, []);

  useEffect(() => {
    const nameFilter = fetchedStreets.filter((street: any) => {
      //FIX THIS "ANY" LATER
      if (
        street.properties.a6
          .toLowerCase()
          .includes(inputValues.name.toLowerCase())
      ) {
        return street;
      }
    });
    const typeFilter = nameFilter.filter((street: any) => {
      //FIX THIS "ANY" LATER
      if (inputValues.select === "") {
        return street;
      }
      if (street.properties.a4 === inputValues.select) {
        return street;
      }
    });
    setFilteredStreets(typeFilter);
  }, [inputValues]);

  return (
    <>
      <Inputs inputValues={inputValues} setInputValues={setInputValues} />
      <GeoportalAPI />
      {inputValues.name === "" && inputValues.select === ""
        ? fetchedStreets.map((street: any) => {
            //FIX THIS "ANY" LATER
            return (
              <div key={street.id} className="streetElement">
                {street.properties.a4} {street.properties.a6}
              </div>
            );
          })
        : filteredStreets.map((street: any) => {
            //FIX THIS "ANY" LATER
            return (
              <div key={street.id} className="streetElement">
                {street.properties.a4} {street.properties.a6}
              </div>
            );
          })}
    </>
  );
}

export default App;
