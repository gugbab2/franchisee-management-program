import React, { useState } from "react";
import { Container, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import useDaumPostcodePopup from "react-daum-postcode/lib/useDaumPostcodePopup";
import DatePickerForm from "../template/DatePickerForm";

function RegisterFormDesign() {
  let scriptUrl =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);
  const [jibun, setJibun] = useState();
  const [road, setRoad] = useState();

  const handleComplete = (data) => {
    setRoad(data.address);
    setJibun(data.autoJibunAddress);

    if (data.userSelectedType === "R") {
      // 사용자가 도로명 주소를 선택했을 경우
      document.getElementById("postcode--Address").value = data.roadAddress;
    } else {
      // 사용자가 지번 주소를 선택했을 경우(J)
      document.getElementById("postcode--Address").value = data.jibunAddress;
    }
    console.log(data);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const registOnclick = (e) => {
    e.preventDefault();
    console.log(e.target.form[0].value);
  };

  //  email, password check logic
  const [email, setEmail] = useState("");
  const [chkEmail, setChkemail] = useState("");
  const [chkMessage, setChkmessage] = useState("");

  const validateEmail = (e) => {
    const regexEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (regexEmail.test(e.target.value)) {
      setChkmessage("올바른 이메일 형식입니다.");
    } else {
      setChkmessage("올바르지 못한 이메일 형식입니다.");
    }
  };

  const [password, setPassword] = useState("");
  const [repassword, resetPassword] = useState("");
  const [pwsamechk, setpwSamechk] = useState("");
  const pwOnchanged = (e) => {
    setPassword(e.target.value);
  };
  const repwOnchanged = (e) => {
    resetPassword(e.target.value);
    if (repassword === password) {
      setpwSamechk(true);
    } else {
      setpwSamechk(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col className="Contents-Header" style={{ textAlign: "center" }}>
          <h2>회원가입</h2>
        </Col>
      </Row>
      <Form className="LoginForm">
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일"
            onChange={validateEmail}
          />
          <div style={{ fontSize: "10pt", color: "red" }}>{chkMessage}</div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            onChange={pwOnchanged}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPasswordChk">
          <Form.Label>비밀번호확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호확인"
            onChange={repwOnchanged}
          />
          {pwsamechk && (
            <div style={{ color: "red", fontSize: "8pt" }}>
              비밀번호가 일치합니다.
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" placeholder="이름" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="phonNum">전화번호</Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon3"> 010 </InputGroup.Text>
            <Form.Control
              id="phonNum"
              placeholder="-를제외하고 입력해주세요."
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>주소</Form.Label>
          <InputGroup style={{ width: "300px" }}>
            <Form.Control
              id="postcode--addressNumber"
              type="text"
              placeholder="우편번호"
            />
            <Button
              onClick={handleClick}
              style={{ zIndex: "0" }}
              variant="primary"
            >
              우편번호 검색
            </Button>
          </InputGroup>
          <Form.Control
            className="mb-3"
            type="text"
            id="postcode--Address"
            placeholder="주소"
          ></Form.Control>
          <Form.Control
            className="mb-3"
            type="text"
            id="postcode-detailAddress"
            placeholder="상세주소"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>생년월일</Form.Label>
          <DatePickerForm></DatePickerForm>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          size="lg"
          id="Login-LoginForm__loginBtn"
          onClick={registOnclick}
        >
          가입하기
        </Button>
      </Form>
    </Container>
  );
}

function Register() {
  return (
    <div className="Login">
      <RegisterFormDesign></RegisterFormDesign>
    </div>
  );
}

export default Register;
