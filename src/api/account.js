export async function UserRegister(userinfo){
    const res = await fetch("http://localhost:8000/post/", {
        method: 'POST',
        body: JSON.stringify(userinfo)
    })
    const data = await res.json();
    console.log(data);
    console.log(JSON.stringify(userinfo));
}

export async function UserLogin(userinfo){
    const res = await fetch(process.env.REACT_APP_LOGIN_API, {
        method: 'POST',
        body: JSON.stringify(userinfo)
    })
    const data = await res.json();
    console.log(data);
    console.log(JSON.stringify(userinfo));
}

export async function GetCode(userinfo){
    const res = await fetch(process.env.REACT_APP_LOGIN_API, {
        method: 'POST',
        body: JSON.stringify(userinfo)
    })
    const data = await res.json();
    console.log(data);
    console.log(JSON.stringify(userinfo));
}