import { makeCall } from "./client";
import moment from "moment";

export interface IPrayerRequest {
  id: number;
  title: string;
  body: string;
  createdBy: number;
  privacy: "public" | "private";
  created: string;
  status: "pending" | "answered" | "not_answered" | "unknown";
  tags: any;
  prayerCount: number;
  username: string;
};

export const PrayerRequestBlank: IPrayerRequest = {
  id: 0,
  title: "",
  body: "",
  createdBy: 0,
  privacy: "public",
  created: moment().format("YYYY-MM-DDTHH:mm:SSZ"),
  status: "pending",
  tags: [],
  prayerCount: 0,
  username: "",
};

export class PrayerRequestsAPI {

  /**
   * Get the global prayer list
   */
  public getGlobalList(count: number = 10, offset: number = 0): Promise<any> {
    return makeCall("get", "requests", {
      count,
      offset,
    });
  }

  /**
   * Get the list of requests for a single community, defaulting to loading the first 10
   * @param communityId 
   * @param count 
   * @param offset 
   */
  public getListForCommunity(communityId: number, count: number = 10, offset: number = 0): Promise<any> {
    return makeCall("get", `communities/${communityId}/requests`, {
      count,
      offset,
    });
  }

  /**
   * Create a new prayer request
   * @param title 
   * @param body 
   * @param privacy 
   * @param otherData 
   */
  public createPrayerRequest(title: string, body: string, privacy: string, otherData: object = {}): Promise<any> {
    const data = {
      ...otherData,
      title,
      body,
      privacy
    };
    return makeCall("post", "requests", data);
  }

  /**
   * Report a prayer request for a violation and follow-up
   * @param requestId 
   * @param reason 
   * @param reasonText 
   * @param otherData 
   */
  public reportPrayerRequest(requestId: number, reason: string, reasonText: string,  otherData: object = {}): Promise<any> {
    const data = {
      ...otherData,
      reason,
      reasonText,
    };
    return makeCall("post", `requests/${requestId}/reports`, data);
  }
}