import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUser, removeUserSession } from '../services/common';
import { useRouter } from 'next/router';
import { User } from '../utils/types';

export function Header() {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const logout = () => {
    removeUserSession();
    router.push('/auth/login');
  };

  const user = getUser();

  useEffect(() => {
    const fetchVideoAndCourse = async () => {
      try {
        if (user) {
          setLoggedUser(user);
        }
      } catch (error) {
        console.error('Error fetching video, course, and videos:', error);
      }
    };

    fetchVideoAndCourse();
  }, [user]);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">

      </div>

      <div className="flex items-center justify-end space-x-2">
        {loggedUser ? (
          <>
            <Link href="/dashboard" passHref>
              <div className="flex items-center hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                <i className="fas fa-home mr-2"></i>
                Home
              </div>
            </Link>
            <Link href="/courses" passHref>
              <div className="flex items-center hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                <i className="fas fa-book mr-2"></i>
                Courses
              </div>
            </Link>
            <Link href="/quizzes" passHref>
              <div className="flex items-center hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                <i className="fas fa-question-circle mr-2"></i>
                Quizzes
              </div>
            </Link>

            <div onClick={logout}>
              <div className="flex items-center hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                <i className="fas fa-lock-circle mr-2"></i>
                Logout
              </div>
            </div>
          </>
        ) : (
          <Link href="/auth/login" passHref>
            <div className="flex items-center hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
              <i className="fas fa-lock-circle mr-2"></i>
              Login
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
