프로젝트 설명
라우터(routes폴더)
ㄴbook.js(대부분의 기능)*
	ㄴrouteFunc폴더(주로 book.js의 데이터 작업을 하는 함수들 모음)
ㄴuser_passport.js(로그인 및 간단한 라우터)

 book.js의 함수 : listpost(등록된 책 리스트로 반환), addbook(도서 등록, 관리자 권한), showbook(등록된 도서 리스트에서 하나 선택하면 등록된 책 정보를 보여주는 함수),
 borrow(대출시 실행되는 기능입니다, showbook에서 /book/lend로 요청시 borrow함수가 실행되는 것) ,reservation,addReview, reservationList(mypage에서 대출 중인 도서 띄우는 함수),
 giveBack(mypage에서 반납시 실행됨),applyBook, requestBook,listapplybook, acceptRequest, 
 search,requestlist(관리자로 회원가입시 이 함수를 통해 자동으로 관리자 권한 허용 요청이 되는 것, acceptAdminRequest, loanByQrcode;
 
2021.9.18
몇가지 기능 추가하여 PROTOTYPE에 업로드
독서기록을 만들떄 책 검색->책이미지를 글과 같이 보여준다.
![image](https://user-images.githubusercontent.com/63538097/133878143-1d08609f-bfa7-48f3-9c1f-63d6fa1f7524.png)
![image](https://user-images.githubusercontent.com/63538097/133878346-f719f7e8-e333-4790-99ff-bc470d95bc81.png)

소속 선택
관리자는 그냥 기입하고 관리자가 아닌 경우 검색하면 자동 기입됨(두번째 사진에서 선택시 자동으로 칸 채워짐, 단 지금은 모든 소속이 다 뜨는데 검색으로 변경 예정) 
![image](https://user-images.githubusercontent.com/63538097/133878398-edb71e27-b4b4-4372-90b1-617030e63e40.png)
![image](https://user-images.githubusercontent.com/63538097/133878405-3f62b46b-df9a-43ec-8df3-fe9f225ed80b.png)

<아직 남은 것들..>
로그인해제 된 후 주소 요청시 오류나는 문제
회원 정보 수정기능 추가해야함
독서기록을 저장은 하는데 리스트를 나열하는 기능이 아직 없음
contact us 미완성 gmail같은거 연결?
오늘의 도서(도서 추천 기능 없음)

