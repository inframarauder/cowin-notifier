const { getStateId, getDistrictId, searchFreeSlots } = require("./utils/api");
const sendEmail = require("./utils/email");

//declaring constants - change according to your needs:
const STATE = "WEST BENGAL"; // spelling should be correct
const DISTRICT = "KOLKATA"; // full name of the district (as mentioned in the dropdown menu of CoWin website)
const MIN_AGE = [18, 45]; // can also be set to only [18] or only [45] as per your need
const VACCINES = ["COVAXIN", "SPUTNIK-V"]; // include or remove whichever vaccine you want from the array - based on vaccines available on CoWin.
const DOSE_NO = 1; //select which dose - 1 or 2

module.exports.scanAndNotify = async () => {
  try {
    const stateId = await getStateId(STATE);
    const districtId = await getDistrictId(stateId, DISTRICT);

    const searchParams = { districtId, MIN_AGE, VACCINES, DOSE_NO };
    const availableCenters = await searchFreeSlots(searchParams);

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
