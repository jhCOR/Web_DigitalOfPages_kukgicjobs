# What am I doing now?  
  ![image](https://user-images.githubusercontent.com/63538097/133967319-ec898419-a423-440e-86cd-51ba1965b924.png)

DIGITAL OF PAGES
2021년 9월 18일 


# 정지혁, 양재훈, 김정호(**TEAM kukgic jobs**)

김정호 :  
- customizing frontend template (branch front/book)  
  - components/dashboard/blog
  - components/dashboard/product
  - pages/Blog
  - pages/Products
  - _mocks_/blog
  - _mocks_/products
  - src/layouts/dashboard/DashboardSidebar (edit to remove ad)
  - src/routes
- add files(related to book details)
  - src/components/_dashboard/detail/
  - src/pages/BookDetail
  - src/components/_dashboard/blog/BookList  
- draft를 이용한 editor 작업 시작 (branch front/editor)
  - src/pages/Editor  
```
npm install --save react-draft-wysiwyg draft-js
```
- backend (branch back/main)
  - 현재 book과 관련된 기능들을 우선하여 이식 중입니다.  
    
양재훈 :  
- customizing frontend template  
  - dashboard/app
  - dashboard/user  
- add files(related to book)
  - src/pages/ApplyBook
  - src/pages/RegisterBook
  - _mocks_/books
- Authentication & Authorization (login and signup)    

 2021.09.28(정지혁)
 * 공지사항 및 독서 발자취에 cleditor과 네이버 스마트 에디어2.0을 이용해 HTML태그를 해석하도록 수정하였음.
 * 독서발자취기능 오류 수정
 
 2021.09.29 개발 내용(정지혁) : EJS/list브랜치
 * 리스트 관련 오류를 수정하였음
 * 독서발자취기능 오류 수정(데이터 저장과 보여주는 기능의 주소를 하나로 같이 쓰면서 보는 화면에서 새로고침시 계속 추가 저장이 되는 문제 수정)
 
 	,{file:'./HistoryOfBook', path:'/post/addHistoryOfBook/:id', method:'addHistoryOfBook', type:'get'}로 보는 화면 구성 요청을 받았던 것을 하단의 주소로 변경함
	,{file:'./HistoryOfBook', path:'/history/:id', method:'showHistory', type:'get'}
  
 * 독서발자취기능에 공개 범위를 지정할 수 있게 수정하였으며 공개범위에 따라 타 유저의 독서발자취를 열람할 수 있도록 수정되었음(하단의 그림 참조)
 ![image](https://user-images.githubusercontent.com/63538097/135265173-65020f9e-7f1b-48c0-b5d3-210bea21f13a.png)
 ![image](https://user-images.githubusercontent.com/63538097/135265562-d0cb2af4-dbb5-4570-8821-8bcdfed21167.png)
 ![image](https://user-images.githubusercontent.com/63538097/135265625-33d79357-a750-4c1c-82ab-51b670466663.png)
 
 2021.09.30(정지혁)

 * 개인정보처리방침 추가
 ![image](https://user-images.githubusercontent.com/63538097/135434798-47a2ff98-7748-41ad-8046-cf0d0c59eb13.png)

2021.10.01(정지혁) : EJS/sharedReview브랜치 --> EJS/alarm브랜치
* 동일한 책인데 게시판처럼 각각의 책당 각각의 리뷰를 갖는 것은 책을 선택하는 입장에서 좋지 않다고 판단. 리뷰를 같은 isbn을 동일한 책끼리는 리뷰를 공유하도록 수정하였음. review_schema.js에 리뷰를 담는 방식으로 수정(하단의 사진 참조), 단 리뷰가 얼마나 많이 달릴지에 따라 너무 많을 경우 과도한 로딩시간과 불편한 ui가 초래될 수 있어 그룹간 리뷰공유를 막을 지 결정해야함. 

![image](https://user-images.githubusercontent.com/63538097/135550562-2307bde6-326d-458b-9e8a-6824b2071585.png)
![image](https://user-images.githubusercontent.com/63538097/135550643-3d960900-f86e-4e88-a9fd-da79958500a7.png)
두번째 사진(showbook.js)과 같이 isbn으로 리뷰를 검색하여 book스키마에 삽입하는 방식으로 동일 isbn의 모든 리뷰를 취급함.

* 로그인, 오류핸들링 기능 추가.500번 서버 오류 핸들링 기능 추가 및 비 로그인 주소 요청을 차단하여 로그인 화면으로 이동하도록 수정.
![image](https://user-images.githubusercontent.com/63538097/135572333-0a43a005-4249-41e4-bfd5-f0d2457aa1f6.png)
위 화면의 주소 요청(책 내용을 보려는 요청)이 로그인 해제 상태로 이루어져 로그인을 해야한다는 메세지와 함께 로그인 화면으로 이동하도록 수정(app.js의 76~106번쨰 줄 참조)
- 예시:
![image](https://user-images.githubusercontent.com/63538097/135572518-346b878e-8e1f-4ecc-a4c9-683b9c72ec7c.png)

* 연체도서 알림 기능 추가(시간을 체크하여 14일 이상 대출했을 경우 연체 중인 도서로 이동, myPage.ejs파일 수정)
![image](https://user-images.githubusercontent.com/63538097/135585920-7cfaafb8-6867-4b73-b64d-3f8563e74967.png)

2021.10.02(정지혁) : EJS/profile
* 프로필 수정(탈퇴 기능 추가,연체 도서 개수 표시;profile.ejs & user.js), 디자인 일부 수정

2021.10.03(정지혁) : VUE/findGroup
* signUp.ejs파일에서 소속그룹 검색하는 기능에 Vue 적용하여 ui개선

2021.10.04(정지혁) : Vue/adminpage
* 관리자 페이지 추가(총 보유 장서 수, 회원 수, 연체 도서 수, 대출 중인 도서 수와 회원/연체도서/대출도서 이름 조회 기능)
![image](https://user-images.githubusercontent.com/63538097/135795588-e2a74180-798d-4f05-8f15-fac4e635cdc0.png)
좌측의 문구 클릭시 오른쪽 화면이 vue로 렌더링 됨
![image](https://user-images.githubusercontent.com/63538097/135797030-98a6ef53-8bc7-4b8a-ae6c-33531686724b.png)
* 첫 화면에 의미 없는 내용 제거(로그인시 첫화면에 관리자 공지사항 추가)
![image](https://user-images.githubusercontent.com/63538097/135979633-27655c78-8463-4c5e-9fc6-5e74111d7cd6.png)

2021.10.05(정지혁) : 
* 첫화면에 로그인시 공지사항과 더불어 신간을 노출하도록 수정
* 제출 1주전 까지
  - 관리자 페이지 (로그인시 소속원 정보기입가능하도록)
  - 알림기능[약간 어려움]

* 마지막 주
  - 기능,디자인 검토
  - 발표영상,가이드 제작 후 제출



