import * as S from './styles'
import Head from 'next/head'
import Link from 'next/link'
import { unsetToken } from '../../utils/auth/auth'
import { Container, Nav, NavItem } from 'reactstrap'

export type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <S.Wrapper>
    <header>
      <Nav className="navbar navbar-dark bg-dark">
        <NavItem>
          <Link href="/">
            <a className="navbar-brand">Home</a>
          </Link>
        </NavItem>
        {/* {isAuthenticated ? (
          <>
            <NavItem className="ml-auto">
              <span style={{ color: 'white', marginRight: 30 }}>
                {this.props.loggedUser}
              </span>
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
              <Link href="/signin">
                <a className="nav-link">Sign In</a>
              </Link>
            </NavItem>

            <NavItem>
              <Link href="/signup">
                <a className="nav-link"> Sign Up</a>
              </Link>
            </NavItem>
          </>
        )} */}
      </Nav>
    </header>

    <Container>{children}</Container>
    <footer className="footer">
      {'Strapi footer'}
      <style jsx>
        {`
          .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 60px;
            line-height: 60px;
            background-color: #f5f5f5;
          }
          a:hover {
            cursor: pointer;
            color: yellow;
          }
        `}
      </style>
    </footer>
  </S.Wrapper>
)

export default Layout
