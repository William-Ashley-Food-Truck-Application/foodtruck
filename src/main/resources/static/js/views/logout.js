import createView from "../createView.js";

export default function logout() {
    console.log("logginout")
    return '';
}

export function logoutEvent(){
    console.log("Loggedout");
    window.localStorage.removeItem("access_token")
    window.localStorage.removeItem("refresh_token");
    createView("/")
}

