import axios from "axios";

/**
 * The main method for calling the API. 
 * @param method one of get, put, patch, post, delete
 * @param endpoint the endpoint of the server to hit, such as users/login
 * @param data 
 */
export function makeCall(method: string, endpoint: string, data: any = {}, options: any = {}): Promise<any> {
  const url = makeUrl(endpoint);

  if(data && !data.count && method === "get"){
    data.count = 10000;
  }

  const meth = method.toLowerCase();
  const config: any = {
    method: meth,
    url,
    timeout: 15000,
    headers: {},
    params: {},
    data: {},
    withCredentials: true
  };

  if(options.asMultipartFile){
    const formData = new FormData();
    formData.append("file", data);
    config.data = formData;
  } else {
    if (meth === "get" || meth === "delete") {
      config.params = data;
    } else {
      config.data = data;
    }
  }

  if(options.accept){
    config.headers.Accept = options.accept;
  }

  if(options.etag){
    config.headers["If-None-Match"] = options.etag;
  }

  if(options.asDownload){
    config.responseType = "blob";
  }

  // now, if headers are set on the options, loop and save
  if(options.headers){
    const keys = Object.keys(options.headers);
    for(const key of keys){
      config.headers[key] = options.headers[key];
    }
  }

  return axios(config)
  .then((res: any) => {
    return Promise.resolve({
      code: 200,
      body: res.data
    });
  })
  .catch((err: any) => {
    const ret = {
      code: 500,
      body: err
    };

    if(err.response && err.response.status) {
      ret.code = err.response.status;
      ret.body = err.response.data;
    }

    // we need to check for expired token here
    if(ret.code === 419 || ret.body.error === "Expired"){
      // should probably trigger a logout and redirect them?
    }
    return Promise.reject(ret);
  });
}

/**
 * A helper function to generate a url
 * @param endpoint 
 */
export function makeUrl(endpoint: string): string {
  let api = process.env.REACT_APP_API || "http://localhost:3000";
  // normalize
  if(api.charAt(api.length -1) === "/"){
    api = api.substr(0, api.length - 1);
  }
  let resource = endpoint;
  if(resource.charAt(resource.length -1) === "/"){
    resource = resource.substr(0, resource.length - 1);
  }
  if(resource.charAt(0) === "/"){
    resource = resource.substr(1, resource.length);
  }
  return `${api}/${resource}`;
}