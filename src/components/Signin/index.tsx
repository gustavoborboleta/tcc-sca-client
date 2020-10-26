import * as S from './styles'
import defaultPage from '../../utils/auth/defaultPage'
import { strapiSignin } from '../../utils/auth/auth'
import Router from 'next/router'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import Cookies from 'js-cookie'

const Signin = () => (
  <S.Wrapper>
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header d-flex justify-content-center">
              <img
                className=""
                src="https://www.pucminas.br/pos/letras/noticias/PublishingImages/Paginas/COMUNICADO/Brasao%20PUC%20Minas%20aplicacao_cinza.png"
              />
            </div>
            <section className="wrapper">
              {/* <div className="notification">{error}</div> */}
              <Form>
                <FormGroup>
                  <Label>Email:</Label>
                  <Input
                    type="email"
                    name="email"
                    style={{ height: 50, fontSize: '1.2em' }}
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: 30 }}>
                  <Label>Password:</Label>
                  <Input
                    type="password"
                    name="password"
                    style={{ height: 50, fontSize: '1.2em' }}
                  />
                </FormGroup>

                <FormGroup>
                  {/* <span>
                    <a href="">
                      <small>Forgot Password?</small>
                    </a>
                  </span> */}
                  <Button
                    style={{ float: 'right', width: 120 }}
                    color="primary"
                  >
                    Submit
                  </Button>
                </FormGroup>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            height: 440px;
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            object-fit: contain;
            margin: 10px;
            max-width: 100%;
          }
        `}
      </style>
    </Container>
  </S.Wrapper>
)

export default defaultPage(Signin)
