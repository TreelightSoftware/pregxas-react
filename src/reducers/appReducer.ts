import { createAction, createReducer } from "redux-act";

export const toggleHelp: any = createAction("app - toggle help");
export const toggleContact: any = createAction("app - toggle contact");
export const toggleMenu: any = createAction("app - toggle menu");
export const setMenu: any = createAction("app - set menu");
export const setSiteInfo: any = createAction("app - set site info");

const defaultSiteInfo = {
  name: "Pregxas",
  description: "The prayerful community",
  status: "pending_setup",
  logoLocation: "/"
};

export default createReducer({
    [toggleHelp]: (state) => {
      const show = !state.showHelp;
      return {
        ...state, 
        showHelp: show
      };
    },
    [toggleContact]: (state) => {
      const show = !state.showContact;
      return {
        ...state, 
        showContact: show
      };
    },
    [toggleMenu]: (state) => {
      const show = !state.showMenu;
      return {
        ...state, 
        showMenu: show
      };
    },
    [setMenu]: (state, menuOpen: boolean) => {
      const show = menuOpen;
      return {
        ...state, 
        showMenu: show
      };
    },
    [setSiteInfo]: (state, siteInfo: any) => {
      return {
        ...state, 
        siteInfo,
      };
    },
  }, {
    showHelp: false,
    showMenu: false,
    showContact: false,
    siteInfo: defaultSiteInfo,
});