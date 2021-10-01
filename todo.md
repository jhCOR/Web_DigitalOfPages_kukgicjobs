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
 *공지사항 및 독서 발자취에 cleditor과 네이버 스마트 에디어2.0을 이용해 HTML태그를 해석하도록 수정하였음.
 *독서발자취기능 오류 수정
 
 2021.09.29 개발 내용(정지혁)
 *리스트 관련 오류를 수정하였음
 *독서발자취기능 오류 수정(데이터 저장과 보여주는 기능의 주소를 하나로 같이 쓰면서 보는 화면에서 새로고침시 계속 추가 저장이 되는 문제 수정)
 
 	,{file:'./HistoryOfBook', path:'/post/addHistoryOfBook/:id', method:'addHistoryOfBook', type:'get'}로 보는 화면 구성 요청을 받았던 것을 하단의 주소로 변경함
	,{file:'./HistoryOfBook', path:'/history/:id', method:'showHistory', type:'get'}
  
 -독서발자취기능에 공개 범위를 지정할 수 있게 수정하였으며 공개범위에 따라 타 유저의 독서발자취를 열람할 수 있도록 수정되었음(하단의 그림 참조)
 ![image](https://user-images.githubusercontent.com/63538097/135265173-65020f9e-7f1b-48c0-b5d3-210bea21f13a.png)
 ![image](https://user-images.githubusercontent.com/63538097/135265562-d0cb2af4-dbb5-4570-8821-8bcdfed21167.png)
 ![image](https://user-images.githubusercontent.com/63538097/135265625-33d79357-a750-4c1c-82ab-51b670466663.png)
 
 2021.09.30(정지혁)

 *개인정보처리방침 추가
 ![image](https://user-images.githubusercontent.com/63538097/135434798-47a2ff98-7748-41ad-8046-cf0d0c59eb13.png)

2021.10.01(정지혁)
*동일한 책인데 게시판처럼 각각의 책당 각각의 리뷰를 갖는 것은 책을 선택하는 입장에서 좋지 않다고 판단. 리뷰를 같은 isbn을 동일한 책끼리는 리뷰를 공유하도록 수정하였음. review_schema.js에 리뷰를 담는 방식으로 수정(하단의 사진 참조), 단 리뷰가 얼마나 많이 달릴지에 따라 너무 많을 경우 과도한 로딩시간과 불편한 ui가 초래될 수 있어 그룹간 리뷰공유를 막을 지 결정해야함. 

![image](https://user-images.githubusercontent.com/63538097/135550562-2307bde6-326d-458b-9e8a-6824b2071585.png)
![image](https://user-images.githubusercontent.com/63538097/135550643-3d960900-f86e-4e88-a9fd-da79958500a7.png)
두번째 사진(showbook.js)과 같이 isbn으로 리뷰를 검색하여 book스키마에 삽입하는 방식으로 동일 isbn의 모든 리뷰를 취급함.

1주차
관리자 페이지 (로그인시 소속원 정보기입가능하도록)
--------
2주차
알림기능[약간 어려움]
로그인, 오류핸들링
-------
3주차
기능,디자인 검토
발표영상,가이드 제작 후 제출



