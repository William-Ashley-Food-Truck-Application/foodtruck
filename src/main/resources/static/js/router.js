import Home from "./views/Home.js";
import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login from "./views/Login.js";
import LoginEvent from "./auth.js";
import Register from "./views/Register.js"
import {RegisterEvent} from "./views/Register.js";
import Profile, {UserEvents} from "./views/UserIndex.js";
import logout, {logoutEvent} from "./views/logout.js";
import Admin, {AdminEvents} from "./views/AdminIndex.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {
                products: '/api/products',
            },
            uri: '/',
            title: 'Home',
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        '/logout': {
            returnView: logout,
            state: {},
            uri: '/logout',
            title: "Logout",
            viewEvent: logoutEvent
        },
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        },

        '/about': {
            returnView: About,
            state: {},
            uri: '/about',
            title: 'About',
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        },
        '/profile': {
            returnView: Profile,
            state: {
                users: '/api/users/me'//<--- eventually the username here can be dynamic
                // posts: '/api/posts' //<-- can pass an endpoint that finds posts for just the specific user above
            },
            uri: '/profile',
            title: 'Profile',
            viewEvent: UserEvents
        },
        '/admin': {
            returnView: Admin,
            state: {

            },
            uri: '/admin',
            title: 'Admin',
            viewEvent: AdminEvents
        }

    };

    return routes[URI];
}

