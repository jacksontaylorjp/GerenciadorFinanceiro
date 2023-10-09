import { Button, TextField } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { data } from '../../data';
import { useState } from "react";

// const validationSchema = yup.object({
//     email: yup
//         .string('Informe um email')
//         .email('Informe um email valido')
//         .required('Email obrigatório'),
//     senha: yup
//         .string('Informe uma senha')
//         .min(8, 'A senha deve ter no mínimo 8 caracteres')
//         .required('Senha obrigatória'),
// });
const FormularioLogin = () => {
    // //usando o formik para tratar as validações do formulário
    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         senha: '',
    //     },
    //     validationSchema: validationSchema,
    //     onSubmit: (values) => {
    //         // alert(JSON.stringify(values, null, 2));
    //         console.log(JSON.stringify(values, null, 2));
    //     },
    // });

    async function buscaDataUser() {
        const listaUsuarios = await data.validaUsuario();
        listaUsuarios.forEach(usuario => {
            if (email === usuario._email && senha === usuario._password) {
                window.location.href = "http://localhost:3000/"
            }
        });
    }

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <form onSubmit={event => {
            event.preventDefault();
            // formik.handleSubmit();
        }}
        >
            <TextField
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                fullWidth
                value={email}
                onChange={event => setEmail(event.target.value)}
            // value={formik.values.email}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // error={formik.touched.email && Boolean(formik.errors.email)}
            // helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                id="senha"
                label="Senha"
                variant="outlined"
                margin="normal"
                type="password"
                fullWidth
                value={senha}
                onChange={event => setSenha(event.target.value)}
            // value={formik.values.senha}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // error={formik.touched.senha && Boolean(formik.errors.senha)}
            // helperText={formik.touched.senha && formik.errors.senha}
            />
            <Button
                fullWidth
                variant="contained"
                type="submit"
                onClick={buscaDataUser}
            >
                Entrar
            </Button>
        </form>
    );
}


export default FormularioLogin;