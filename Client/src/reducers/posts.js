export default (mov = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...mov, action.payload];
    default:
      return mov;
  }
};
