1. 이 앱은 무엇인가?
- 포켓몬 도감입니다
- 포켓몬스터에 나오는 귀여운 몬스터들의 프로필을 얻을 수 있습니다. 


2. 왜 만들었나? 어떤 기능이 있는가?


- Rest Api를 사용하는 법을 익히기 위해서
    이 페이지를 만들기 위해서 사용한 api는 https://pokeapi.co/에서 가져왔다. 
    
    api를 가져오기 위해서는 비동기처리해야 한다는 걸 알았다. (async & await를 사용한 function을 따로 만듬) 
    
    미리 만든 api function을 사용하기 위해서는 useEffect를 사용하여 렌더링시 한번 불러오게 한다.
    
    단순히 불러오기 만하는 것만으로 내가 원하는 정보를 얻을 수 없다. 데이터를 추출하는 function을 만든다(ApiList)
       이때 발생한 문제 Korean name을 찾을 수 없다. 
       = 해결 따로 Korean name 데이터를 가지고 있는 aip가 있었다. => 총 두 개의 api를 불러와서 필요한 데이터를 추출해주는 function을 만들자.(KoreanNameAbstraction 이후 ApiList function으로 통합)
    
    useState로 저장한다. => 이후 전역관리를 위해 context api로 교체



- infinite scroll의 사용법을 익히기 위해서 
    
    react-intersection-observer 라이브러리를 사용한다.(https://www.npmjs.com/package/react-intersection-observer)
    
    여기서 이전에 학습했으나 잊어버린 useRef를 다시 상기했다. (useRef로 관리하는 값은 값이 변해도 화면이 렌더링되지 않음)=? 왜 ref를 사용하는 지 찾아보기
    
    inView의 사용법을 알아야한다.
      Ref로 inView 값이 변하는 것으로 리랜더링을 막는다. 그리고 inView의 값이 변할 때 실행되는 useEffect를 만들어낸다. 
      그렇다면 이제 inview가 화면에 노출 될때마다 inview의 값이 변할테고 useEffect가  실행되게 된다. 
    
    useEffect에 aip로 index 가져오고 값을 저장할 function을 만든다. (이후 ApiList로 통합했다.)

 
- context api를 효율적으로 사용하기 위해서 
    context api로 전역관리에 두가지 기능으로 쓰인다. 
    
      첫번째 api로 가져온 값을 사용하기 위해서 
         다음 인덱스를 가져오기 위해서
         detailPage에 사용하기 위해
    
      두번째 스프라이트를 변경하기 위해서
        스프라이트는 지금 보여지고 있는 포켓몬 그림의 종류를 말한다. 
        일괄적으로 (mainPage, detailPage) 모든 페이지에 쓰이는 그림의 종류를 변경한다. 
        그러기 위해서는 이미 만들어 놓은


3. 무엇을 사용하였는가?
4. 무엇을 배웠는가? 
