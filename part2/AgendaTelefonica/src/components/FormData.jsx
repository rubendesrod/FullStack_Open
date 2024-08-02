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

  export default FormData