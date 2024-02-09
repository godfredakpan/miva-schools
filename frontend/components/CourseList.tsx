
import Link from 'next/link';
import { CourseListProps } from '../utils/types';
import EmptyState from './EmptyState';

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {courses?.length > 0 ? (
        courses.map((course) => (
        <Link key={course._id} href={`/courses/${course._id}`} passHref>
            <div className="bg-white rounded-md overflow-hidden shadow-md">
            <div
                className="w-full h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${course.backgroundImage})` }}
            />
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{course.name}</h3>
            </div>
            </div>
        </Link>
        ))
    ) : (
        <EmptyState/>
    )}
    </div>

  );
};

export default CourseList;
