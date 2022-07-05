import Header from './Header';
import Footer from './Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container,Row,Col } from 'react-bootstrap';

  function BasicExample() {
    return (
      <Container>
        <Row>
            <Col></Col>
            <Col xs={5} className="Contents-Header">로그인</Col>
            <Col></Col>
        </Row>
        <Form className='LoginForm'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="이메일을 입력해주세요." />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호를 입력해주세요." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="아이디 저장" />
          </Form.Group>
          <Button variant="primary" type="submit">
            로그인
          </Button>
          <div class="register mb-3">
            <span><a href="#">회원가입</a><a class="search" href="#">아이디찾기/비밀번호찾기</a></span>
          </div>
        </Form>
      </Container>
    );
  }

  function Login() {
    return (
      <div className="Login">
        <Header></Header>
        <BasicExample></BasicExample>
        <Footer></Footer>
      </div>
    );
  }

export default Login;