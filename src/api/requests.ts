import { makeCall } from "./client";

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