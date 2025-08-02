import { useState, useContext } from "react";
import {
  FOUR_WHEELER,
  PARKING_SPOT_AVAILABLE,
  PARKING_SPOT_UNAVAILABLE,
  TWO_WHEELER,
} from "../utils/constants";
import parkingLotContext from "../utils/parkingLotContext";

const VehicleParkingForm = () => {
  const [vehicleForm, setVehicleForm] = useState({
    vehicleNumber: "",
    ownerName: "",
    vechileType: "",
  });

  const { parkingLotInfo, setParkingLotInfo } = useContext(parkingLotContext);

  const [formErrors, setFormErrors] = useState({
    vehicleNumber: false,
    ownerName: false,
    vechileType: false,
  });

  const [parkingSpotAvailableMessage, setparkingSpotAvailableMessage] =
    useState("");

  // const[hasparkingSpotFound, setParkingSpotFound]/

  const isEmptyString = (str) => {
    return !str || str.trim() === "";
  };

  const validateFormAndSetErrors = () => {
    const newErrors = {
      vehicleNumber: isEmptyString(vehicleForm.vehicleNumber),
      ownerName: isEmptyString(vehicleForm.ownerName),
      vechileType: isEmptyString(vehicleForm.vechileType),
    };

    setFormErrors(newErrors);

    return Object.values(newErrors).some((val) => val);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (parkingSpotAvailableMessage || validateFormAndSetErrors()) {
      return;
    }

    let parkingSpot = findAnEmptyParkingSpace(vehicleForm.vechileType);
    if (parkingSpot === null) {
      parkingSpotMessagebanner(PARKING_SPOT_UNAVAILABLE);
      return;
    }

    setParkingLotInfo((oldData) =>
      oldData.map((pso) => {
        if (pso.id === parkingSpot.id) {
          return {
            ...pso,
            isOccupied: true,
            vehicleDetails: {
              vehicleNumber: vehicleForm.vehicleNumber,
              ownerName: vehicleForm.ownerName,
              vehicleType: vehicleForm.vechileType,
              inTime: new Date().toISOString(),
            },
          };
        }
        return pso;
      })
    );

    parkingSpotMessagebanner(PARKING_SPOT_AVAILABLE);
  };

  const parkingSpotMessagebanner = (msg) => {
    setparkingSpotAvailableMessage(msg);
    setTimeout(() => {
      setparkingSpotAvailableMessage("");
    }, 3000);
  };

  function findAnEmptyParkingSpace(vechileType) {
    for (let parkingSpot of parkingLotInfo) {
      if (parkingSpot.parkingType === vechileType && !parkingSpot.isOccupied) {
        return parkingSpot;
      }
    }
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="vehicleParkingForm">
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Vehicle Number:
          <input
            type="text"
            value={vehicleForm.vehicleNumber}
            onChange={handleChange}
            name="vehicleNumber"
            placeholder="Enter Vehicle Number"
            className={formErrors.vehicleNumber ? "errorInput" : ""}
          />
          {formErrors.vehicleNumber && (
            <span className="errorMessage">Vehicle number is required</span>
          )}
        </label>

        <label>
          Owner Name:
          <input
            type="text"
            value={vehicleForm.ownerName}
            onChange={handleChange}
            name="ownerName"
            placeholder="Enter Owner Name"
            className={formErrors.ownerName ? "errorInput" : ""}
          />
          {formErrors.ownerName && (
            <span className="errorMessage">Owner name is required</span>
          )}
        </label>

        <label>
          Vehicle Type:
          <select
            value={vehicleForm.vechileType}
            onChange={handleChange}
            name="vechileType"
            className={formErrors.vechileType ? "errorInput" : ""}
          >
            <option value="" disabled>
              Select vehicle type
            </option>
            <option value={TWO_WHEELER}>Two Wheeler</option>
            <option value={FOUR_WHEELER}>Four Wheeler</option>
          </select>
          {formErrors.vechileType && (
            <span className="errorMessage">Vehicle type is required</span>
          )}
        </label>

        <button
          type="submit"
          className={`${parkingSpotAvailableMessage ? "disable" : "enable"}`}
        >
          Submit
        </button>
      </form>
      {parkingSpotAvailableMessage && (
        <div
          className={`parkingSpotBooked ${
            parkingSpotAvailableMessage === PARKING_SPOT_AVAILABLE
              ? "parkingSpotBookedSuccess"
              : "parkingSpotBookedFailed"
          }`}
        >
          {parkingSpotAvailableMessage}
        </div>
      )}
    </div>
  );
};

export default VehicleParkingForm;
