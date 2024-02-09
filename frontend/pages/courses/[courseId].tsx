import { useRouter } from 'next/router';
import VideoList from '../../components/VideoList';
import { Course, VideoListProps } from '../../utils/types';
import { APIURL } from '../../utils/api';
import { fetchData } from '../../services/apiService';
import { useEffect, useState } from 'react';


const Videos: React.FC<VideoListProps> = ({ videos }) => {
  const router = useRouter();
  const { courseId } = router.query as { courseId: string }; 
  const [course, setCourse] = useState<Course | null>(null);


  useEffect(() => {
    const fetchVideoAndCourse = async () => {
      try {
        if (courseId) {

          const courseResponse = await fetchData(`${APIURL}/courses/details/${courseId}`);
          const courseData = courseResponse.data[0];
          setCourse(courseData);
        }
      } catch (error) {
        console.error('Error fetching video, course, and videos:', error);
      }
    };

    fetchVideoAndCourse();
  }, [courseId]);


  return (
    <div>
      <h1>Videos for Course {course?.name}</h1>
      <VideoList videos={videos} />
    </div>
  );
};

export async function getServerSideProps({ params }: { params: { courseId: string } }) {
  const response = await fetchData(`${APIURL}/videos/${params.courseId}`);
  const videos = response.data;
  return { props: { videos } };
}

export default Videos;
