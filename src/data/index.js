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
        return response;
    } catch (error) {
        console.log(error.message);
    }
}
async function sendDataDespesa(despesa){
    try {
        const token = sessionStorage.getItem("token");
        if(!token){
            return false;
        }
        const response = await fetch(`http://localhost:4000/insert_despesa`,{
            method: 'POST',
            headers: {
                "Content-Type":"Application/json",
                'x-access-token': token
        },
        body: JSON.stringify({
            "despesa":despesa
        })
        })
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

//é necessário passar o headers por causa do token 
async function getDataReceitaPMouth(year){
    try {
        const token = sessionStorage.getItem("token");
        if(!token){
            return false;
        }
        const response = await fetch(`http://localhost:4000/select_receita_month/${year}`,{
            method: 'GET',
            headers: {
                "Content-Type":"Application/json",
                "x-access-token": token
            }
        });
        const resConv =  await response.json();
        return resConv;
    } catch (error) {
        console.log(error.message);
    }
}
async function getDataDespesaPMouth(year){
    try {
        const token = sessionStorage.getItem("token");
        if(!token){
            return false;
        }
        const response = await fetch(`http://localhost:4000/select_despesa_month/${year}`,{
            method: 'GET',
            headers: {
                "Content-Type":"Application/json",
                "x-access-token": token
            }
        });
        const resConv =  await response.json();
        return resConv;
    } catch (error) {
        console.log(error.message);
    }
}
export const data = {
    sendDataReceita,
    sendDataDespesa,
    getDataReceitaPMouth,
    getDataDespesaPMouth
};