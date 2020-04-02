import {toastr, BasicToastrOptions} from "react-redux-toastr";

/**
 * Show a success toast
 * @param message 
 * @param title 
 * @param options 
 */
export const success = (message: string, title: string = "Success!", options?: BasicToastrOptions) => {
  const proc = options ? options : {};
  return toastr.success(title, message, proc);
};

/**
 * Show an error toast
 * @param message 
 * @param title 
 * @param options 
 */
export const error = (message: string, title: string = "Uh Oh!", options?: BasicToastrOptions) => {
  const proc = options ? options : {};
  return toastr.error(title, message, proc);
};

/**
 * Show an informational toast
 * @param message 
 * @param title 
 * @param options 
 */
export const info = (message: string, title: string = "Just So You Know...", options?: BasicToastrOptions) => {
  const proc = options ? options : {};
  return toastr.info(title, message, proc);
};