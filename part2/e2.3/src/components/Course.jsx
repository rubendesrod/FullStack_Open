const Course = ({ course }) => {
  const total = course.parts.reduce((acc, part) => (acc + part.exercises), 0)
  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map((c) => (
        <p key={c.id}>
          {c.name} {c.exercises}
        </p>
      ))}
      <strong>Total of {total} exercises</strong>
    </>
  );
};

export default Course;
