import { useState } from "react";

// Componente para la creaciónd de los botones
const Button = ({ text, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

// Componente que engloba las estadisticas
const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let average = (good - bad) / total;
  let positive = (good / total) * 100;

  if (total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <table>
        <tr>
          <StatisticLine text="good" value={good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine text="average" value={average.toFixed(1)} />
        </tr>
        <tr>
          <StatisticLine text="positive" value={positive.toFixed(1)} />
        </tr>
      </table>
    </>
  );
};

// Componente para cada linea de las estadisticas
const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <td>{text}</td>
      <td>{value}</td>
    </div>
  );
};

// Componente principal APP
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Creo la funcion
  const handleButton = (boton) => {
    if (boton === "bueno") {
      setGood(good + 1);
    } else if (boton === "neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>give feedback</h1>

      <Button text="good" onClick={() => handleButton("bueno")} />
      <Button text="neutral" onClick={() => handleButton("neutral")} />
      <Button text="bad" onClick={() => handleButton("malo")} />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
