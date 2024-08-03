import "./App.css";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import ListCountrys from "./components/ListCountrys";
import countrysAPI from "./services/country";

function App() {
  // creo los estado para el pais que se está buscando y los paises en general
  const [newCountry, setNewCountry] = useState("");
  const [countrys, setCountrys] = useState([]);

  useEffect(() => {
    countrysAPI
      .getAll()
      .then((initialCountrys) => setCountrys(initialCountrys));
  }, []);

  const handleChangeCountry = (event) => {
    setNewCountry(event.target.value);
  };

  return (
    <>
      <h1>COUNTRY'S API</h1>
      <Filter onChange={handleChangeCountry} />
      <ListCountrys countrys={countrys} country={newCountry} />
    </>
  );
}

export default App;
