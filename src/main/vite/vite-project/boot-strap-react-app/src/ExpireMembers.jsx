import React, { useEffect, useState } from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import MemberInfoView from "./MemberInfoView";

function ExpireMembers() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(20);

  useEffect(() => {
    axios.get('/members/expireMembers') // 만료회원 목록을 가져오도록 수정
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the expired members!', error);
      });
  }, []);

  // 현재 페이지에 해당하는 만료회원 목록 계산
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members && members.length > 0 ? members.slice(indexOfFirstMember, indexOfLastMember) : [];

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 페이지 번호를 동적으로 생성하여 반환
  const renderPageNumbers = () => {
    if (!members || members.length === 0) return null;

    const pageNumbers = [];
    const totalPages = Math.ceil(members.length / membersPerPage);
    const maxPageToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageToShow - 1);

    for (let number = startPage; number <= endPage; number++) {
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
        <h2>만료 회원 조회</h2>
        <br></br>
        <table>
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
          {Array.isArray(currentMembers) && currentMembers.length > 0 ? (
              currentMembers.map((member, index) => (
                  <tr key={member.id}>
                    <td>{index + 1}</td>
                    <td>{member.name}</td>
                    <td>{member.age}</td>
                    <td>{member.regDate}</td>
                    <td>{member.endDate}</td>
                    <td>{member.remDays}</td>
                    {/* 잔여일 추가 */}
                    <td>
                      <Link to={`/member/info/${member.id}`}>재등록 수정</Link>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="7">만료된 회원이 없습니다.</td>
              </tr>
          )}
          </tbody>
        </table>
        <Pagination>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}/>
          {renderPageNumbers()}
          <Pagination.Next onClick={() => paginate(currentPage + 1)}
                           disabled={currentPage === Math.ceil(members.length / membersPerPage)}/>
        </Pagination>

        {/* MemberInfoView 라우팅 */}
        <Routes>
          <Route path="/member/info/:id" component={MemberInfoView}/>
        </Routes>
      </div>
  );
}

export default ExpireMembers;
