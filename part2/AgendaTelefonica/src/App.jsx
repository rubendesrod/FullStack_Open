import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Componente para realizar la búsqueda
const Filter = ({ searchValue, onSearchChange }) => {
  return (
    <div className="search">
      <p>filter shown with</p>
      <input value={searchValue} onChange={onSearchChange} />
    </div>
  );
};

// Componente para el formulario de la agenda
const FormData = (props) => {
  const { onSubmit, onChangeP, onChangeN, valueP, valueN } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input onChange={onChangeP} value={valueP} />
      </div>
      <div>
        number:
        <input onChange={onChangeN} value={valueN} type="number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// Compoenente para cada persona que se registre en la agenda
const Persons = ({ listPersons }) => {
  return (
    <ul>
      {listPersons.map((p) => (
        <li key={p.id}>
          {p.name} | {p.number}
        </li>
      ))}
    </ul>
  );
};
// Componte principal
function App() {
  // Estado con un array de objetos de personas
  const [persons, setPersons] = useState([]);

  // Hago la llamada al servidor para recibir las personas del DB.JSON
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  // Estado para el nombre de la persona
  const [newName, setNewName] = useState("");

  // Estado para el numero de telefono
  const [newPhone, setNewPhone] = useState("");

  // Estado para el valor de búsqueda
  const [searchValue, setSearchValue] = useState("");

  // Funcion para comprobar si el nombre ya existe en la agenda
  const comprobarNombre = (name) => {
    return persons.some((person) => person.name === name);
  };

  // Funcion para añadir una persona
  const addPerson = (event) => {
    event.preventDefault();
    setNewName("");
    setNewPhone("");

    if (comprobarNombre(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // Creo un objeto nuevo para concatenar con el array de objetos
    const objectPerson = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };

    // No se utiliza el mismo array del estado al usar concat se realiza una copia de este
    setPersons(persons.concat(objectPerson));
  };

  // Funcion para cuando el usuario ingrese un nombre
  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  // Funcion para cuando el usuario este ingresando un número
  const handleNumberChange = (event) => {
    setNewPhone(event.target.value);
  };

  // Función para cuando el usuario esté buscando un nombre
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Filtrar la lista de personas basado en el valor de búsqueda
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchValue={searchValue} onSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <FormData
        onSubmit={addPerson}
        onChangeP={handlePersonChange}
        onChangeN={handleNumberChange}
        valueP={newName}
        valueN={newPhone}
      />

      <h2>Numbers</h2>

      <Persons listPersons={filteredPersons} />
    </div>
  );
}

export default App;
