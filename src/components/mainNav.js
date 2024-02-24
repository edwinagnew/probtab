import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export class NavComp extends Component {
    render() {
        
        return (
            <div style={{position:"fixed", width:"100%", zIndex:2, marginBottom:10}}>
                <Navbar bg="primary" data-bs-theme="dark">
                    <Container>
                    <Navbar.Brand href="/">The Problematic Table</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Inspect</Nav.Link>
                        <NavDropdown title="Tutorials" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/tutorials/about">About</NavDropdown.Item>
                            <NavDropdown.Item href="/tutorials/complexity">Complexity Theory</NavDropdown.Item>
                            <NavDropdown.Item href="/tutorials/poset">Partial Orders</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Bayesian Epistemology</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/spec">Speculate</Nav.Link>
                        <Nav.Link href="/learn">Learn</Nav.Link>
                        <Nav.Link href="/code">Code</Nav.Link>
                        <Nav.Link href="/play">Play</Nav.Link>

                    </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }

}

