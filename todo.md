# What am I doing now?  
  
정지혁 :  
- 게시판 기능(이미지 본문삽입,댓글 대댓글 등)
안드로이드 스튜디오 개발(메모장 어플,퀴즈&설문어플등)
플러터(간단한 수준), 인공지능(스타일 트렌스퍼 등을 적용해 프로필 사진에 변화를 주어 신선한 느낌을 줘 볼 수 있음, 사용 결정시 바로 적용 가능)  
  
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

![image](https://user-images.githubusercontent.com/63538097/133967319-ec898419-a423-440e-86cd-51ba1965b924.png)

DIGITAL OF PAGES
2021년 9월 18일 


# 정지혁, 양재훈, 김정호(**TEAM kukgic jobs**)

 2021.09.29 개발 내용(정지혁)
 -리스트 관련 오류를 수정하였음
 -독서발자취기능에 공개 범위를 지정할 수 있게 수정하였으며 공개범위에 따라 타 유저의 독서발자취를 열람할 수 있도록 수정되었음(하단의 그림 참조)
 ![image](https://user-images.githubusercontent.com/63538097/135265173-65020f9e-7f1b-48c0-b5d3-210bea21f13a.png)
 ![image](https://user-images.githubusercontent.com/63538097/135265562-d0cb2af4-dbb5-4570-8821-8bcdfed21167.png)
 ![image](https://user-images.githubusercontent.com/63538097/135265625-33d79357-a750-4c1c-82ab-51b670466663.png)


 
------------------------------------------------------------------------------------------------------------------------------------
 2021.09.29 개발 내용(정지혁)
개발 예정 기능
로그인해제 된 후 주소 요청시 오류나는 문제 
독서기록을 저장은 하는데 리스트를 나열하는 기능이 아직 없음
개발자 공지사항, 관리자 공지사항
공지사항등록시 에디터를 붙이거나 해석도구 붙여서 줄 변경 인식하도록 수정(독서 발자취도 검토해보기)

1주차
관리자 페이지 (로그인시 소속원 정보기입가능하도록)
독서 발자취 공개/비공개 선택 후 공개 독서 발자취 리스트 띄우기
리뷰(책마다 리뷰가 아닌 같은 책이면 리뷰 공유,isbn추가)
contact us 미완성[쉬움]
--------
2주차
알림기능[약간 어려움]
로그인, 오류핸들링
-------
3주차
기능,디자인 검토
발표영상,가이드 제작 후 제출


**추가 고려 사항**
도메인 구입(약자인 dop는 대부분 구입 불가)
![image](https://user-images.githubusercontent.com/63538097/133967424-529a26d5-c437-4b08-9e5a-d038bc9da6a9.png)
![image](https://user-images.githubusercontent.com/63538097/133967444-58448712-8008-468d-b014-eacfa2744367.png)



