프로젝트 설명
라우터(routes폴더)
ㄴbook.js(대부분의 기능)*
	ㄴrouteFunc폴더(주로 book.js의 데이터 작업을 하는 함수들 모음)
ㄴuser_passport.js(로그인 및 간단한 라우터)

현재 구현하려고 하는 것: 독서 발자취기능
이 메뉴를 들어가면 독서 기록으로 분류된 대상들이 한 책당 하나의 버튼으로 화면에 추가되는 기능을 만들예정(HistoryGallery)

*
 book.js의 함수 : listpost(등록된 책 리스트로 반환), addbook(도서 등록, 관리자 권한), showbook(등록된 도서 리스트에서 하나 선택하면 등록된 책 정보를 보여주는 함수),
 borrow(대출시 실행되는 기능입니다, showbook에서 /book/lend로 요청시 borrow함수가 실행되는 것) ,reservation,addReview, reservationList(mypage에서 대출 중인 도서 띄우는 함수),
 giveBack(mypage에서 반납시 실행됨),applyBook, requestBook,listapplybook, acceptRequest, 
 search,requestlist(관리자로 회원가입시 이 함수를 통해 자동으로 관리자 권한 허용 요청이 되는 것, acceptAdminRequest, loanByQrcode;
