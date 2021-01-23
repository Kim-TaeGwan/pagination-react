import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Posts from "./Posts";
import "./styles.css";

function App() {
  /* 참고 : https://chanhuiseok.github.io/posts/react-12/ */
  const [posts, setPosts] = useState([]); //posts state에는 실제 json 데이터들이 array형태로 들어오므로 초기값을 배열로 설정.
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(async () => {
    //async를 사용하여 비동기 처리
    setLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    // axios.get이 반환하는 것은 Prosmise객체이다, 그 앞에 await를 붙여서 프로미스가 반환될 때까지 기다린다.
    // 이를 기다리는 동안 자바스크립트 엔진은 다른 일들을 처리할 수 있다. 그래서 비동기 처리를 도와주는 문법이라고 한다.
    // await은 반드시 async로 정의한 함수 내부에서만 사용할 수 있다.
    // async, await구문은 promise객체가 .then으로 콜백을 처리하던 부분을 좀 더 깔끔하게 작성할 수 있게 해준다.
    setPosts(response.data); // 받아온 데이터를 setPosts를 통해 posts state에 넣어줌
    setLoading(false);
  }, []);

  /*
    총 데이터를 postsPerPage 만큼 등분해서 보여준다.
    현재 총 100개의 데이터를 10등분해서, 1~10까지 보여주고, 그 다음 11 ~ 20까지 ... 이렇게 배열의 데이터를 나누어서 보여주어야 한다.

    이를 위해서 indexOfLast,indexOfFirst 변수를 선언
      이후 해당 페이지의 첫본째와 마지막 인덱스 번호 값을 구한다.
      예를 들어, 첫번째 페이지의 가장 처음 인덱스는 1번이고, 마지막은 100번이 된다.
      두 번쨰 페이지는 11번 ~ 20번이된다.

    처음과 끝 인덱스 번호를 구한다음, currentPosts 함수를 통해, 100개의 배열 데이터를 slice 함수로 분할해 준다. 이후 분할된 새로운 배열을 리턴한다.
      slice 함수는 페이지네이션을 구현할 때 아주 적합하다.
  */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  return (
    <div className="App">
      <Posts posts={currentPosts(posts)} loading={loading}></Posts>
      {/*
        <Pagination />컴포넌트
        postsPerpage, totalPosts, paginate를 넘긴다.
        각각 페이지 당 포스트 수, 전체 포스트 갯수, currentPage 상태를 변경하는 setter함수를 넘긴다.

        상요자가 선택한 페이지 넘어베 따라, currentPage의 값이 변경되도록 구현할 것이다.
        예를 들어 사용자가 3번을 선택하면, currentPage 상태값을 사용한 indexOfFirst, indexOfLast 변스의 값도 변경되면서
        분할 되는 데이터들도 달라질 것이다. 따라서 setCurrentPage 함수를 Pagination 컴포넌트에 인자로넘긴 것이다.

        즉, useState로 상태값을 만들고, 해당 상태값을 변경하는 setter함수를 활용한 것이다.
      */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={setCurrentPage}
      />
    </div>
  );
}
export default App;
