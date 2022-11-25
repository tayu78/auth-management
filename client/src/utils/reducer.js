const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    default:
      return state;
  }
};

export default reducer;
