const axios = require("axios");

/**This method accepts a stateName and returns a stateId */
exports.getStateId = (stateName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        "https://cdn-api.co-vin.in/api/v2/admin/location/states",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
          },
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
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
          },
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

exports.searchFreeSlots = (districtId, minAge, doseNo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = `${new Date().getDate()}-0${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`;

      const { data } = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict`,
        {
          params: { district_id: districtId, date: today },
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
          },
        }
      );

      let availableCenters = [];

      data.centers.forEach((center) => {
        let emptySlots = [];
        center.sessions.forEach((session) => {
          if (minAge.includes(session.min_age_limit)) {
            const key = `available_capacity_dose${doseNo}`;

            if (session[key] && session[key] > 0) {
              emptySlots.push(session);
            }
          }
        });

        if (emptySlots.length > 0) {
          availableCenters.push({
            centerId: center.center_id,
            name: center.name,
            address: center.address,
            district: center.district_name,
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
