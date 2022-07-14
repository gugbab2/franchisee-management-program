import React,{useEffect, useState} from 'react'
import {Container,Form,Row,Col,InputGroup,Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css'
import useDaumPostcodePopup from 'react-daum-postcode/lib/useDaumPostcodePopup';
import DatePickerForm from '../template/DatePickerForm';
import axios from "axios";

function RegisterFormDesign() {
    let scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    const open = useDaumPostcodePopup(scriptUrl);
    const [address,setAddress] = useState({
      jibun:'',
      postalCode:'',
      road:''
    })
    
    const handleComplete = (data) => {
      setAddress({
        jibun : data.autoJibunAddress,
        postalCode : data.zonecode,
        road : data.address
      })
      if (data.userSelectedType === 'R') {
         // 사용자가 도로명 주소를 선택했을 경우
        document.getElementById('postcode--Address').value = data.roadAddress;
      } else {
         // 사용자가 지번 주소를 선택했을 경우(J)
        document.getElementById('postcode--Address').value = data.jibunAddress;
      }
    };
 
   const handleClick = () => {
     open({ onComplete: handleComplete });
   };

   const registOnclick = (e) => {
    e.preventDefault();
    axios({
      method : 'post',
      url : 'http://localhost:8080/api/sign/signup',
      data:{
        address:{
          ...address,
          jibun: e.target.form[8].value,
        },
        birth: e.target.form[9].value,
        email: e.target.form[0].value,
        gender: "M",
        name: e.target.form[3].value,
        password: e.target.form[1].value,
        phoneNumber: '010'+e.target.form[4].value
      }
    }).then(function(res){
      console.log(res)
    })
    // console.log('1:' + e.target.form[0].value)
    // console.log('2:' + e.target.form[1].value)
    // console.log('3:' + e.target.form[3].value)
    // console.log('4:' + '010'+e.target.form[4].value)
    // console.log('5:' + e.target.form[5].value)
    // console.log('6:' + e.target.form[7].value)
    // console.log('7:' + e.target.form[8].value)
    // console.log('8:' + e.target.form[9].value)
   }

    //  email, password check logic
    const [emailchkMessage,setEmailchkmessage] = useState('');

    const validateEmail = (e) => {
      const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      if(regexEmail.test(e.target.value)){
        setEmailchkmessage('올바른 이메일 형식입니다.')
      }else{
        setEmailchkmessage('올바르지 못한 이메일 형식입니다.')
      }
    }

    const [validatepw, setValidatepw] = useState({pw : '', pwchk: ''});
    const [chkmsg,setChkmsg] = useState();
    const pwvalidate = (e) => {
      setValidatepw({
        ...validatepw,
        [e.target.name] : e.target.value
      })
    }

    useEffect(()=> {
      if(validatepw.pw === validatepw.pwchk){
        setChkmsg('')
      }else{
        setChkmsg('비밀번호가 일치 하지 않습니다.')
      }
    },[validatepw.pw, validatepw.pwchk])

    return (
        <Container>
        <Row>
            <Col className="Contents-Header" style={{textAlign:'center'}}><h2>회원가입</h2></Col>
        </Row>
        <Form className='LoginForm'>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="이메일" onChange={validateEmail} />
            <div style={{fontSize:'10pt',color:'red'}}>{emailchkMessage}</div>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" name='pw' placeholder="비밀번호" onChange={pwvalidate}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPasswordChk">
            <Form.Label>비밀번호확인</Form.Label>
            <Form.Control type="password" name='pwchk' placeholder="비밀번호확인"  onChange={pwvalidate} />
            <div style={{fontSize:'10pt',color:'red'}}>{chkmsg}</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" name='name' placeholder="이름" />
          </Form.Group>

          <Form.Group className='mb-3'>
              <Form.Label htmlFor='phonNum'>전화번호</Form.Label>
              <InputGroup>
                  <InputGroup.Text id="basic-addon3"> 010 </InputGroup.Text>
                  <Form.Control id="phonNum" placeholder='-를제외하고 입력해주세요.'/>
              </InputGroup>
          </Form.Group>

          <Form.Group className='mb-3'>
              <Form.Label>주소</Form.Label>
              <InputGroup style={{width:'300px'}}>
                  <Form.Control
                  id="postcode--addressNumber"
                  type='text'
                  placeholder='우편번호'
                  value={address.postalCode}
                  />
                  <Button onClick={handleClick} style={{zIndex:'0'}} variant="primary">우편번호 검색</Button>
              </InputGroup>
              <Form.Control className='mb-3' type='text' id="postcode--Address" placeholder='주소'></Form.Control>
              <Form.Control className='mb-3' type='text' id="postcode-detailAddress" placeholder='상세주소'></Form.Control>
          </Form.Group>
          
          <Form.Group className='mb-3'>
              <Form.Label>생년월일</Form.Label>
              <DatePickerForm></DatePickerForm>
          </Form.Group>
          <Button 
          variant="primary" 
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