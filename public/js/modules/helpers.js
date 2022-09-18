let helpers = {};
helpers.validateNumberInArray = (n, a) => a.includes(n);
helpers.inputToNumber = (n) => {
  let shortNumber = !n ? false : n.length > 2 ? `${n[0]}${n[1]}` : n;
  return !shortNumber ? false : n == "00" ? 0 : Number(shortNumber);
};
export default helpers;
