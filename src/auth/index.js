

async function validaUsuario(user, password) {
    const response = await fetch(`http://localhost:4000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": `${user}`,
            "password": `${password}`,
        })
    })
    const resConv = await response.json();
    if (response.status === 200 && resConv.auth === true) {
        console.log("ok")
        sessionStorage.setItem("token", resConv.token);
        window.location.href = "http://localhost:3000/dashboard";
        return;
    }
    console.log(resConv);
    alert(resConv.error)
    return resConv;
}

async function check() {
    const token = sessionStorage.getItem("token");
    if (!token) {
        return false;
    }
    const response = await fetch(`http://localhost:4000/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
    return response.status === 200
}



export const auth = {
    validaUsuario,
    check
}