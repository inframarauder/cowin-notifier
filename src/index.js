const { getStateId, getDistrictId, searchFreeSlots } = require("./utils/api");
const sendEmail = require("./utils/email");

module.exports.scanAndNotify = async () => {
  try {
    const { STATE, DISTRICT, MIN_AGE } = process.env;

    const stateId = await getStateId(STATE);
    const districtId = await getDistrictId(stateId, DISTRICT);

    const availableCenters = await searchFreeSlots(districtId, MIN_AGE);

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
