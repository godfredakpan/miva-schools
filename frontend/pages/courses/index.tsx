import axios from 'axios';
import CourseList from '../../components/CourseList';
import { Course, CourseListProps } from '../../utils/types';
import { APIURL } from '../../utils/api';
import { fetchData } from '../../services/apiService';


const Courses: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course Page</h1>
      <CourseList courses={courses} />
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetchData(`${APIURL}/courses`);
  const courses = response.data;

  return { props: { courses } };
}

export default Courses;
