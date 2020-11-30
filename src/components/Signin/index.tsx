import * as S from './styles'
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { StrapiLogin } from 'utils/auth/auth'
import Heading from '../Heading'
import Button from '../Button'

const Signin = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const { setUser } = useContext(AuthContext)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    StrapiLogin(data.email, data.password)
      .then((res) => {
        setUser({
          ...res
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
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
                <Form
                  onSubmit={(e) => {
                    onSubmit(e)
                    e.stopPropagation()
                  }}
                >
                  <FormGroup>
                    <Heading color={'black'} lineLeft>
                      Email:
                    </Heading>
                    <Input
                      onChange={(e) => onChange(e)}
                      value={data.email}
                      type="email"
                      name="email"
                      required
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Heading color={'black'} lineLeft>
                      Password:
                    </Heading>
                    <Input
                      onChange={(e) => onChange(e)}
                      value={data.password}
                      type="password"
                      name="password"
                      required
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button fullWidth={true} size="medium" type="submit">
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
              border-radius: 6px;
              margin-top: 90px;
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
              color: #2196f3 !important;
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
}

export default Signin
