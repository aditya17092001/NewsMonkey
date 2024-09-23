import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

function App(props) {
  let apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, SetProgress] = useState(0)
  const updateProgress = (val) => {
    SetProgress(val);
  }
  const [searchQuery, setSearchQuery] = useState("");
  const handleOnSubmit = (query) => {
    setSearchQuery(query);
    console.log("from App: " + searchQuery);
  }
  return (
    <>
      <Router>
        <Navbar handleOnSubmit={handleOnSubmit} />
        <LoadingBar color='#f11946' progress={progress} />
        <Routes>
          <Route  path="/" element={<News apiKey={apiKey} searchQuery={searchQuery} updateProgress={updateProgress} country="in" category="general" pageSize={9} />}/>
          <Route  path="/business" element={<News apiKey={apiKey} searchQuery={searchQuery} updateProgress={updateProgress} key="business" country="in" category="business" pageSize={9} />} /> 
          <Route  path="/entertainment" element={<News apiKey={apiKey} searchQuery={searchQuery} updateProgress={updateProgress} key="entertainment" country="in" category="entertainment" pageSize={9} /> } />
          <Route  path="/general" element={<News apiKey={apiKey} searchQuery={searchQuery} updateProgress={updateProgress} key="general" country="in" category="general" pageSize={9} /> } />
          <Route  path="/health" element={<News apiKey={apiKey} searchQuery={searchQuery} updateProgress={updateProgress} key="health" country="in" category="health" pageSize={9} /> } />
          <Route  path="/science" element={<News apiKey={apiKey} searchQuery={searchQuery} updateProgress={updateProgress} key="science" country="in" category="science" pageSize={9} />} />
          <Route  path="/sports" element={<News apiKey={apiKey} searchQuery={searchQuery} updateProgress={updateProgress} key="sports" country="in" category="sports" pageSize={9} /> } />
          <Route  path="/technology" element={<News apiKey={apiKey} searchQuery={searchQuery} updateProgress={updateProgress} key="technology" country="in" category="technology" pageSize={9} /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// "homepage": "https://aditya17092001.github.io/LiveNewsMonkey",