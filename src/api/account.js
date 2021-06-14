export async function UserRegister(userinfo){
    const res = await fetch("http://localhost:8000/register/", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(userinfo)
    })
    const data = await res.json();
    return data;
}

export async function UserLogin(userinfo){
    const res = await fetch("http://localhost:8000/login/", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(userinfo)
    })
    const data = await res.json();
    console.log(data);
    return data;
}

export async function GetCode(){
    const res = await fetch("http://localhost:8000/getSms/", {
        method: 'GET',
    })
    const data = await res.json();
    return data;
}