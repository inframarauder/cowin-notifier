const { getStateId, getDistrictId, searchFreeSlots } = require("./utils/api");
const sendEmail = require("./utils/email");

//declaring constants - change according to your needs:
const STATE = "WEST BENGAL";
const DISTRICT = "KOLKATA";
const MIN_AGE = 18;
const VACCINES = ["COVAXIN"]; // possible values - ["COVISHIELD","COVAXIN","SPUTNIK-V"]

module.exports.scanAndNotify = async () => {
  try {
    const stateId = await getStateId(STATE);
    const districtId = await getDistrictId(stateId, DISTRICT);

    const availableCenters = await searchFreeSlots(
      districtId,
      MIN_AGE,
      VACCINES
    );

    console.log(`${availableCenters.length} centers available`);
    if (availableCenters.length > 0) {
      await sendEmail(availableCenters);
      return "Email Sent!";
    } else {
      return "No centers found :(";
    }
  } catch (error) {
    console.error(error);
    return { message: "Error in scanAndNotify!" };
  }
};
