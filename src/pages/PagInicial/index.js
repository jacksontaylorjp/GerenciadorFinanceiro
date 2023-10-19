import style from './PagInicial.module.css'
import { Button, Col, Row, Typography } from "antd";

const PagInicial = () => {
    function login() {
        window.location.href = "http://localhost:3000/login";
    }
    const { Title } = Typography;
    return (
        <div className={style.divPagInicial}>
            <Row justify="center">
                <Col>
                    <Title level={2}>Bem-vindo</Title>
                </Col>
            </Row>
            <Row justify="center" gutter={48}>
                <Col>
                    <Button type="primary" shape="round" size='large' onClick={() => login()}>
                        Entrar
                    </Button>
                </Col>
                <Col>
                    <Button type="primary" shape="round" size='large' disabled>
                        Cadastre-se
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default PagInicial;