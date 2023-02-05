import React, { useState, useRef } from "react";

type InputsType = {
  fetchedStreets: string[];
  setFetchedStreets: (streets: string[]) => void;
};

export default function Inputs({
  fetchedStreets,
  setFetchedStreets,
}: InputsType) {
  // const nameInput = useRef<HTMLInputElement>(null);
  // const surnameInput = useRef<HTMLInputElement>(null);
  // const selectInput = useRef<HTMLSelectElement>(null);
  const [inputValues, setInputValues] = useState({
    name: "",
    surname: "",
    select: "",
  });

  console.log(inputValues);

  return (
    <>
      <form>
        <fieldset>
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            id="nameInput"
            // ref={nameInput}
            value={inputValues.name}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                name: e.target.value,
              })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="surnameInput">Surname</label>
          <input
            type="text"
            id="surnameInput"
            // ref={surnameInput}
            value={inputValues.surname}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                surname: e.target.value,
              })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="selectInput">Type</label>
          <select
            id="selectInput"
            //  ref={selectInput}
            value={inputValues.select}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                select: e.target.value,
              })
            }
          >
            <option value="null">-</option>
            <option value="ul">ul.</option>
            <option value="pl">pl.</option>
            <option value="dr.wew">dr. wew.</option>
            <option value="tunel">tunel</option>
            <option value="most">most</option>
          </select>
        </fieldset>
      </form>
    </>
  );
}
