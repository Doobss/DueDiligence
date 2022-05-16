export default UpdateCurrentUserState = (objUpdateArray, dispatch) => {
  objUpdateArray.forEach(item => {
    dispatch({
      type: "UPDATE-CURRENT-USER",
      payload: item.keyToUpdate,
      payload2: item.payload
    });
  });
};
