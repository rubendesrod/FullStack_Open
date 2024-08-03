import { useEffect, useState } from "react";
import ViewCountry from "./ViewCountry";

const ListCountrys = ({ countrys, country }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countrySearch = countrys.filter((c) =>
    c.name.common.toLowerCase().includes(country.toLowerCase())
  );

  let flag = countrySearch.length > 10;


    // Para cuando el country cambie uso un efecto para que selected country sea null
    useEffect(() => {
        setSelectedCountry(null);
      }, [country]);

  const handleClickShow = (countryPosition) => {
    setSelectedCountry(countrySearch[countryPosition]);
  };

  if (countrySearch.length === 1) {
    return <ViewCountry country={countrySearch[0]} />;
  }

  return (
    <div>
      <ul>
        {flag
          ? "Haz una consulta más específica"
          : countrySearch.map((country, index) => (
              <li key={country.area}>
                {country.name.common} &nbsp;
                <button onClick={() => handleClickShow(index)}>show</button>
              </li>
            ))}
      </ul>
      {selectedCountry && <ViewCountry country={selectedCountry} />}
    </div>
  );
};

export default ListCountrys;
