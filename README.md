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
* node버전 10이상
## 기술 스택 (Technique Used) 
### Server(back-end)
 - <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/></a>
 - <img src="https://img.shields.io/badge/mongoDB-003545?style=for-the-badge&logo=mongoDB&logoColor=white">
 - <img src="https://img.shields.io/badge/express-339933?style=for-the-badge&logo=express&logoColor=white">
 
### Front-end
 - 	ejs, HTML5, CSS3, Vue.js
 - <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> 
 - <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
 - <img src="https://img.shields.io/badge/ejs-4FC08D?style=for-the-badge&logo=ejs&logoColor=white">
 - <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
 - <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
 - <img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white">


## 설치 안내 (Installation Process)
로컬에서 테스트 하려는 경우

```bash
mongod
```

```bash
$ git clone git https://github.com/osamhack2021/Web_DigitalOfPages_kukgicjobs.git
$ npm install
$ npm start
```
서버에서 서비스 하려는 경우(세번째 줄에서 -i 뒤의 숫자는 컴퓨팅 자원에 따라 상이, --name은 선택사항이며 dop는 임의로 정한 이름)
1. 몽고디비 실행(data폴더 위치에 따라 --dbpath위치는 상이, 아래의 경로는 workspace 바로 아래 data폴더와 본 프로게트 폴더가 있는 상황을 가정함;)
```bash
mongodb --dbpath data
```
2. 서버 실행
```bash
$ git clone git https://github.com/osamhack2021/Web_DigitalOfPages_kukgicjobs.git
$ npm install
$ pm2 start app.js -i 10 --name dop
```

## 프로젝트 사용법 (Getting Started)



## 팀 정보 (Team Information)
- jung ji hyeok (jhjung9759@gmail.com), Github Id: jhCOR
- kim jeong ho (suji999@gmail.com), Github Id: suji999

## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osamhack2021/Web_DigitalOfPages_kukgicjobs/blob/main/LICENSE.md)


