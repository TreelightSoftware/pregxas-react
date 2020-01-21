import * as requests from "./requests";
import * as site from "./site";
import * as user from "./user";

export const PrayerRequestsAPI = new requests.PrayerRequestsAPI();
export const SiteAPI = new site.SiteAPI();
export const UserAPI = new user.UserAPI();