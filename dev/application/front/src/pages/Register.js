import React,{useState} from 'react'
import {Container,Form,Row,Col,Dropdown,DropdownButton,InputGroup,Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
// import {useDaumPostcodePopup}  from 'react-daum-postcode';

export default function Register() {
   const [startDate,setStartDate] = useState(new Date());

  return (
    <Container>
            <Row>
                <Col style={{textAlign:'center'}}>
                    <h2>회원가입</h2>
                </Col>
            </Row>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type='email' placeholder='이메일'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type='password' placeholder='비밀번호'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control type='password' placeholder='비밀번호 확인'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>이름</Form.Label>
                    <Form.Control type='password' placeholder='이름'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>전화번호</Form.Label>
                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title="전화번호"
                            id="input-group-dropdown-1"
                        >
                        <Dropdown.Item>010</Dropdown.Item>
                        <Dropdown.Item>016</Dropdown.Item>
                        <Dropdown.Item>017</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control aria-label="Text input with dropdown button" />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                <InputGroup>
                    <Form.Control
                      type='text'
                      placeholder='우편번호'
                    />
                    <Button variant="primary">우편번호 검색</Button>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Form.Label>성별</Form.Label>
                    </Row>
                    <Form.Check
                        inline
                        label="남"
                        name="group1"
                        type='radio'
                    />
                    <Form.Check
                        inline
                        label="녀"
                        name="group1"
                        type='radio'
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>생년월일</Form.Label>
                    <DatePicker selected={startDate} onChange={date=>setStartDate(date)}/>
                </Form.Group>
            </Form>
        </Container>
  )
}
