import ParkingLot from "./ParkingLot";
import { TWO_WHEELER, FOUR_WHEELER } from "../utils/constants";

const Body = () => {
  return (
    <div className="body">
      <ParkingLot type={TWO_WHEELER} />
      <ParkingLot type={FOUR_WHEELER} />
    </div>
  );
};

export default Body;
