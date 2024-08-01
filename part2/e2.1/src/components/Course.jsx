

const Course = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map((c) => (
        <p key={c.id}>{c.name} {c.exercises}</p>
      ))}
    </>
  );
};

export default Course;
