import React,{ useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Model from "./components/Model";
import Feedback from "./components/Feedback";
import Form from "./components/Form";
import FeedbackSummary from "./components/FeedbackSummary";
import NotFound from "./NotFound";
import CursorEffect from "./components/CursorEffect";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./QzComponents/Home";
import Hero from "./QzComponents/Hero";
import Quiz from "./QzComponents/Quiz";
import DashBoard from "./QzComponents/DashBoard";
import ProfilePage from "./components/ProfilePage";

const App = () => {
  const [feedbackData, setFeedbackData] = useState(null);
  return (
    <Router>
      <CursorEffect />
      <Routes>
        <Route path="/quiz" element={<Home />} />
        <Route path="/subject/:subjectKey" element={<Hero />} />
        <Route path="/quiz/:subjectKey" element={<Quiz />} />
        <Route path="/dashboard" element={<DashBoard />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} /> 
        <Route path="/profilepage" element={<ProfilePage/>} /> 

        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback-form" element={<Form setFeedbackData={setFeedbackData} />} />
        <Route path="/feedback-summary" element={<FeedbackSummary feedbackData={feedbackData} />} />
        <Route path="/ai" element={<Model name="AI" />} />
        <Route path="/c" element={<Model name="C" />} />
        <Route path="/c++" element={<Model name="C++" />} />
        <Route path="/cn" element={<Model name="ComputerNetworks" />} />
        <Route path="/coa" element={<Model name="COA" />} />
        <Route path="/datascience" element={<Model name="DataScience" />} />
        <Route path="/dbms" element={<Model name="DBMS" />} />
        <Route path="/dsa" element={<Model name="DSA" />} />
        <Route path="/java" element={<Model name="JAVA" />} />
        <Route path="/javascript" element={<Model name="JavaScript" />} />
        <Route path="/machinelearning" element={<Model name="MachineLearning" />} />
        <Route path="/neuralNetworks" element={<Model name="NeuralNetworks" />} />
        <Route path="/os" element={<Model name="OperatingSystem" />} />
        <Route path="/python" element={<Model name="PYTHON" />} />
        <Route path="/webdevelopment" element={<Model name="WebDevelopment" />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
};

export default App;
