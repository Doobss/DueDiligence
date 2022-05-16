import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default GetUserLocation = async props => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== "granted") {
    console.log("denied");
    return;
  }
  let userLocation = await Location.getCurrentPositionAsync({});
  let locationData = await Location.reverseGeocodeAsync(userLocation.coords);
  let locDataObj = locationData[0];
  let userAddress = locDataObj.city + ", " + locDataObj.region;
  //console.log(userAddress);
  return userAddress;
};
