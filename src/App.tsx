import { useState, useEffect } from "react";
import Inputs from "./components/Inputs";
import MapAPI from "./components/MapAPI";
import Streets from "./components/Streets";
import Pagination from "./components/Pagination";

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
  // const [loading, setLoading] = useState(false);
  const [fetchedStreets, setFetchedStreets] = useState<string[]>([]);
  const [filteredStreets, setFilteredStreets] = useState<string[]>([]);
  const [selectedStreetCoords, setSelectedStreetCoords] = useState<string[]>(
    []
  );
  const [inputValues, setInputValues] = useState({
    name: "",
    select: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [streetsPerPage, setStreetsPerPage] = useState(25);
  useEffect(() => {
    // console.log(loading);
    fetch(
      "https://www.poznan.pl/featureserver/featureserver.cgi/ulice/all.json"
    )
      .then((response) => response.json())
      .then((data) => setFetchedStreets(data.features));
    // .then(setLoading(true));
    // setLoading(false);
    // console.log(loading);
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

  const indexOfLastStreet = currentPage * streetsPerPage;
  const indexOfFirstStreet = indexOfLastStreet - streetsPerPage;
  const currentlyDisplayedFetchedStreets = filteredStreets.slice(
    indexOfFirstStreet,
    indexOfLastStreet
  );
  const currentlyDisplayedFilteredStreets = fetchedStreets.slice(
    indexOfFirstStreet,
    indexOfLastStreet
  );
  // console.log(currentlyDisplayedFetchedStreets);
  // console.log(currentlyDisplayedFilteredStreets);
  return (
    <>
      <Inputs inputValues={inputValues} setInputValues={setInputValues} />
      <MapAPI selectedStreetCoords={selectedStreetCoords} />
      <Streets
        inputValues={inputValues}
        fetchedStreets={currentlyDisplayedFetchedStreets}
        filteredStreets={currentlyDisplayedFilteredStreets}
        setSelectedStreetCoords={setSelectedStreetCoords}
      />
      <Pagination
        streetsPerPage={streetsPerPage}
        fetchedStreets={currentlyDisplayedFetchedStreets}
        filteredStreets={currentlyDisplayedFilteredStreets}
        totalStreets={
          inputValues.name === "" && inputValues.select === ""
            ? fetchedStreets.length
            : filteredStreets.length
        }
      />
    </>
  );
}

export default App;
