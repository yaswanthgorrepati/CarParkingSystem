import { createContext } from "react";

const parkingLotContext = createContext([
  {
    id: 0,
    isOccupied: false,
    parkingType: "",
    vehicleDetails: {
      vehicleNumber: "",
      ownerName: "",
      vehicleType: "",
      inTime: "",
    },
  },
]);

export default parkingLotContext;
