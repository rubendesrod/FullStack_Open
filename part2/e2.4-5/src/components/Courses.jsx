import Course from './Course.jsx'

const Courses = ({ courses }) => {
  // Hay dos cursos dentro del array

  return (
    <>
     {courses.map((c) => (
      <Course key={c.id} parts={c.parts} name={c.name}/>
     ))}
    </>
  );
};

export default Courses;
