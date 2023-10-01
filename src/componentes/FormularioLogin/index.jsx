import { Button, TextField } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string('Informe um email')
        .email('Informe um email valido')
        .required('Email obrigatório'),
    senha: yup
        .string('Informe uma senha')
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .required('Senha obrigatória'),
});
const FormularioLogin = () => {
    //usando o formik para tratar as validações do formulário
    const formik = useFormik({
        initialValues: {
            email: '',
            senha: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            console.log(JSON.stringify(values, null, 2));
        },
    });

    // async function validaUsuario(id){
    //     const response = await fetch(`http://localhost:4000/users/${id}`,{
    //         method: 'GET',
    //     })
    //     const data = await response.json();
    //     console.log(data);
    // }

    return (
        <form onSubmit={event => {
            event.preventDefault();
            formik.handleSubmit();

            // validaUsuario(1);
        }}
        >
            <TextField
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                id="senha"
                label="Senha"
                variant="outlined"
                margin="normal"
                type="password"
                fullWidth
                value={formik.values.senha}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.senha && Boolean(formik.errors.senha)}
                helperText={formik.touched.senha && formik.errors.senha}
            />
            <Button
                fullWidth
                variant="contained"
                type="submit"
            >
                Entrar
            </Button>
        </form>
    );
}


export default FormularioLogin;