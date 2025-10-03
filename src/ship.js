const Ship = (() => {
  const getShipLength = () => {
    return 3;
  };
  const ship = {
    length: 3,
  };
  return { ship, getShipLength };
})();

export default Ship;
