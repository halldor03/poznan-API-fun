import React, { useState, useEffect } from "react";
import Inputs from "./components/Inputs";

function App() {
  const [fetchedStreets, setFetchedStreets] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      "https://www.poznan.pl/featureserver/featureserver.cgi/ulice/all.json"
    )
      .then((response) => response.json())
      .then((data) => processAPI(data));
  }, []);

  interface DataType {
    features: string[];
  }

  interface StreetType {
    id: string;
    properties: StreetPropertiesType;
  }

  interface StreetPropertiesType {
    a3: string;
    a4: string;
    a5: string;
    a6: string;
    l: string;
    // value: string;
    // index: number;
    // array: string[];
  }

  function processAPI(data: DataType) {
    const streetsObjects = data.features;
    setFetchedStreets(streetsObjects);
  }

  return (
    <>
      <Inputs
        fetchedStreets={fetchedStreets}
        setFetchedStreets={setFetchedStreets}
      />
      {fetchedStreets.map((street: any) => {
        //FIX THIS "ANY" LATER
        return (
          <div key={street.id}>
            {street.properties.a4} {street.properties.a6}
          </div>
        );
      })}
    </>
  );
}

export default App;
