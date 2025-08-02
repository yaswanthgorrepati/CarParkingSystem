import React, { useContext, useState } from "react";
import parkingLotContext from "../utils/parkingLotContext";

const UnparkVehicle = () => {
  const [searchVehcileNumber, setSearchVehcileNumber] = useState("");
  const [vehicleInfo, setvehicleInfo] = useState({
    vehicleNumber: "",
    ownerName: "",
    vehicleType: "",
    inTime: "",
  });

  const { parkingLotInfo, setParkingLotInfo } = useContext(parkingLotContext);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = () => {
    for (let ps of parkingLotInfo) {
      if (ps.vehicleDetails.vehicleNumber === searchVehcileNumber) {
        setvehicleInfo({ ...ps.vehicleDetails });
        break;
      }
    }
  };

  const handlePaymentButton = () => {
    if (!vehicleInfo.vehicleNumber) return;

    if (successMessage) return;

    setParkingLotInfo((pLInfo) => {
      return pLInfo.map((ps) => {
        if (
          ps.isOccupied === true &&
          ps.vehicleDetails.vehicleNumber === vehicleInfo.vehicleNumber
        ) {
          return {
            ...ps,
            isOccupied: false,
            vehicleDetails: {
              vehicleNumber: "",
              ownerName: "",
              vehicleType: "",
              inTime: "",
            },
          };
        }
        return ps;
      });
    });
    setSuccessMessage("✅ Payment completed successfully!");

    setSearchVehcileNumber("");
    setvehicleInfo({
      vehicleNumber: "",
      ownerName: "",
      vehicleType: "",
      inTime: "",
    });
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleCancel = () => {
    setSearchVehcileNumber("");
    setvehicleInfo({
      vehicleNumber: "",
      ownerName: "",
      vehicleType: "",
      inTime: "",
    });
  };
  return (
    <div className="vehicleContainer">
      {/* show the searrch bar */}

      <form
        className="searchForm"
        onSubmit={(e) => {
          e.preventDefault(); // prevents page reload
          handleSubmit();
        }}
      >
        <input
          type="text"
          className="searchText"
          placeholder="Search vehicle number here..."
          value={searchVehcileNumber}
          onChange={(e) => setSearchVehcileNumber(e.target.value)}
        />
        <button className="searchButton" onClick={handleSubmit}>
          Search
        </button>
      </form>

      {vehicleInfo && (
        <div className="vehicleInfo">
          <span>Vehicle Number : {vehicleInfo.vehicleNumber}</span>
          <span>Owner Name : {vehicleInfo.ownerName}</span>
          <span>Vehicle Type : {vehicleInfo.vehicleType}</span>
          <span>In Time : {vehicleInfo.inTime}</span>
          <div className="buttonGroup">
            <button
              className={`paymentButton ${
                successMessage ? "disable" : "enable"
              }`}
              onClick={handlePaymentButton}
            >
              Payment Completed
            </button>
            <button
              className={`cancelButton ${
                successMessage ? "disable" : "enable"
              }`}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {successMessage && <div className="successMessage">{successMessage}</div>}
    </div>
  );
};

export default UnparkVehicle;
