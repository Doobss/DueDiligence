export default UpdateResearchState = (objUpdateArray, dispatch) => {
  objUpdateArray.forEach(item => {
    dispatch({
      type: "SET-RESEARCH-STATE",
      payload: item.keyToUpdate,
      payload2: item.payload
    });
  });
};
