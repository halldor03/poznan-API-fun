interface InputsType {
  inputValues: InputsChildrenType;
  setInputValues: (children: InputsChildrenType) => void;
}

interface InputsChildrenType {
  name: string;
  select: string;
}

export default function Inputs({ inputValues, setInputValues }: InputsType) {
  return (
    <>
      <form>
        <fieldset>
          <label htmlFor="nameInput">Ulica</label>
          <input
            type="text"
            id="nameInput"
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
          <label htmlFor="selectInput">Rodzaj</label>
          <select
            id="selectInput"
            value={inputValues.select}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                select: e.target.value,
              })
            }
          >
            <option value="">-</option>
            <option value="ul.">ul.</option>
            <option value="pl.">pl.</option>
            <option value="al.">al.</option>
            <option value="tunel">tunel</option>
            <option value="most">most</option>
            <option value="wiadukt">wiadukt</option>
            <option value="rondo">rondo</option>
          </select>
        </fieldset>
      </form>
    </>
  );
}
