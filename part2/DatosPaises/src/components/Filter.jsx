const Filter = ({ onChange }) => {
    
  return (
    <div className="filter">
      <p>Find Countrys</p>
      <input type="text" onChange={onChange} />
    </div>
  );
};

export default Filter;
