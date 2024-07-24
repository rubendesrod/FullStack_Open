const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  const { parts, exercises } = props;
  return (
    <>
      {parts.map((part, index) => (
        <Part part={part} exercise={exercises[index]} key={index} />
      ))}
    </>
  );
};

const Part =  ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}


const Total = (props) => {
  const { exercises } = props;
  const total = exercises.reduce((sum, exercise) => sum + exercise, 0);
  return (
    <p>Total exercises: {total}</p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    "Fundamentals of React",
    "Using props to pass data",
    "State of a component",
  ];
  const exercises = [10, 7, 14];

  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} parts={parts} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
