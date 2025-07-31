# dependencies
  npm install react
  npm install react-dom
  npm install -D parcel
  npm install react-router-dom

# Learnings
1. modifying the context object directly and then calling the usestate and got the corrupt data.

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

  earlier with out spread object is modified direclty.