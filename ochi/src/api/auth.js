import axios from "axios";

const API_URL = "http://localhost:5555/api/users";

// Axios default settings
axios.defaults.withCredentials = true; // Ensures cookies are included

// Signup Function
export const signup = async (name, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, { name, email, password });
    return res.data;
  } catch (error) {
    console.log("hello");
    return error;
  }
};

// Login Function
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (error) {
    return error;
  }
};

// Logout Function
export const logout = async () => {
  try {
    const res = await axios.get(`${API_URL}/logout`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Check Authentication
export const checkAuth = async () => {
  try {
    const res = await axios.get(`${API_URL}/me`);
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.log("error");
    return null; // User is not authenticated
  }
};

export const ScoreUpdate = async () =>{
  try{
    const res = await axios.get(`${API_URL}/score`);
    return res.data;
  }catch (error) {
    return null;
  }
}
export  const updateScore = async (userId, subject, score) => {
  try {
       const token = JSON.parse(localStorage.getItem("token"));  // Get auth token

    // Ensure userId is a proper string without extra quotes
    userId = userId.replace(/^"|"$/g, "");  // Get auth token
      console.log(userId,"hello",subject, score);
      console.log(token);
      const response = await axios.post(`${API_URL}/updatescore`, 
          { userId: userId.trim(), newScore: { subject, score } },
          { headers: { authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      return { success: true, message: response.data.message };
  } catch (error) {
    console.log(error);
      return { success: false, message: error.response};
  }
};

// export const updateScore = (subjectKey, newScore) => {
//   const storedScores = JSON.parse(localStorage.getItem("userScores")) || {};
//   storedScores[subjectKey] = newScore;
//   localStorage.setItem("userScores", JSON.stringify(storedScores));
// };

