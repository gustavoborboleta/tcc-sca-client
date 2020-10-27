import * as S from './styles'
import Link from 'next/link'
import defaultPage from '../../utils/auth/defaultPage'
import { unsetToken } from '../../utils/auth/auth'
import { Container, Nav, NavItem } from 'reactstrap'

export type LayoutProps = {
  children: React.ReactNode
  isAuthenticated: boolean
  user: string
}

const Layout = ({ children, isAuthenticated, user }: LayoutProps) => (
  <>
    <header>
      <Nav className="navbar navbar-dark bg-dark">
        <NavItem>
          <Link href="/">
            <a className="navbar-brand">SCA</a>
          </Link>
        </NavItem>
        {isAuthenticated ? (
          <>
            <NavItem className="ml-auto">
              <span style={{ color: 'white', marginRight: 30 }}>{user}</span>
            </NavItem>
            <NavItem>
              <Link href="/">
                <a className="logout" onClick={unsetToken}>
                  Logout
                </a>
              </Link>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem className="ml-auto">
              <Link href="/login">
                <a className="nav-link">Sign In</a>
              </Link>
            </NavItem>
          </>
        )}
      </Nav>
    </header>

    <Container>{children}</Container>
    <footer className="footer">
      {'Gustavo Soares dos Santos - 2020'}
      <style jsx>
        {`
          .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 10px 50px;
            background-color: #f5f5f5;
          }
          a:hover {
            cursor: pointer;
            color: yellow;
          }
        `}
      </style>
    </footer>
  </>
)

export default defaultPage(Layout)
