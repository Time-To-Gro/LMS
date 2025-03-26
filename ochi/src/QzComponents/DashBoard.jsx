// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DashBoard = () => {
//   const [userScores, setUserScores] = useState({});
//   const userId = localStorage.getItem("userId"); // Get the logged-in user ID
//   const token = localStorage.getItem("token"); // Get the authentication token

//   useEffect(() => {
//     const fetchScores = async () => {
//       try {
//         const response = await axios.get(`/api/users/${userId}/scores`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const scoresData = response.data.scores || {}; // Ensure scoresData is always an object
//         setUserScores(scoresData);
//         localStorage.setItem("userScores", JSON.stringify(scoresData)); // Store latest scores
//       } catch (error) {
//         console.error("Error fetching scores:", error.response?.data?.message || error.message);
//       }
//     };

//     fetchScores();
//   }, [userId]); // Runs when userId changes

//   const subjects = [
//     { key: "dbms", title: "DBMS" },
//     { key: "cn", title: "Computer Networks" },
//     { key: "oops", title: "Object-Oriented Programming" },
//     { key: "dsa", title: "Data Structures & Algorithms" },
//     { key: "aptitude", title: "Aptitude" }
//   ];

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Quiz Dashboard</h1>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-indigo-600 text-white">
//               <th className="p-3">Subject</th>
//               <th className="p-3">Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subjects.map((subject) => (
//               <tr key={subject.key} className="border-b border-gray-300 text-center">
//                 <td className="p-3">{subject.title}</td>
//                 <td className="p-3 font-semibold">
//                   {userScores && userScores[subject.key] !== undefined
//                     ? `${userScores[subject.key]} / 10`
//                     : "Not Attempted"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;


import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashBoard = () => {
  const [userScores, setUserScores] = useState([]); // Store scores as an array
  const navigate = useNavigate();
  let userId =JSON.parse(localStorage.getItem("userId")); 
  let token = JSON.parse(localStorage.getItem("token")); 
  // userId = userId.replace(/^"|"$/g, ""); 
  // token = token.replace(/^"|"$/g, ""); 
  useEffect(() => {
    const fetchScores = async () => {
      try {
        console.log(userId);
        console.log(token);
        const response = await axios.get(`http://localhost:5555/api/users/${userId}/scores`, { 
          headers: { authorization: `Bearer ${token}` }
        });

        console.log("Fetched scores:", response.data.scores);
        setUserScores(response.data.scores || []);
        localStorage.setItem("userScores", JSON.stringify(response.data.scores || []));
      } catch (error) {
        console.error("Error fetching scores:", error.response?.data?.message || error.message);
      }
    };

    if (userId) {
      fetchScores();
    }
  }, [userId]); 

  const subjects = [
    { key: "dbms", title: "DBMS" },
    { key: "cn", title: "Computer Networks" },
    { key: "oops", title: "Object-Oriented Programming" },
    { key: "dsa", title: "Data Structures & Algorithms" },
    { key: "aptitude", title: "Aptitude" }
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 shadow-md fixed w-full top-0">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quiz App</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/")}
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/quiz")}
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition cursor-pointer"
            >
              Quiz
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition cursor-pointer"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Quiz Dashboard</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-3">Subject</th>
              <th className="p-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => {
              const scoreEntry = userScores.find((s) => s.subject === subject.key);
              return (
                <tr key={subject.key} className="border-b border-gray-300 text-center">
                  <td className="p-3">{subject.title}</td>
                  <td className="p-3 font-semibold">
                    {scoreEntry ? `${scoreEntry.score} / 10` : "Not Attempted"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
    
  );
};

export default DashBoard;

