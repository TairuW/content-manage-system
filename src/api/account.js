import service from '../utils/request';

export function UserLogin(data){
    return service.request({
        url: '/login/',
        method: 'POST',
        data,
    })
}

export function UserRegister(data){
    return service.request({
        url: '/register/',
        method: 'POST',
        data,
    })
}

export function GetCode(data){
    return service.request({
        url: '/getSms/',
        method: 'POST',
        data,
    })
}