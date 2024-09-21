const DoctorCard = ({ doctor, onClick }) => (
    <div className="doctor-card" onClick= {onClick}>
      <h3>{doctor.name}</h3>
      <p>Specialty: {doctor.specialty}</p>
      <p>Location: {doctor.location}</p>
      <div className="rating">Rating: {doctor.rating} ⭐</div>
    </div>
  );

  export default DoctorCard;