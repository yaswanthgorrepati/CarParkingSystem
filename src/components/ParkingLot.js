import ParkingSpot from "./ParkingSpot";
import { useContext } from "react";
import parkingLotContext from "../utils/parkingLotContext";

const ParkingLot = ({ type }) => {
  const { parkingLotInfo, setParkingLotInfo } = useContext(parkingLotContext);

  // console.log(parkingLot);

  return (
    <div className="parkingLot">
      {parkingLotInfo.map((parkingSpot) => {
        if (parkingSpot.parkingType === type) {
          return <ParkingSpot key={parkingSpot.id} parkingSpot={parkingSpot} />;
        }
      })}
    </div>
  );
};

export default ParkingLot;
