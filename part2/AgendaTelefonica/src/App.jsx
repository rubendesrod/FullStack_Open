import { useState, useEffect } from "react";
import personService from "./services/persons";
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
const Persons = ({ listPersons, deletePerson }) => {
  return (
    <ul>
      {listPersons.map((p) => (
        <li key={p.id}>
          {p.name} | {p.number}{" "}
          <button onClick={() => deletePerson(p.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

// Componte principal
function App() {
  // Estado con un array de objetos de personas
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
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

  // Método para actualizar el telefono de una persona
  const aupdatePerson = () => {
    const msg = `${newName} existe actualmente en la agenda quieres actualizar su numero de telefono?`;
    // Se pregunta al usuario si quiere que se actualize el numero de telefono de la persona que ya existe
    if (window.confirm(msg)) {
      const person = persons.find((p) => p.name === newName);
      const updatedPerson = { ...person, number: newPhone };

      personService
        .update(person.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
          setNewName("");
          setNewPhone("");
        })
        .cath((e) => {
          alert(`${person.name} no se ha podido actualizar`);
        });
    } else {
      setNewName("");
      setNewPhone("");
    }
  };

  // Metodo para borrar a una persona
  const deletePerson = (id) => {
    if (window.confirm(`Quieres borrar esta persona de la agenda?`)) {
      personService.updown(id).then((personDelete) => {
        alert(`${personDelete.name} ha sido borrado de la agenda`);
        const personsModified = persons.filter((p) => p.id !== id);
        console.log(personsModified);
        setPersons(personsModified);
      });
    }
  };

  // Funcion para añadir una persona
  const addPerson = (event) => {
    event.preventDefault();

    if (comprobarNombre(newName)) {
      aupdatePerson()
      return
    }

    // Creo un objeto nuevo para concatenar con el array de objetos
    const objectPerson = {
      name: newName,
      number: newPhone,
    };

    personService.create(objectPerson).then((returnedPersona) => {
      setPersons(persons.concat(returnedPersona));
      setNewName("");
      setNewPhone("");
    });
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

      <Persons listPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
}

export default App;
