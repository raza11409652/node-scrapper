// const { default: axios } = require("axios");
const axios = require("axios");
const websiteRequestCall = async (a) => {
  if (typeof a !== "string") throw new Error("Invalid request");
  // a should also we a valid URL
  const { data } = await axios.get(a);
  //   console.log(data);
  return typeof data === "string" ? data : "";
};
module.exports = websiteRequestCall;
