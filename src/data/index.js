

// REFAZER, POIS É UTILIZADO POST PARA LOGIN E LOGOUT
async function validaUsuario() {
    const response = await fetch(`http://localhost:4000/users`, {
        method: 'GET',
    })
    const resConv = await response.json();
    return resConv;
}

export const data = {
    validaUsuario
}