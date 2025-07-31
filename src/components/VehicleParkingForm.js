import { useState, useContext } from "react";
import { FOUR_WHEELER, TWO_WHEELER } from "../utils/constants";
import parkingLotContext from "../utils/parkingLotContext";

const VehicleParkingForm = () => {
  const [vehicleForm, setVehicleForm] = useState({
    vehicleNumber: "",
    ownerName: "",
    vechileType: "",
  });

  const { parkingLotInfo, setParkingLotInfo } = useContext(parkingLotContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vehicleForm);
    let parkingSpot = findAnEmptyParkingSpace(vehicleForm.vechileType);
    if (parkingSpot === null) {
      alert("no empty parking spot is found");
    } else {
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
    }
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
          />
        </label>

        <label>
          Owner Name:
          <input
            type="text"
            value={vehicleForm.ownerName}
            onChange={handleChange}
            name="ownerName"
            placeholder="Enter Owner Name"
          />
        </label>

        <label>
          Vehicle Type:
          <select
            value={vehicleForm.vechileType}
            onChange={handleChange}
            name="vechileType"
          >
            <option value="" disabled>
              Select vehicle type
            </option>
            <option value={TWO_WHEELER}>Two Wheeler</option>
            <option value={FOUR_WHEELER}>Four Wheeler</option>
          </select>
        </label>

        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default VehicleParkingForm;
