
import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from 'react-sidebar';
import { getUser, removeUserSession } from '../services/common';
import { useRouter } from 'next/router';

interface SidebarProps {
  children?: ReactNode;
}

const SidebarComponent: React.FC<SidebarProps> = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user = getUser();

  useEffect(() => {
    const fetchVideoAndCourse = async () => {
      try {
        if (user) {
            setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error, User not found', error);
      }
    };

    fetchVideoAndCourse();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const logout = () => {
    removeUserSession();
    router.push(`/dashboard`);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return <div className="flex-1 p-4">{children}</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        sidebar={
          <div className="bg-gray-800 text-white p-4" style={{height: '100%'}}>
            <h2 className="text-xl font-bold mb-4">Miva Schools</h2>
            <ul>
              <li className="mb-2">
                <Link href="/dashboard" passHref>
                  <div className="flex items-center hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                    <i className="fas fa-home mr-2"></i>
                    Home
                  </div>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/courses" passHref>
                  <div className="flex items-center hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                    <i className="fas fa-book mr-2"></i>
                    Courses
                  </div>
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/quizzes" passHref>
                  <div className="flex items-center hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                    <i className="fas fa-question-circle mr-2"></i>
                    Quizzes
                  </div>
                </Link>
              </li>

              <li className="mb-2">
                <div onClick={logout}>
                  <div className="flex items-center hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                    <i className="fas fa-lock-circle mr-2"></i>
                    Logout
                  </div>
                </div>
              </li>


            </ul>
          </div>
        }
        open={sidebarOpen}
        onSetOpen={toggleSidebar}
        styles={{ sidebar: { background: 'white', width: '250px' } }}
        docked={!sidebarOpen}
      >
        <div className="md:hidden">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={toggleSidebar}
          >
            Toggle Sidebar
          </button>
        </div>
        <div
          className={`flex-1 p-4 ${sidebarOpen ? 'md:ml-0' : ''}`}
          onClick={closeSidebar}
        >
          {children}
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
