import { makeCall } from "./client";

export class SiteAPI {

  /**
   * Get the current state of the site; will require setup if not setup prior
   */
  public getSiteInfo(): Promise<any> {
    return makeCall("get", "admin/site", {});
  }

  /**
   * Sets up a new site. The secret key will come from the terminal when the server is setup.
   * 
   * @param firstName 
   * @param lastName 
   * @param email 
   * @param username 
   * @param password 
   * @param siteName 
   * @param siteDescription 
   * @param secretKey 
   */
  public setupSite(firstName: string, lastName: string, email: string, username: string, password: string, siteName: string, siteDescription: string, secretKey: string){
    const data = {
      firstName,
      lastName,
      email,
      password,
      username,
      name: siteName,
      description: siteDescription,
      secretKey,
    };
    return makeCall("post", "admin/site", data, {
      headers: {
        "X-API-SECRET": secretKey,
      }
    });
  }

  /**
   * Updates the settings for a site. Since some or all of the data can be sent in, the input is pretty generic.
   * @param updateData 
   */
  public updateSiteInfo(updateData: any = {}): Promise<any> {
    return makeCall("patch", "admin/site", updateData);
  }

}