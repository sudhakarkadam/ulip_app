import { UserDataModel } from "src/models/CommonModel";

export const LoginResponse: UserDataModel = {
  user_details: {
    user_id: 1,
    name: "Tanya Singh",
    phone_number: "9876543210"
  },
  business_details: {
    business_id: 2,
    business_name: "India Cements",
    location_details: {
      address: "Embassy Tech Village, Kadubesanahalli",
      city: "Bangalore",
      location_code: "BAN",
      map_ref: "test",
      name: "Embassy Tech Village",
      postal_code: "560103",
      state: "Karnataka"
    },
    reg_info: {
      registration_number: "test"
    },
    role: "SHIPPER",
    user_id: 4
  }
};
