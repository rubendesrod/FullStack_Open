import { useState, useEffect } from "react";
import personService from "./services/persons";
import "./App.css";
import FormData from "./components/FormData";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

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

  // Estado para el mensaje de verificación o incorrecto
  const [informationMessage, setInformationMessage] = useState({
    message: null,
    type: "correct",
  });

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
          const updateInformation = {
            message: `El numero de ${updatedPerson.name} ha sido actualizado`,
            type: "correct",
          };
          setInformationMessage(updateInformation);
          setTimeout(() => {
            setInformationMessage({ message: null, type: "correct" });
          }, 5000);
        })
        .catch((error) => {
          const updateInformation = {
            message: `El contacto ${updatedPerson.name} no se ha podido actualizar`,
            type: "error",
          };
          setInformationMessage(updateInformation),
            setTimeout(() => {
              setInformationMessage({ message: null, type: "correct" });
            }, 5000);
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
      aupdatePerson();
      return;
    }

    // Creo un objeto nuevo para concatenar con el array de objetos
    const objectPerson = {
      name: newName,
      number: newPhone,
    };

    personService
      .create(objectPerson)
      .then((returnedPersona) => {
        setPersons(persons.concat(returnedPersona));
        setNewName("");
        setNewPhone("");
        const updateInformation = {
          message: `${returnedPersona.name} ha sido agregado a tu agenda`,
          type: "correct",
        };
        setInformationMessage(updateInformation);
        setTimeout(() => {
          setInformationMessage({ message: null, type: "correct" });
        }, 5000);
      })
      .catch((error) => {
        const updateInformation = {
          message: `No se pudo agregar a ${objectPerson.name} a tu agenda`,
          type: "error",
        };
        setInformationMessage(updateInformation);
        setTimeout(() => {
          setInformationMessage({ message: null, type: "correct" });
        }, 5000);
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

      <Notification informationMessage={informationMessage} />

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
