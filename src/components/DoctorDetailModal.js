import React from 'react';
import '../styles/DoctorDetailModal.css'; // Optional for styling

const DoctorDetailModal = ({ doctor, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{doctor.name}</h2>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Location:</strong> {doctor.location}</p>
        <p><strong>Phone Number:</strong> {doctor.phone || 'N/A'}</p>
        <p><strong>Email:</strong> {doctor.email || 'N/A'}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DoctorDetailModal;
