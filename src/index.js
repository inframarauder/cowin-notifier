const {
  getStateId,
  getDistrictId,
  searchFreeSlotsByDistrict,
} = require("./utils/api");

module.exports.scanAndNotify = async () => {
  try {
    const MIN_AGE = 18;
    const STATE = "WEST BENGAL";
    const DISTRICT = "PURULIA";

    const stateId = await getStateId(STATE);
    const districtId = await getDistrictId(stateId, DISTRICT);

    const availableCenters = await searchFreeSlotsByDistrict(
      districtId,
      MIN_AGE
    );
    console.log(`${availableCenters.length} centers available`);
    return availableCenters;
  } catch (error) {
    console.error(error);
    return { message: "Error in scanAndNotify!" };
  }
};
