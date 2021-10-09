# PROJECT NAME
Digital Of Pages ; DoP

## 프로젝트 소개
- 저희 Digital Of Pages는 파편화된 각 부대 도서관의 관리 체계를 통합하여 더 편리한 도서 체계를 구축하기 위한 프로젝트입니다. 수기로 대출과 반납을 관리하여 도서를 제대로 관리하지 못하고 누락 및 위조가 빈번히 발생하고 특정 병사가 반납을 하지 않는 현상이 발생하는 고질적인 문제가 많았습니다. 그러다보니 자연스레 독서 의지가 떨어지거나 같은 책을 계속 반복하여 구비해야 합니다. 이 같은 현상을 계속 목격하면서 예산의 낭비를 막고 장병들의 복지를 향상 시키기 위해 준비한 프로젝트가 바로 Digital Of Pages입니다. 저희는 저희의 프로젝트를 통해 낭비되는 예산의 집행을 예방하고 아무런 효용도 갖지 못하고 사라지던 장병들의 도서 이용 데이터들을 유용하게 사용하려고 합니다. 교육 자료를 준비할 때 도서 이용 데이터를 제공하여 공감대를 형성할 수 있고 필요없는 도서를 구매하지 않아 해당 도서들이 읽히지 않고 자리만 차지하는 일을 막을 수 있으리라 기대하고 있습니다.


## 기능 설명
 - 도서 대출/반납
 - 마이페이지 : 대출 중인 도서 목록 확인 및 연체 중인 도서 목록 확인
 - 프로필 : 유저 회원가입 정보 및 닉네임 수정 기능, 대출 기록 및 작성한 리뷰 기록 확인 + 친구 조회와 친구 추가 기능
 - 관리자 페이지 및 관리자 기능 : 신청 도서 목록 확인, 도서관 전체 도서 수/대출 중인 수/회원 수 확인, 도서 등록 등의 관리자 기능
 - 독서 발자취 : 독서 발자취(독서록)작성 및 비공개/그룹공개/전체공개 등 열람 범위 설정 및 점위에 따른 타 유저 독서 발자취 열람
 - 도서 검색 기능 외 다수의 편의 기능 

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Technique Used) 
### Server(back-end)
 - nodejs
 - express, laravel, sptring boot 등 사용한 프레임워크 
 - Database : MongoDB, mongoose
 
### Front-end
 - 	ejs, HTML5, CSS3, Vue.js
 -  부트스트랩
 - Alpha template(http://html5up.net)

## 설치 안내 (Installation Process)
로컬에서 테스트 하려는 경우 redis코드 삭제 후 아래 코드 입력
```bash
$ git clone git https://github.com/osamhack2021/Web_DigitalOfPages_kukgicjobs.git
$ npm install
$ npm start
```
서버에서 서비스 하려는 경우(세번째 줄에서 -i 뒤의 숫자는 컴퓨팅 자원에 따라 상이, --name은 선택사항이며 dop는 임의로 정한 이름)
1. env 파일에서 NODE_ENV값 'production'으로 수정(helmet 및 hpp활성화)
2. 몽고디비 실행(data폴더 위치에 따라 --dbpath위치는 상이, 아래의 경로는 workspace 바로 아래 data폴더와 본 프로게트 폴더가 있는 상황을 가정함;)
```bash
mongodb --dbpath data
```
3. 서버 실행
```bash
$ git clone git https://github.com/osamhack2021/Web_DigitalOfPages_kukgicjobs.git
$ npm install
$ pm2 start app.js -i 10 --name dop
```

## 프로젝트 사용법 (Getting Started)
 * [메인 화면] 프로젝트 사용을 위해 우 상단의 로그인 버튼 클릭
 * ![image](https://user-images.githubusercontent.com/63538097/136648258-a9f86395-2098-45c1-a6f4-04e4f2439884.png)
 * [프로필 화면] 
  - 상단의 친구 추가 시 자신의 프로필을 열람할 수 있는 유저를 추가할 수 있음 조회 기능 사용시 친구의 프로필을 열람할 수 있습니다.
  - 화면 중간의 북 히스트로/리뷰 히스토리 버튼을 눌러 대출 기록 및 리뷰 작성 기록 확인 가능하며, 친구 목록 버튼을 눌러 자신의 프로필 열람 가능 유저 확인할 수 있습니다.
 * ![image](https://user-images.githubusercontent.com/63538097/136648304-2253039a-4c88-40d6-a2da-0c2c9949ffce.png)
 * [독서 발자취 작성 및 열람]
 * <독서 발자취 작성>
  - ![image](https://user-images.githubusercontent.com/63538097/136648443-0fc623f2-ba58-47a6-bc70-04e8af8b8241.png)
 * <독서 발자취 보기>
  - ![image](https://user-images.githubusercontent.com/63538097/136648468-451c30de-d70b-40f8-9763-37d57bb94d4d.png)
  - 그룹 공개: ![image](https://user-images.githubusercontent.com/63538097/136648530-edcb0a46-1e27-4310-904d-0099e8f0dc7d.png)
  - 전체 공개: ![image](https://user-images.githubusercontent.com/63538097/136648541-c61d0707-509f-4ee0-918a-d5795f1822b0.png)
 * [도서 등록] 
  - 책 검색-> 새 창에 도서 제목 기입 검색->책 정보 자동 완성->도서 목록에서 확인
  - ![image](https://user-images.githubusercontent.com/63538097/136648577-18ecb8ae-12b3-4911-8a32-e296e6448ed3.png)
  - ![image](https://user-images.githubusercontent.com/63538097/136648610-e2729f5f-eab3-4173-a5ac-a811777fdaf7.png)
* [도서 신청] 
 - 도서 신청->제목 입력->원하는 도서 클릭->'신청'버튼 클릭 후 신청 완료
 - ![image](https://user-images.githubusercontent.com/63538097/136648660-d017c3b0-6dd6-49c4-b6fc-19ab9e1eed0b.png)
 - ![image](https://user-images.githubusercontent.com/63538097/136648687-0a76075d-286e-4096-901b-f9b3071978fa.png)
 - ![image](https://user-images.githubusercontent.com/63538097/136648705-48e2b88d-d2a4-4930-8b4e-efca76f367fc.png)
* [관리자 페이지] 
 - 관리자 페이지에서 총 도서 수/대출%연체 중인 도서 수/그룹 회원 수 확인 및 클릭시 상세 정보 확인
 - ![image](https://user-images.githubusercontent.com/63538097/136648751-0220cc7b-7dd8-4118-b1c6-e362ab48d3ed.png)
 - ![image](https://user-images.githubusercontent.com/63538097/136648831-7458c3b6-ac49-40f4-ac37-e06f0ec07938.png)











 
## 팀 정보 (Team Information)
- jung ji hyeok (jhjung9759@gmail.com), Github Id: jhCOR
- kim jeong ho (suji999@gmail.com), Github Id: suji999

## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.

※ [라이선스 비교표(클릭)](https://olis.or.kr/license/compareGuide.do)

※ [Github 내 라이선스 키워드(클릭)](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/licensing-a-repository)

※ [\[참조\] Github license의 종류와 나에게 맞는 라이선스 선택하기(클릭)](https://flyingsquirrel.medium.com/github-license%EC%9D%98-%EC%A2%85%EB%A5%98%EC%99%80-%EB%82%98%EC%97%90%EA%B2%8C-%EB%A7%9E%EB%8A%94-%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0-ae29925e8ff4)
