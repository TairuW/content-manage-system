import cookies from 'react-cookies';

const token = "token";
const username = "username";

export function setToken(value){
    cookies.save(token, value);
}

export function getToken(){
    return cookies.load(token);
}

export function setUsername(value){
    cookies.save(username, value);
}

export function getUsername(){
    return cookies.load(username);
}