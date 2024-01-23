import React, { useState } from 'react';

function Add() {
  const [hospitalData, setHospitalData] = useState({
    hospitalName: '',
    longitude: '',
    latitude: '',
    machines: [
      {
        machineName: '',
        availableFrom: '',
        availableTo: '',
        price: '',
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHospitalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMachineChange = (index, field, value) => {
    const updatedMachines = [...hospitalData.machines];
    updatedMachines[index][field] = value;
    setHospitalData((prevData) => ({ ...prevData, machines: updatedMachines }));
  };

  const handleAddMachine = () => {
    setHospitalData((prevData) => ({
      ...prevData,
      machines: [...prevData.machines, { machineName: '', availableFrom: '', availableTo: '', price: '' }],
    }));
  };

  const handleSubmit = async () => {
    try {
      // Ensure that each machine in equipmentDetails has the required fields
      const updatedEquipmentDetails = hospitalData.machines.map((machine) => ({
        name: machine.machineName,
        availableFrom: machine.availableFrom,
        availableTo: machine.availableTo,
        testPrice: machine.price, // Assuming this is the correct field name
      }));
  
      const response = await fetch('https://api.medtechs.xyz/api/map', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hospitalName: hospitalData.hospitalName,
          longitude: hospitalData.longitude,
          latitude: hospitalData.latitude,
          equipmentDetails: updatedEquipmentDetails,
        }),
      });
  
      if (response.ok) {
        console.log('Hospital data added successfully');
        // You can perform additional actions after successful submission
      } else {
        console.error('Failed to add hospital data:', await response.json());
      }
    } catch (error) {
      console.error('Error adding hospital data:', error.message);
    }
  };
  

  return (
    <div>
      <h1 className='heading-text'>Add Hospital Data</h1>
      <div className='add-container'>
        <div className='form-container'>
          <form className="ui form">
            <h2 className="ui dividing header">Hospital Details</h2>
            <div className="field">
              <div className="three fields">
                <div className='six wide field'>
                  <label>Hospital Name</label>
                  <div className="field">
                    <input type="text" name="hospitalName" placeholder="Hospital Name" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='five wide field'>
                  <label>Longitude</label>
                  <div className="field">
                    <input type="text" name="longitude" placeholder="Longitude" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='five wide field'>
                  <label>Latitude</label>
                  <div className="field">
                    <input type="text" name="latitude" placeholder="Latitude" onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 className="ui dividing header" style={{ marginTop: 20 }}>Machine Details</h2>
              <button type='button' className="ui labeled icon button btn-size" onClick={handleAddMachine}>
                <i className="add icon"></i>
                Add Machine
              </button>
            </div>
            {hospitalData.machines.map((machine, index) => (
              <div className="field" key={index}>
                <div className="four fields">
                  <div className='four wide field'>
                    <label>Machine Name</label>
                    <div className="field">
                      <input
                        type="text"
                        placeholder="Machine Name"
                        name={`machines[${index}].machineName`}
                        value={machine.machineName}
                        onChange={(e) => handleMachineChange(index, 'machineName', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='four wide field'>
                    <label>Available From</label>
                    <div className="field">
                      <input
                        type="text"
                        placeholder="Available From"
                        name={`machines[${index}].availableFrom`}
                        value={machine.availableFrom}
                        onChange={(e) => handleMachineChange(index, 'availableFrom', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='four wide field'>
                    <label>Available To</label>
                    <div className="field">
                      <input
                        type="text"
                        placeholder="Available To"
                        name={`machines[${index}].availableTo`}
                        value={machine.availableTo}
                        onChange={(e) => handleMachineChange(index, 'availableTo', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='four wide field'>
                    <label>Price</label>
                    <div className="field">
                      <input
                        type="text"
                        placeholder="Price"
                        name={`machines[${index}].price`}
                        value={machine.price}
                        onChange={(e) => handleMachineChange(index, 'price', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button type='button' className="ui secondary button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
