const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Course = ({ parts, name }) => {
  let total = parts.reduce((acc, p) => acc + p.exercises, 0);
  return (
    <div>
      <h2>{name}</h2>
      {parts.map((p) => (
        <Part key={p.id} name={p.name} exercises={p.exercises} />
      ))}
      <strong>Total of {total} exercises</strong>
    </div>
  );
};

export default Course;
