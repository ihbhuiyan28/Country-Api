import { Navbar } from 'react-bootstrap';

function NavbarLayout() {
    return (
        <div className="border-bottom mb-2">
            <Navbar expand="lg">
                <Navbar.Brand>
                    <h2>Country API</h2>
                </Navbar.Brand>
            </Navbar>
        </div>
    );
}

export default NavbarLayout;
