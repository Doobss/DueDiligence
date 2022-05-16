export default UpdateObservationState = (objUpdateArray, dispatch) => {
  objUpdateArray.forEach(item => {
    dispatch({
      type: "SET-OBSERVATION-STATE",
      payload: item.keyToUpdate,
      payload2: item.payload
    });
  });
};
