export default UpdateAppDataState = (objUpdateArray, dispatch) => {
  objUpdateArray.forEach(item => {
    dispatch({
      type: "SET-APP-DATA-STATE",
      payload: item.keyToUpdate,
      payload2: item.payload
    });
  });
};
