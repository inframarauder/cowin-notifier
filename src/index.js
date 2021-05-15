const { getStateId, getDistrictId, searchFreeSlots } = require("./utils/api");

module.exports.scanAndNotify = async () => {
  try {
    const { STATE, DISTRICT, MIN_AGE } = process.env;

    const stateId = await getStateId(STATE);
    const districtId = await getDistrictId(stateId, DISTRICT);

    const availableCenters = await searchFreeSlots(districtId, MIN_AGE);

    console.log(`${availableCenters.length} centers available`);
    return availableCenters;
  } catch (error) {
    console.error(error);
    return { message: "Error in scanAndNotify!" };
  }
};
