import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [hospitalData, setHospitalData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/map/all');
        if (response.ok) {
          const data = await response.json();
          setHospitalData(data);
        } else {
          console.error('Failed to fetch hospital data:', await response.json());
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='background'>
      <h2>Read and Update Table</h2>

      <table className="ui basic table">
        <thead>
          <tr>
            <th>Hospital Name</th>
            <th>Test Name</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hospitalData.map((hospital) =>
            hospital.equipmentDetails.map((equipment, index) => (
              <tr key={`${hospital._id}-${index}`}>
                <td>{index === 0 ? hospital.hospitalName : ''}</td>
                <td>{equipment.name}</td>
                <td>{equipment.availableFrom}</td>
                <td>{equipment.availableTo}</td>
                <td>{equipment.testPrice}</td>
                <td>Action</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
