const { getStateId, getDistrictId, searchFreeSlots } = require("./utils/api");
const sendEmail = require("./utils/email");

//declaring constants - change according to your needs:
const STATE = "WEST BENGAL";
const DISTRICT = "KOLKATA";
const MIN_AGE = [18, 45]; // can also be set to only [18] or only [45] as per your need
const DOSE_NO = 1; //select which dose - 1 or 2

module.exports.scanAndNotify = async () => {
  try {
    const stateId = await getStateId(STATE);
    const districtId = await getDistrictId(stateId, DISTRICT);
    const availableCenters = await searchFreeSlots(
      districtId,
      MIN_AGE,
      DOSE_NO
    );

    console.log(
      `${availableCenters.length} centers available for dose ${DOSE_NO}`
    );
    if (availableCenters.length > 0) {
      await sendEmail(availableCenters, DOSE_NO);
      return "Email Sent!";
    } else {
      return "No centers found :(";
    }
  } catch (error) {
    console.error(error);
    return { message: "Error in scanAndNotify!" };
  }
};
