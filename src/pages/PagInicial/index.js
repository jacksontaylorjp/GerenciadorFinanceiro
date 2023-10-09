const PagInicial = () => {
    function login() {
        window.location.href = "http://localhost:3000/login";
    }
    return (
        <>
            <h1>Página Inicial</h1>
            <button onClick={() => login()}>Login</button>
        </>
    );
};

export default PagInicial;