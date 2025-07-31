const ParkingSpot = ({ parkingSpot }) => {
  return (
    <div
      className={`parkingSpot ${
        parkingSpot.isOccupied ? "occupied" : "notOccupied"
      }`}
    >
      {parkingSpot.parkingType}
    </div>
  );
};

export default ParkingSpot;
