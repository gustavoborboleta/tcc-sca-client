import * as S from './styles'
import Link from 'next/link'
import { UnsetToken } from '../../utils/auth/auth'
import { Container, Nav, NavItem } from 'reactstrap'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import SecurePage from '../../utils/auth/SecurePage'

export type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { user, isAuthenticated } = useContext(AuthContext)
  return (
    <>
      <header>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">SCA</a>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/tools">
                  <a className="navbar-brand">Tools</a>
                </Link>
                <Link href="/maintenances">
                  <a className="navbar-brand">Maintenances</a>
                </Link>
                <Link href="/activities">
                  <a className="navbar-brand">Activities</a>
                </Link>
                <Link href="/occurrences">
                  <a className="navbar-brand">Occurrences</a>
                </Link>
                <Link href="/monitorings">
                  <a className="navbar-brand">Monitorings</a>
                </Link>
              </>
            ) : null}
          </NavItem>
          {isAuthenticated ? (
            <>
              <NavItem className="ml-auto">
                <span style={{ color: 'white', marginRight: 30 }}>
                  {user.username}
                </span>
              </NavItem>
              <NavItem>
                <Link href="/">
                  <a className="logout" onClick={() => UnsetToken()}>
                    Logout
                  </a>
                </Link>
              </NavItem>
            </>
          ) : null}
        </Nav>
      </header>

      <Container className="overflow-auto">
        <SecurePage>{children}</SecurePage>
      </Container>
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
          `}
        </style>
      </footer>
    </>
  )
}

export default Layout
