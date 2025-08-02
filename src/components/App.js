import { createRoot } from "react-dom/client";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import VehicleParkingForm from "./VehicleParkingForm";
import parkingLotContext from "../utils/parkingLotContext";
import { useEffect, useState } from "react";
import { TWO_WHEELER, FOUR_WHEELER } from "../utils/constants";
import UnparkVehicle from "./UnparkVehicle";

const App = () => {
  const [parkingLotInfo, setParkingLotInfo] = useState([]);
  useEffect(() => {
    setParkingLotInfo(generateDummyData());
  }, []);

  function generateDummyData() {
    const parkingLotData = [];
    for (let i = 0; i < 10; i++) {
      parkingLotData.push({
        id: TWO_WHEELER + ":" + i,
        isOccupied: false,
        parkingType: TWO_WHEELER,
        vehicleDetails: {
          vehicleNumber: "",
          ownerName: "",
          vehicleType: "",
          inTime: "",
        },
      });
    }

    for (let i = 0; i < 10; i++) {
      parkingLotData.push({
        id: FOUR_WHEELER + ":" + i,
        isOccupied: false,
        parkingType: FOUR_WHEELER,
        vehicleDetails: {
          vehicleNumber: "",
          ownerName: "",
          vehicleType: "",
          inTime: "",
        },
      });
    }
    return parkingLotData;
  }
  return (
    <parkingLotContext.Provider value={{ parkingLotInfo, setParkingLotInfo }}>
      <div>
        <Header></Header>
        <Outlet />
        <Footer></Footer>
      </div>
    </parkingLotContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/vehicleForm",
        element: <VehicleParkingForm />,
      },
      {
        path: "/unparkVehicle",
        element: <UnparkVehicle />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);

export default App;
