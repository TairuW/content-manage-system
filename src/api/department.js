export async function AddDepartment(info){
    const res = await fetch("http://localhost:8000/department/", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(info)
    })
    const data = await res.json();
    return data;
}

export async function ListDepartment(){
    const res = await fetch("http://localhost:8000/department/", {
        method: 'GET',
    })
    const data = await res.json();
    return data;
}

export async function DeleteDepartment(id){
    const res = await fetch("http://localhost:8000/department/delete/", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(id)
    })
    const data = await res.json();
    return data;
}

export async function UpdateStatus(info){
    const res = await fetch("http://localhost:8000/department/update/status", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(info)
    })
    const data = await res.json();
    return data;
}

export async function GetDetails(info){
    const res = await fetch("http://localhost:8000/department/getdetails", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(info)
    })
    const data = await res.json();
    return data;
}

export async function UpdateDetails(info){
    const res = await fetch("http://localhost:8000/department/update/details", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(info)
    })
    const data = await res.json();
    return data;
}