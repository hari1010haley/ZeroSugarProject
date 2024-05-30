import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Button, Nav } from 'react-bootstrap';
import LogoImage2 from './logo2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function MainPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
        window.location.href = 'http://localhost:8001/members/new';
  };

  const handleViewMembers = () => {
    window.location.href = 'http://localhost:8001/members';
  }

  const handleCheckReRegistration = () => {
    window.location.href = 'http://localhost:8001/members/expireMembers';
  };

  return (
    <Container>
      <header className="linkedSite">
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item as="li">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="https://www.instagram.com/heal.care.pila/">Instagram</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link
              href="https://new.smartplace.naver.com/bizes/place/8341600?bookingBusinessId=934696">Naver</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="https://business.kakao.com/biz-profile/2208327">Kakao</Nav.Link>
          </Nav.Item>
        </Nav>
      </header>
      <h1>HealingCare</h1>
      <br />
      <h4 className="h4">힐링케어의 '회원등록/조회 페이지'에 오신것을 환영합니다.</h4>
      <img src={LogoImage2} alt="logo2" />
      <br />
      <div className="button-container">
        <Button variant="outline-warning" className="custom-button" onClick={handleRegister}>
          회원 등록
        </Button>
        <Button variant="outline-warning" className="custom-button" onClick={handleViewMembers}>
          회원 조회
        </Button>
        <Button variant="outline-warning" className="custom-button" onClick={handleCheckReRegistration}>
          재등록 확인
        </Button>
      </div>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/*<Route path="/members/new" element={<CreateMemberForm />} />*/}
        {/*<Route path="/members" element={<MemberList />} />*/}
        {/*<Route path="/members/expireMembers" element={<ExpireMembers />} />*/}
        {/*  /!* 새로운 회원 등록 후에 회원 조회 페이지로 연결되도록 설정 *!/*/}
        {/*<Route path="/members/new" element={<Navigate to="/members" />} />*/}
      </Routes>
    </Router>
  );
}

export default App;