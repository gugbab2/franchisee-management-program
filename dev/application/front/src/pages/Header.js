import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function Header() {
    return (
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">비즈플레이&비플페이</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>로그인정보</Navbar.Text>
            <Navbar.Text>/</Navbar.Text>
            <Navbar.Text>로그아웃</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

export default Header;