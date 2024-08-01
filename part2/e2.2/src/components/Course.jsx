const Course = ({ course }) => {
  let total = 0;
  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map((c) => {
        total += c.exercises;
        return (
          <p key={c.id}>
            {c.name} {c.exercises}
          </p>
        );
      })}
      <strong>Total of {total} exercises</strong>
    </>
  );
};

export default Course;
