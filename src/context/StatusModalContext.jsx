import { createContext, useState } from "react";

export const StatusModalContext = createContext();

//usando o children para envolver todos os componentes
export const StatusModalProvider = ({ children }) => {
    const [ openModal, setOpenModal ] = useState({receita:false, despesa:false, msg:false});

    const toggleModalReceita = () => {
        setOpenModal((e) => ({
            ...e,
            receita: !openModal.receita,
        }));
    };

    const toogleModalDespesa = () => {
        setOpenModal((e) => ({
            ...e,
            despesa: !openModal.despesa,
        }));
    }
   
    const toogleModalMsg = () => {
        setOpenModal((e) => ({
            ...e,
            msg: !openModal.msg,
        }));
    }

    return (
        //passando no value os valores que serão compartilhado
        <StatusModalContext.Provider value={{openModal, toggleModalReceita, toogleModalDespesa, toogleModalMsg}}>
            {children}
        </StatusModalContext.Provider>
    )
}