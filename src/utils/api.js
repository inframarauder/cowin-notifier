const axios = require("axios");

/**This method accepts a stateName and returns a stateId */
exports.getStateId = (stateName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        "https://cdn-api.co-vin.in/api/v2/admin/location/states",
        {
          headers: { "User-Agent": "PostmanRuntime/7.28.0" },
        }
      );

      const match = data.states.filter(
        (state) => state.state_name.toLowerCase() === stateName.toLowerCase()
      );

      if (match.length > 0) {
        resolve(match[0].state_id);
      } else {
        reject(new Error("State Not Found!"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**This method accepts stateId and districtName and returns districtId */
exports.getDistrictId = (stateId, districtName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`,
        {
          headers: { "User-Agent": "PostmanRuntime/7.28.0" },
        }
      );
      if (data.districts.length > 0) {
        const match = data.districts.filter(
          (district) =>
            district.district_name.toLowerCase() === districtName.toLowerCase()
        );
        if (match.length > 0) {
          resolve(match[0].district_id);
        } else {
          reject(new Error("District Not Found!"));
        }
      } else {
        reject(new Error("No Districts found for this state!"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**This method returns list of vaccination centers with empty slots for the next 7 days since current date */

exports.searchFreeSlotsByDistrict = (districtId, minAge) => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = `${new Date().getDate()}-0${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`;

      const { data } = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict`,
        {
          params: { district_id: districtId, date: today },
          headers: { "User-Agent": "PostmanRuntime/7.28.0" },
        }
      );

      let availableCenters = [];

      data.centers.forEach((center) => {
        let emptySlots = [];
        center.sessions.forEach((session) => {
          const { available_capacity, min_age_limit } = session;
          if (available_capacity > 0 && min_age_limit >= minAge) {
            emptySlots.push(session);
          }
        });

        if (emptySlots.length > 0) {
          availableCenters.push({
            centerId: center.center_id,
            name: center.name,
            address: center.address,
            pincode: center.pincode,
            feeType: center.fee_type,
            emptySlots,
          });
        }
      });

      resolve(availableCenters);
    } catch (error) {
      reject(error);
    }
  });
};
