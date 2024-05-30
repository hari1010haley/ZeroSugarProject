import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Table } from 'react-bootstrap';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(20);

  useEffect(() => {
    axios.get('/members')
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the members!', error);
      });
  }, []);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = Array.isArray(members) ? members.slice(indexOfFirstMember, indexOfLastMember) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let number = 1; number <= Math.ceil(members.length / membersPerPage); number++) {
      pageNumbers.push(
        <Pagination.Item key={number} onClick={() => paginate(number)} active={number === currentPage}>
          {number}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="container">
      <h2>회원 조회</h2>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>이름</th>
            <th>나이</th>
            <th>등록일</th>
            <th>만료일</th>
            <th>잔여일</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.regDate}</td>
              <td>{member.endDate}</td>
              <td>{member.remDays}</td>
              <td>
                <Link to={`/member/info/${member.id}`}>회원상세보기</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {renderPageNumbers()}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(members.length / membersPerPage)} />
      </Pagination>
    </div>
  );
}

export default MemberList;
