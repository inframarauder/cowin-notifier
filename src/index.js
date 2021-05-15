const axios = require("axios");

module.exports.scanAndNotify = async () => {
  try {
    const DISTRICT_ID = 733;
    const DATE = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;

    const { data } = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict`,
      {
        params: { district_id: DISTRICT_ID, date: DATE },
        headers: { "User-Agent": "PostmanRuntime/7.28.0" },
      }
    );

    let availableCenters = [];

    for (const center of data.centers) {
      let availableSessions = [];
      for (const session of center.sessions) {
        if (session.available_capacity > 0) {
          availableSessions.push(session);
        }
      }

      if (availableSessions.length > 0) {
        availableCenters.push({
          name: center.name,
          address: center.address,
          pincode: center.pincode,
          feeType: center.fee_type,
          availableSessions,
        });
      }
    }

    return availableCenters;
  } catch (error) {
    console.error(error);
    return { message: "Error in scanAndNotify!" };
  }
};
