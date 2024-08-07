const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, it) => (
        <Part part={part.name} exercise={part.exercises} key={it} />
      ))}
    </>
  );
};

const Part = ({ part, exercise, iterator }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Total = (props) => {
  let parts = props.parts;
  let total = 0;
  parts.map((part) => (total += part.exercises));
  return (
    <>
      <p>Total exercises: {total}</p>
    </>
  );
};

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
