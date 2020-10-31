import * as S from './styles'
import Link from 'next/link'
import { UnsetToken } from '../../utils/auth/auth'
import {
  Container,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import SecurePage from '../../utils/auth/SecurePage'

export type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { user, isAuthenticated } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  return (
    <>
      <header>
        <Navbar
          className="navbar navbar-dark bg-dark"
          color="dark"
          light
          expand="md"
        >
          <NavbarBrand href="/monitorings">
            <h2>SCA</h2>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            {isAuthenticated ? (
              <>
                <Nav className="mr-auto" navbar>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Inventory
                    </DropdownToggle>
                    <DropdownMenu right className="navbar-dark bg-dark">
                      <DropdownItem>
                        <Link href="/tools">Tools</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/maintenances">Maintenances</Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Process
                    </DropdownToggle>
                    <DropdownMenu right className="navbar-dark bg-dark">
                      <DropdownItem>
                        <Link href="/activities">Activities</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/occurrences">Occurrences</Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem>
                    <NavLink href="/monitorings/">Monitorings</NavLink>
                  </NavItem>
                </Nav>
                <NavbarText>
                  <Link href="/">
                    <a className="logout" onClick={() => UnsetToken()}>
                      Logout
                    </a>
                  </Link>
                </NavbarText>
              </>
            ) : null}
          </Collapse>
        </Navbar>
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
