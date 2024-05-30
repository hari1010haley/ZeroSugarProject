import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateMemberForm.css';

function CreateMemberForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    regDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/members/new', formData);
      // 폼 제출 후 리다이렉션
      window.location.href = '/members';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" name="name" placeholder="이름을 입력하세요" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="age">
          <Form.Label>나이</Form.Label>
          <Form.Control type="text" name="age" placeholder="나이를 입력하세요" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>전화번호</Form.Label>
          <Form.Control type="text" name="phoneNumber" placeholder="전화번호를 입력하세요" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="regDate">
          <Form.Label>등록일</Form.Label>
          <Form.Control type="date" name="regDate" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label>만료일</Form.Label>
          <Form.Control type="date" name="endDate" onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          등록
        </Button>
        <Link to={'/members'} className="btn btn-secondary ms-2">취소</Link>
      </Form>
    </Container>
  );
}

export default CreateMemberForm;
