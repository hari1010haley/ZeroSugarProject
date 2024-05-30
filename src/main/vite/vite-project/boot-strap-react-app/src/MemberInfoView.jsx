import React, { useEffect, useState } from 'react';
import {useParams, Link, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import MemberList from "./MemberList";

function MemberInfoView() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [regDate, setRegDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [remDays, setRemDays] = useState(0); // remDays를 int로 초기화

  useEffect(() => {
    axios.get(`/api/members/${id}`)
      .then(response => {
        const data = response.data;
        setMember(data);
        setName(data.name);
        setAge(data.age);
        setPhoneNumber(data.phoneNumber);
        setRegDate(data.regDate);
        setEndDate(data.endDate);
        setRemDays(data.remDays);
      })
      .catch(error => {
        console.error('There was an error fetching the member!', error);
      });
  }, [id]);

  const handleUpdateMember = () => {
    const updatedMember = {
      id,
      name,
      age,
      phoneNumber,
      regDate,
      endDate,
      remDays
    };

    // 여기서 axios를 사용하여 업데이트 요청을 보낼 수 있습니다.
    // axios.put(`/api/members/${id}`, updatedMember)
    //   .then(response => {
    //     console.log('Member updated successfully:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error updating member:', error);
    //   });

    // 여기서는 단순히 콘솔에 출력하도록 합니다.
    console.log('Updated member:', updatedMember);
  };

  if (!member) {
    return <div>회원 정보를 찾을 수 없습니다.</div>;
  }

  return (
      <div className="container">
        <h2>회원 상세 정보</h2>
        <br></br>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>이름</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="age">
                <Form.Label>나이</Form.Label>
                <Form.Control type="text" value={age} onChange={(e) => setAge(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>전화번호</Form.Label>
                <Form.Control type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="regDate">
                <Form.Label>등록일</Form.Label>
                <Form.Control type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="endDate">
                <Form.Label>만료일</Form.Label>
                <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="remDays">
                <Form.Label>잔여일</Form.Label>
                <Form.Control type="text" value={remDays} onChange={(e) => setRemDays(parseInt(e.target.value))}/>
              </Form.Group>

              <Button variant="primary" onClick={handleUpdateMember}>회원 정보 수정</Button>
            </Form>
          </Card.Body>
        </Card>
        <br></br>
        <Link to="/members">회원 정보로 돌아가기</Link>
        {/* Members 라우팅 */}
        <Routes>
          <Route path="/members" component={MemberList}/>
        </Routes>
      </div>
  );
}

export default MemberInfoView;
