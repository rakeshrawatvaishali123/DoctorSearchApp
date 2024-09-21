import React, { useEffect, useState, useMemo, useCallback } from 'react';
import '../styles/DoctorListPage.css'; // Optional for styling
import DoctorCard from './DoctorCard';
import DoctorDetailModal from './DoctorDetailModal'; // Import the modal component
import Spinner from '../Spinner'; // Import spinner component
import '../styles/Error.css'; // Optional for error styling

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [selectedSpecialty, setSelectedSpecialty] = useState(''); // State for specialty filter
  const [selectedLocation, setSelectedLocation] = useState('');   // State for location filter
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State for selected doctor
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Fetch data from the static JSON file
  useEffect(() => {
    fetch('/doctors.json') // Path to your JSON file
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Memoize the filtered doctors list
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty;
      const matchesLocation = selectedLocation === '' || doctor.location.includes(selectedLocation);

      return matchesSearch && matchesSpecialty && matchesLocation;
    });
  }, [doctors, searchTerm, selectedSpecialty, selectedLocation]);

  // Extract unique specialties and locations for dropdowns
  const specialties = useMemo(() => [...new Set(doctors.map((doctor) => doctor.specialty))], [doctors]);
  const locations = useMemo(() => [...new Set(doctors.map((doctor) => doctor.location))], [doctors]);

  // Open modal and set the selected doctor
  const handleDoctorClick = useCallback((doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  }, []);

  if (loading) return <Spinner />; // Use the spinner component here

  // Error state
  if (error) return <div className="error">Error: {error}</div>;

  // Render doctors
  return (
    <div className="doctor-list-container">
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search doctors by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
  
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Specialties</option>
          {specialties.map((specialty, index) => (
            <option key={index} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
  
        {/* Location Filter */}
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Locations</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
  
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} onClick={() => handleDoctorClick(doctor)} />
        ))
      ) : (
        <div>No doctors found.</div>
      )}
  
      {/* Doctor Detail Modal */}
      {isModalOpen && (
        <DoctorDetailModal doctor={selectedDoctor} onClose={closeModal} />
      )}
    </div>
  );
};

export default DoctorListPage;
