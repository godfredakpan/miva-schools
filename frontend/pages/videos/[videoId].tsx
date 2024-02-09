import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Course, Video } from '../../utils/types';
import { fetchData, postData } from '../../services/apiService';
import { APIURL } from '../../utils/api';
import { getUser } from '../../services/common';

const VideoPage: React.FC = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const [video, setVideo] = useState<Video | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<string[]>([]);

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const user = getUser();

  const handleSaveNote = async () => {
    try {
      const body = { userId: user._id, videoId, content: note };

      const response = await postData(`${APIURL}/notes/addNote`,body);

      const savedNote = response;
      setNotes((prevNotes) => [...prevNotes, savedNote.content]);
      setNote('');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };



  useEffect(() => {
    const fetchVideoAndCourse = async () => {
      try {
        if (videoId) {

          const videoResponse = await fetchData(`${APIURL}/videos/details/${videoId}`);
          const videoData = videoResponse.data[0];
          setVideo(videoData);

          const courseResponse = await fetchData(`${APIURL}/courses`);
          const courseData = courseResponse.data[0];
          setCourse(courseData);

          const courseId = videoData?.courseId;
          const videosResponse = await fetchData(`${APIURL}/videos/${courseId}`);
          const videosData = videosResponse.data;
          setVideos(videosData);

          const response = await fetchData(`${APIURL}/notes/video/${videoId}/${user._id}`);
          const notesData = response.data;
          setNotes(notesData.map((note: { content: string }) => note.content));
        }
      } catch (error) {
        console.error('Error fetching video, course, notes, and videos:', error);
      }
    };

    fetchVideoAndCourse();
  }, [videoId]);

  const handleNextVideo = () => {
    if (!videos || !video) {
      console.error('No videos available');
      return;
    }

    const sortedVideos = [...videos];

    const currentVideoIndex = sortedVideos.findIndex((v: Video) => v._id === video._id);
    const nextVideo = sortedVideos[currentVideoIndex + 1];

    if (nextVideo) {
      window.location.href =`/videos/${nextVideo._id}`;
    } else {
      console.log('No next video available');
    }
  };

  const handlePreviousVideo = () => {
    if (!videos || !video) {
      console.error('No videos available');
      return;
    }

    const sortedVideos = [...videos];

    const currentVideoIndex = sortedVideos.findIndex((v: Video) => v._id === video._id);
    const nextVideo = sortedVideos[currentVideoIndex - 1];

    if (nextVideo) {
      window.location.href =`/videos/${nextVideo._id}`;

    } else {
      console.log('No next video available');
    }
  };

  const handleBackToCourses = () => {
    router.push(`/courses/${course?._id}`);
  };

  if (!video || !course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto my-8">
      <span className="cursor-pointer" onClick={handleBackToCourses}>
          ←
        </span>{' '}
      <p className="p-4">Course: {course.name}</p>
      <div className="max-l-lg border rounded-md overflow-hidden shadow-lg">
        <p className="text-xl font-bold p-4">{video.title}</p>
        <video id="videoPlayer" className="w-full" controls>
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex justify-between p-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePreviousVideo}>
            Previous Video
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextVideo}>
            Next Video
          </button>
        </div>
        
      </div>

      <div className="max-l-lg mt-6 p-8 border rounded-md overflow-hidden shadow-lg">
        <input
          type="text"
          value={note}
          onChange={handleNoteChange}
          placeholder="Add a note"
          className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none"
        />
        <button onClick={handleSaveNote} className="bg-green-500 text-white py-2 px-4 rounded-md">
          Save Note
        </button>
      </div>
      <div className='mt-6'>
        <h3 className="text-lg font-bold mb-2">Notes:</h3>
        <ul className="list-disc pl-6">
          {notes.map((note, index) => (
            <li key={index} className="mb-1">{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoPage;
