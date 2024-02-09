
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/apiService';
import { APIURL } from '../../utils/api';
import { Course } from '../../utils/types';
import Link from 'next/link';
import Image from 'next/image';

const Dashboard: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const courseColors = ['#EA7052', '#506AAC', '#FCA964', '#68BC98', '#EE6B6B', '#7B7FDA', '#B75C8D', '#EFBC37'];

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * courseColors.length);
        return courseColors[randomIndex];
    };

    useEffect(() => {
        const fetchVideoAndCourse = async () => {
            try {

                const courseResponse = await fetchData(`${APIURL}/courses`);
                const courseData = courseResponse.data;
                setCourses(courseData);

            } catch (error) {
                console.error('Error fetching video, course, notes, and videos:', error);
            }
        }

        fetchVideoAndCourse();
    }, []);


    return (

        <div>

            <div className="grid grid-cols-1 gap-y-12 advert-card rounded-md shadow-md	">
                <Image
                    src={"https://ucarecdn.com/4c778599-4870-480c-b8b2-d6201afa00fb/banner.png"}
                    alt="Empty Data"
                    style={{ textAlign: 'center' }}
                    width={1500}
                    height={200}
                    objectFit="cover"
                    className="rounded-t-md" />
            </div>

            <h1 className='card-title'>Watch Video Lessons</h1>

            <div className="grid grid-cols-5 gap-y-1 row card gap-4 ">

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
                    <p>No courses available.</p>
                )}

            </div>


            <div className="flex card exam-card shadow-md">
                <div className="">
                    <p className='mt-9 text-lg text-red-700'>Practice exam</p>
                    <h1 className='text-2xl mt-9 '>Ready to test your knowledge?</h1>
                    <p className='mt-9 '>Take practice exams to prepare for upcoming exams. Practice makes perfect grades!</p>
                    <Link href="/quizzes" passHref>
                        <button type="button" className="mt-9 px-6 py-3.5 text-base font-medium text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Start Practice</button>
                    </Link>

                </div>

                <div className="w-1/2 p-8 bg-cover" style={{ backgroundImage: 'url("https://ucarecdn.com/60af95c5-cd81-4305-8622-3fbb19756eae/Frame3233083.png")' }}>

                </div>
            </div>


        </div>


    );
};


export default Dashboard;
