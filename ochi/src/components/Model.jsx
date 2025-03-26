import React from 'react';
import { courses } from '../assets/Courses';
import Navbar from './Navbar';

const Model = ({ name }) => {
    // Ensure courses is defined
    if (!courses || !Array.isArray(courses)) {
        return <p className="text-center text-red-500">Courses data is unavailable.</p>;
    }

    // Filter courses where title matches 'name'
    const filteredCourses = courses.filter(course => course.title === name);

    return (
        <>
        <Navbar/>
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Courses for {name}</h2>
            {filteredCourses.length > 0 ? (
                <div className="space-y-6">
                    {filteredCourses.map((course, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                            {Array.isArray(course.videos) ? (
                                <div className="flex flex-col space-y-4">
                                    {course.videos.map((video, vidIndex) => (
                                        <div key={vidIndex} className="flex items-center bg-gray-100 p-3 rounded-lg">
                                            <img src={video.thumbnail} alt={video.videoTitle} className="w-32 h-20 object-cover rounded-lg mr-4" />
                                            <div>
                                                <p className="font-medium">{video.videoTitle}</p>
                                                <p className="text-sm text-gray-500">by {video.author}</p>
                                                <a 
                                                    href={video.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Watch on YouTube
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No videos available.</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No courses found for {name}</p>
            )}
        </div>
        </>
    );
};

export default Model;