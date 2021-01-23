import React from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 1px;
  border-top: 3px solid #186ead;
  border-bottom: 3px solid #186ead;
  background-color: rgba(0, 0, 0, 0.4);
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  /*
    pageNumbers의 경우, 총 페이지 넘버 수를 계산한 뒤 웹 페이지에서 보여주기 위하여, 전체 포스트 갯수를 페이지당 포스트갯수로 나눈 값으로 배열을 만든 것이다.
      포스트 개수가 100개이고, 페이지 당 포스트 개수를 10개로 지정할 경우 1 2 3 4 5 6 7 8 9 10 이 생성될 것이다.
  */
  return (
    <>
      <div>
        <nav>
          <PageUl className="pagination">
            {pageNumbers.map((number) => (
              <PageLi key={number} className="page-item">
                <PageSpan
                  onClick={() => paginate(number)}
                  className="page-link"
                >
                  {number}
                </PageSpan>
              </PageLi>
            ))}
          </PageUl>
        </nav>
      </div>
      {/*
      앞서 구한 pageNumbers 배열을 map함수를 이용해 요소 하나씩 꺼내면서 <li>로 만들고 클릭 이벤트를 걸어 주었다.
      이떄 <li>하위에 <span>을 만들어 거기에 숫자를 표시했고 ({number}), <span>에 onClick 이벤트를 작성하였다.
      화살표 함수로 작성한 것이며, onClick={()=> paginate(number)}부분에서 paginate함수는 앞서 받은 setCurrentPage 함수이며,
      클릭할 때 setCurrentPage 함수의 인자로 number를 넘겨 currentPage 상태 값을 변경하는 것을 구현.
      따라서 사용자가 숫자를 클릭하면, currentPage상태 값이 변경되고, 이에 따라 App.js에서 작성한 대로 배열 데이터 값이 분할되어 화면에 표시될 것이다.
      
    */}
    </>
  );
};

export default Pagination;
