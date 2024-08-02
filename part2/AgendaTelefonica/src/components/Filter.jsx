
// Componente para realizar la búsqueda
const Filter = ({ searchValue, onSearchChange }) => {
    return (
      <div className="search">
        <p>filter shown with</p>
        <input value={searchValue} onChange={onSearchChange} />
      </div>
    );
  };
  

export default Filter