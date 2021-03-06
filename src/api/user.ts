import { makeCall } from "./client";

export class UserAPI {

  /**
   * Attempts to login a user
   * @param email 
   * @param password 
   */
  public loginUser(email: string, password: string): Promise<any> {
    return makeCall("post", "users/login", {email, password});
  }

  /**
   * Refresh an access token, receiving it as an httpOnly cookie
   * @returns 
   */
  public refreshToken(): Promise<any> {
    return makeCall("post", "users/refresh", {});
  }

  /**
   * Logout a user and wipe the httpOnly cookies
   * @returns 
   */
  public logoutUser(): Promise<any> {
    return makeCall("post", "users/logout", {});
  }

  /**
   * Signup a new user
   * @param firstName 
   * @param lastName 
   * @param username
   * @param email 
   * @param password 
   * @param otherData 
   */
  public signup(firstName: string, lastName: string, username: string, email: string, password: string, otherData: any = {}): Promise<any> {
    const data = {
      ...otherData,
      firstName,
      lastName,
      username,
      email,
      password,
    }
    return makeCall("post", "users/signup", data);
  }

  /**
   * Get the profile for the currently logged in user
   */
  public getMyProfile(): Promise<any> {
    return makeCall("get", "me", {});
  }

  /**
   * Update the loggedin user's profile
   * @param firstName 
   * @param lastName 
   * @param email 
   * @param password 
   * @param username 
   */
  public updateMyProfile(firstName: string, lastName: string, email: string, password: string, username: string): Promise<any> {
    const updateData = {
      firstName,
      lastName,
      email,
      password,
      username,
    };
    return makeCall("patch", "me", updateData);
  }

}
