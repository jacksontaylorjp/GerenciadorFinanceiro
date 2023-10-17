async function sendDataReceita(receita){
    try {
        const token = sessionStorage.getItem("token");
        if(!token){
            return false;
        }
        const response = await fetch(`http://localhost:4000/insert_receita`,{
            method: 'POST',
            headers: {
                "Content-Type":"Application/json",
                'x-access-token': token
        },
        body: JSON.stringify({
            "receita":receita
        })
        })
        console.log(response)
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

export const data = {
    sendDataReceita
};