import Cookies from 'js-cookie';

export const setCookie = (name, value, options = {}) => {
    Cookies.set(name, value, {...options, secure: true, sameSite: 'strict'});
};
export const getCookie = (name) => {
    return Cookies.get(name);
};

export const deleteCookie = (name) => {
    Cookies.remove(name);
};
