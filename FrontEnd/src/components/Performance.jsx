import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const Performance = () => {
  const [marks, setMarks] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await axios.get('/api/student/marks');
        setMarks(response.data);
        setChartData({
          labels: response.data.map(item => item.subject),
          datasets: [
            {
              data: response.data.map(item => item.marks),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching marks", error);
      }
    };
    fetchMarks();
  }, []);

  return (
    <div>
      <h2>My Performance</h2>
      <ul>
        {marks.map((item, index) => (
          <li key={index}>{item.subject}: {item.marks}</li>
        ))}
      </ul>
      <Pie data={chartData} />
    </div>
  );
};

export default Performance;
