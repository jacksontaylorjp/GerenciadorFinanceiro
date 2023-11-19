async function sendDataReceita(receita) {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return false;
        }
        const response = await fetch(`http://localhost:4000/insert_receita`, {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
                'x-access-token': token
            },
            body: JSON.stringify({
                "receita": receita
            })
        })
        return response;
    } catch (error) {
        console.error(error.message);
    }
}
async function sendDataDespesa(despesa) {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return false;
        }
        const response = await fetch(`http://localhost:4000/insert_despesa`, {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
                'x-access-token': token
            },
            body: JSON.stringify({
                "despesa": despesa
            })
        })
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

//é necessário passar o headers por causa do token 
async function getDataReceitaPMouth(year) {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return false;
        }
        const response = await fetch(`http://localhost:4000/select_receita_month/${year}`, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json",
                "x-access-token": token
            }
        });
        const resConv = await response.json();
        return resConv;
    } catch (error) {
        console.error(error.message);
    }
}
async function getDataDespesaPMouth(year) {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return false;
        }
        const response = await fetch(`http://localhost:4000/select_despesa_month/${year}`, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json",
                "x-access-token": token
            }
        });
        const resConv = await response.json();
        return resConv;
    } catch (error) {
        console.error(error.message);
    }
}

async function getDataReceita() {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return false;
        }
        const response = await fetch(`http://localhost:4000/select_receita`, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json",
                "x-access-token": token
            }
        });
        const resConv = await response.json();
        return resConv;
    } catch (error) {
        console.error(error.message);
    }
}
async function getDataDespesa() {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return false;
        }
        const response = await fetch(`http://localhost:4000/select_despesa`, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json",
                "x-access-token": token
            }
        });
        const resConv = await response.json();
        return resConv;
    } catch (error) {
        console.error(error.message);
    }
}

async function delete_receita(id) {
    try {
        const token = sessionStorage.getItem("token")
        if (!token) {
            return false;
        }
        const response = await fetch(`http://localhost:4000/delete_receita/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                "x-access-token": token
            }
        })
        if(!response.ok){
            throw new Error("Não foi possível deletar a receita.");
        }
        const resConv = await response.json();
        return resConv;
    }catch (error) {
        console.error(error.message);
    }
}
async function delete_despesa(id) {
    try {
        const token = sessionStorage.getItem("token")
        if (!token) {
            return false;
        }
        const response = await fetch(`http://localhost:4000/delete_despesa/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                "x-access-token": token
            }
        })
        if(!response.ok){
            throw new Error("Não foi possível deletar a despesa.");
        }
        const resConv = await response.json();
        return resConv;
    }catch (error) {
        console.error(error.message);
    }
}
export const data = {
    sendDataReceita,
    sendDataDespesa,
    getDataReceita,
    getDataDespesa,
    getDataReceitaPMouth,
    getDataDespesaPMouth,
    delete_receita,
    delete_despesa
};