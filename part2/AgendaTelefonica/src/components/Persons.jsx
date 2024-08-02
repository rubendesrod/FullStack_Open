
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

  export default Persons