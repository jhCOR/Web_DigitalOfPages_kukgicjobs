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


