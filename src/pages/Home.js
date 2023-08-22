import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
const url = 'https://course-api.com/react-tabs-project';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    try {
      const fetchJobs = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setJobs(data);
        setIsLoading(false);
      };
      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (isLoading) {
    return (
      <section className='loading-title'>
        <h1>Loading....</h1>
      </section>
    );
  }

  const { company, dates, duties, title } = jobs[value];

  const logOutHandler = async () => {
    await signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <section className='section'>
        <div className='title'>
          <h2>Experience</h2>
          <div className='title-underline'></div>
        </div>
        <div className='jobs-center'>
          <div className='button-container'>
            {jobs.map((job, index) => {
              return (
                <button
                  key={uuidv4()}
                  className={`job-button ${index === value ? 'active-button' : null}`}
                  onClick={() => setValue(index)}
                >
                  {job.company}
                </button>
              );
            })}
          </div>
          <article className='job-info'>
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className='job-date'>{dates}</p>
            {duties.map((duty) => {
              return (
                <div className='job-description' key={uuidv4()}>
                  <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
                  <p>{duty}</p>
                </div>
              );
            })}
          </article>
        </div>
      </section>
      <div>
        <button onClick={logOutHandler} className='logout-button'>
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
