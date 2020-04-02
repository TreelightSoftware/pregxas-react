import { makeCall } from "./client";
import moment from "moment";

export interface ICommunity {
  id: number;
  name: string;
  created: moment.Moment;
  description: string;
  privacy: string;
  shortCode: string;
  userSignupStatus: string;
  plan: string;
  planPaidThrough: moment.Moment;
  userStatus: string;
  userRole: string;
  memberCount: number;
  requestCount: number;
}

export class CommunitiesAPI {

  /**
   * Get a list of communities that are public
   * @param sortField
   * @param sortDir
   * @param count 
   * @param offset 
   */
  public getPublicCommunities(sortField: "name" | "created" = "name", sortDir: "asc" | "desc" = "asc", count: number = 10, offset: number = 0): Promise<any> {
    return makeCall("get", "communities/public", {
      sortField,
      sortDir,
      count,
      offset,
    });
  }

  /**
   * Get the user's communities. These are sorted alphabetically.
   * @param count 
   * @param offset 
   */
  public getMyCommunities(): Promise<any> {
    return makeCall("get", "communities");
  }

  /**
   * Create a new communitiy
   * @param name 
   * @param description 
   * @param privacy 
   * @param shortCode 
   * @param userSignupStatus 
   * @param otherData 
   */
  public createCommunity(name: string, description: string, privacy: string = "private", shortCode: string = "", userSignupStatus: string = "approval_required", otherData: any = {}): Promise<any> {
    const data = {
      ...otherData,
      name,
      description,
      privacy,
      shortCode,
      userSignupStatus
    }
    return makeCall("post", "communities/", data);
  }

  /**
   * Update a single community
   * @param communityId 
   * @param data 
   */
  public updateCommunity(communityId: number, data: any = {}): Promise<any> {
    return makeCall("post", `communities/${communityId}`, data);
  }

  /**
   * Delete a single community
   * @param communityId 
   */
  public deleteCommunity(communityId: number): Promise<any> {
    return makeCall("delete", `communities/${communityId}`);
  }

  /**
   * Get a single community
   * @param communityId 
   */
  public getCommunity(communityId: number): Promise<any> {
    return makeCall("get", `communities/${communityId}`);
  }
}