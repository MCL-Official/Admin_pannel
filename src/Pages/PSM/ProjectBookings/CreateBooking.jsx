import React, { useState } from 'react';
import TopHeader from '../../../UI/TopHeader/TopHeader';
import axios from 'axios';

const CreateBooking = () => {
  const head = 'Create A Booking';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
    notes: '',
    zipCode: '94536', // default value
    instructions: '',
    passportDetails: '',
    foundVia: 'Google search', // default value
  });

  const [invalidFields, setInvalidFields] = useState({});
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const newInvalidFields = {};
    if (!formData.firstName) newInvalidFields.firstName = true;
    if (!formData.lastName) newInvalidFields.lastName = true;
    if (!formData.email) newInvalidFields.email = true;
    if (!formData.phone) newInvalidFields.phone = true;
    if (!formData.date) newInvalidFields.date = true;
    if (!formData.time) newInvalidFields.time = true;

    if (Object.keys(newInvalidFields).length > 0) {
      setInvalidFields(newInvalidFields);
      setNotification('Please fill in all required fields.');
      return;
    }

    // Send booking details to the backend
    try {
      await axios.post('https://backend.mycaretrading.com/admin/appointments', formData);
      setNotification('Appointment booked successfully!');
      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        reason: '',
        notes: '',
        zipCode: '',
        instructions: '',
        passportDetails: '',
        foundVia: '',
      });
      setInvalidFields({});
    } catch (error) {
      console.error('Error booking appointment', error);
      setNotification('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className="ml-80 mb-10 w-[100vh] relative" style={{ marginTop: '110px' }}>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-screen-md mx-auto">
          {/* <h2 className="text-2xl font-bold mb-6 text-center">{head}</h2> */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`border p-2 rounded ${invalidFields.firstName ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`border p-2 rounded ${invalidFields.lastName ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`border p-2 rounded ${invalidFields.email ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`border p-2 rounded ${invalidFields.phone ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Appointment Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`border p-2 rounded ${invalidFields.date ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Appointment Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`border p-2 rounded ${invalidFields.time ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label>Instructions</label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                ></textarea>
              </div>
              <div className="flex flex-col md:col-span-2">
                <label>Passport Details</label>
                <textarea
                  name="passportDetails"
                  value={formData.passportDetails}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label>Found Via</label>
                <input
                  type="text"
                  name="foundVia"
                  value={formData.foundVia}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label>Reason for Appointment</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                ></textarea>
              </div>
              <div className="flex flex-col md:col-span-2">
                <label>Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded mt-4 transition-transform transform hover:scale-105"
            >
              Book Appointment
            </button>
          </form>
          {notification && (
            <div className="mt-4 text-center text-red-500">{notification}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
