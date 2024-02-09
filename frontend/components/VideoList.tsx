
import Link from "next/link";
import { VideoListProps } from "../utils/types";
import { useRouter } from "next/router";
import EmptyState from "./EmptyState";

  const VideoList: React.FC<VideoListProps> = ({ videos }) => {
    const router = useRouter();

    const handleBackToCourses = () => {
        router.push(`/courses`);
      };

    return (

        <><span className="cursor-pointer" onClick={handleBackToCourses}>
            ←
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 text-center lg:grid-cols-3 gap-4">
                {videos?.length > 0 ? (
                    videos.map((video) => (
                        <Link key={video._id} href={`/videos/${video._id}`} passHref>
                            <div className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                                <div className="p-4">
                                    <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                                </div>
                                <div className="flex items-center justify-center">
                                    <i className="text-blue-500 cursor-pointer">
                                        <i className="fas fa-play-circle fa-3x"></i>
                                    </i>
                                </div>
                                <div className="flex items-center justify-center p-4">
                                    <p className="text-sm text-center mb-2">{video.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <EmptyState />
                )}
            </div></>

    );
  };
  
  export default VideoList;
  