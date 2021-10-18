# 오늘, SNS를 재정의 하다.  **Digital Of Pages**
![image](https://user-images.githubusercontent.com/63538097/137712008-fd233981-27ab-4179-97bb-746b95767ba4.png)


 
## 소개
Digital Of Pages는 기존에 규모가 작은 부대 도서관들에서 별도의 도서 관리 체계가 없이 도서를 관리함으로써 발생하는 불편함을 해소하기 위한 서비스입니다. 도서 관리 체계의 부재로 수기로 명부를 적는 방식을 사용하는데 이 경우 도난, 장기 미반납에 대응할 수 없는 문제점이 많아 장병들의 독서 의지를 저하시켜 왔습니다. 또한 도서가 있는데도 몇번이고 같은 책을 받아 쌓아놓는 경우도 빈번하여 불필요한 예산 집행이 심각했습니다. 이 같은 무제를 해결하기 위해 규모나 예산에 구애받지 않고 모두가 쉽게 각자의 도서 관리 체계를 구축할 수 있는 서비스가 필요하다고 판단하였습니다.
한 편 각 부대들이 완전히 독립된 도서관을 구축한다면 장병과 부대에 큰 부가가치를 제공하기 어렵습니다. 리뷰와 같은 사용자의 산출물의 양이 적을 뿐만 아니라 같은 대한민국 군인이라는 공통된 소속의 시너지 효과를 이용하지 못합니다. 이 같은 제약사항을 SNS와의 결합을 통해 규모의 시너지 효과를 충분히 이용할 수 있도록 보완하였습니다.

## 기능 설명
<table>
    <tr>
        <td width="50%">
            <img src="https://user-images.githubusercontent.com/63538097/137720442-ffc2033a-fd6e-4323-9843-372d1ef2c653.gif">
        </td>
        <td width="50%">
            <img src="https://user-images.githubusercontent.com/63538097/137721968-1584115c-51cd-49af-bd56-c47b37aa4ba8.gif">
        </td>
    </tr>
    <tr>
        <td align="center">
          로그인</a>
        </td>
        <td align="center">
           프로필 화면</a>
        </td>
    </tr>
</table>

- **로그인** 로그인시 관리자/일반 유저로 가입하며 관리자는 소속 부대를 직접 기입할 수 있고 일반 유저는 검색 후 선택할 수 있습니다.
- **프로필 화면** 프로필 화면에서 프로필 사진 설정, 메세지 보내기 및 확인 도서 대출 이력과 리뷰 이력 등 다양한 정보를 확인할 수 있습니다.
<table>
    <tr>
        <td width="50%">
            <img src="https://user-images.githubusercontent.com/63538097/137722992-63592ff2-bb79-4598-a73d-4f04db97dfb4.gif">
        </td>
        <td width="50%">
            <img src="https://user-images.githubusercontent.com/63538097/137723721-a02b4d5d-9835-43d9-b9a7-d219fcf24693.gif">
        </td>
    </tr>
    <tr>
        <td align="center">
           메인화면 및 독서 발자취</a>
        </td>
        <td align="center">
          도서 대출/이 책을 읽은 사람/도서 추천</a>
        </td>
    </tr>
</table>

- 메인화면에서 메세지,공지사항 새로 들어온 도서, 대출중인 도서 목록을 확인할 수 있으며 상단의 뉴스 아이콘을 선택하면 친구 추가가 된 유저의 독서 발자취 소식이 뜹니다!<br>
 
- **독서 발자취란?** 독서발자취는 도서와 관련된 다양한 게시물들을 올리는 기능입니다. 도서 대출화면에서 확인 가능한 리뷰와는 별개로 도서 추천 글, 도서 관련 토론 주제 게시, 독서 일기등을 자유롭게 게시할 수 있습니다.
- **도서 대출**
- 도서 대출 화면에서 도서를 대출하면 상단에 읽은 사람 목록에 노출됩니다. 이를 통해 해당 도서를 어떤 친구들이 읽었는지 확인할 수 있습니다.
- 리뷰 작성 기능의 경우 isbn을 공유하는 도서는 그룹(부대)와 상관없이 리뷰를 공유하여 작은 부대의 작은 도서관의 경우 리뷰의 수가 적을 수 밖에 없는 문제를 '군인'이라는 집단의 시너지를 발휘하도록 구성되어있습니다.
- 도서 추천 기능은 친구목록이 스피너로 노출되어 해당 아이템을 선택하여 쉽게 도서 추천 메세지를 보낼 수 있습니다. 

<table>
    <tr>
        <td width="50%">
            <img src="https://user-images.githubusercontent.com/63538097/137725706-9bae175c-3ae6-4d0e-946a-a1d0601ec1c4.gif">
        </td>
        <td width="50%">
            <img src="https://user-images.githubusercontent.com/63538097/137726873-987385d0-eed2-4783-a832-bacaa920f535.gif">
        </td>
    </tr>
    <tr>
        <td align="center">
           도서 신청/ 도서 신청 목록(관리자 계정)</a>
        </td>
        <td align="center">
          관리자 페이지</a>
        </td>
    </tr>
</table>

- **도서 신청** 도서 신청 메뉴를 누르면 제목 및 ISBN을 입력하여 원하는 도서를 신청할 수 있습니다. 네이버 API를 사용하여 도서 신청 내용이 자동 완성됩니다.
- **도서 신청 목록** 도서 신청 목록 화면에서 신청이 수락되었는지 비치되었는지 확인할 수 있습니다. **관리자 계정**의 경우에만 수락/배치 완료 버튼이 노출됩니다
- **관리자 페이지** 관리자 페이지에서 그룹원 수, 대출/연체 중인 도서 수 및 목록을 확인할 수 있습니다. 도서 등록 공지사항 등록등의 기능에 접근할 수 있습니다.

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상
* node버전 10이상
## 기술 스택 (Technique Used) 
### Server(back-end)

 <table> 
  <td>
   <div align="center"><img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/><br>Node.js</div>
  </td>
  <td>
   <div align="center"> <img src="https://img.shields.io/badge/mongoDB-003545?style=for-the-badge&logo=mongoDB&logoColor=white"><br>MongoDB</div>
  </td>
  <td>
   <div align="center"> <img src="https://img.shields.io/badge/express-339933?style=for-the-badge&logo=express&logoColor=white"><br>Express</div>
  </td>
</table>

### Front-end
 <table>
  <td>
   <div align="center"><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <br>HTML5</div>
  </td>
  <td>
   <div align="center"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/><br>CSS3</div>
  </td>
  <td>
   <div align="center"> <img src="https://img.shields.io/badge/ejs-4FC08D?style=for-the-badge&logo=ejs&logoColor=white"><br>ejs</div>
  </td>
   <td>
    <div align="center"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/><br>JavaScript</div>
  </td>
  <td>
   <div align="center"><img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"><br>bootstrap</div>
  </td>
  <td>
   <div align="center"><img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white"><br>vue.js</div>
  </td>  
 <td>
   <div align="center"><img src="https://img.shields.io/badge/semantic-4FC08D?style=for-the-badge&logo=semantic&logoColor=white"><br>vue.js</div>
  </td>
</table>

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

 <table>
  <td>
   <div align="center">정지혁
  </td>
  <td>
    <img src="https://img.shields.io/badge/Github-jhCOR-black"/></div>
  </td>
   <td>
   팀장,프런트 엔드, 벡엔드, 기획
  </td>
   <td>
     <img src="https://img.shields.io/badge/Gmail-jhjung9759%40gmail.com-blue"/></div>
  </td>
</table>

 <table>
  <td>
   <div align="center">김정호
  </td>
  <td>
    <img src="https://img.shields.io/badge/Github-hou27-black"/></div>
  </td>
   <td>
   프런트 엔드, 벡엔드
  </td>
</table>
## 저작권 및 사용권 정보 (Copyleft / End User License)<br>
* [MIT] (https://github.com/osamhack2021/Web_DigitalOfPages_kukgicjobs/blob/main/LICENSE.md)


