# 모두의 SNS 도서관.  **Digital Of Pages**
![image](https://user-images.githubusercontent.com/63538097/137712008-fd233981-27ab-4179-97bb-746b95767ba4.png)


## 소개 :bell:
Digital Of Pages는 기존에 규모가 작은 부대 도서관들에서 별도의 도서 관리 체계가 없이 도서를 관리함으로써 발생하는 불편함을 해소하기 위한 서비스입니다.<br><br>
규모나 예산에 구애받지 않고 모두가 쉽게 각자의 도서 관리 체계를 구축할 수 있도록 지원합니다.<br>
또한 각 부대들이 완전히 독립된 도서관을 구축한다면 장병과 부대에 큰 부가가치를 제공하기 어렵습니다. 리뷰와 같은 사용자의 산출물의 양이 적을 뿐만 아니라 같은 대한민국 군인이라는 공통된 소속의 시너지 효과를 이용하지 못합니다.<br>
Digital Of Pages는 SNS와의 결합을 통해 군인 전체 규모의 시너지 효과를 충분히 이용할 수 있습니다.

## 개발 배경 :heavy_check_mark:
![image](https://user-images.githubusercontent.com/63538097/137742129-167f28ad-0527-4ce7-9378-721a0c531262.png)<br>
[출처] https://www.yna.co.kr/view/AKR20140311186100004<br>
![image](https://user-images.githubusercontent.com/63538097/137744192-4bd1f313-fe52-48fa-a69d-103e3b659624.png)<br>
[출처] https://www.fnnews.com/news/201611151731398703<br><br>

현재 부대 내 도서관은 위의 사례와 같이 7개월간 200여권을 절도할 동안 아무도 대응할 수 없었습니다. 나중에라도 발각이 되면 다행이지만 현재 확인을 할 수 없는 상황이 대다수이며, 장기 미반납의 경우는 손쓰기도 힘든 상황입니다.
더 나아가 장병들이 선호하는 도서가 어떤 종류인지에 대한 소중한 데이터들이 수기로 기록되므로 아무런 관심도 받지 못하고 있습니다. 병영도서관의 개선을 위해 장병들이 어떠한 도서를 선호하고 자주 대출하는지에 대한 데이터들을 효과적이고 철저하게 수집할 필요가 있습니다. 또한 기존의 도서관 프로그램이나 서점의 사이트들은 인공지능을 통해 수치적인 분석만을 제공하여 책을 추천하는 것으로 서비스는 끝입니다. 따라서 인스타그램이나 페이스북등의 SNS에서 좋은 책들을 서로 추천하거나 공유하고 82년생 김지영, 공정하다는 착각 등 화제가 되는 책들에 대한 사람들의 대화의 장이 열려왔습니다. 하지만 광고성 게시글이거나 특정한 목적이 없는 SNS 특성상 도서에 대한 대화 이외의 목적을 가지고 대화에 참여하는 경우가 빈번하여 소통의 성격이 변질됩니다.

## 기능 소개 :clipboard:
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
          로그인
        </td>
        <td align="center">
           프로필 화면
        </td>
    </tr>
</table>

- **로그인** 로그인시 관리자/일반 유저로 가입하며 관리자는 소속 부대를 직접 기입할 수 있고 일반 유저는 검색 후 선택할 수 있습니다.
- **프로필 화면** 프로필 화면에서 프로필 사진 설정, 메세지 보내기 및 확인 도서 대출 이력과 리뷰 이력 등 다양한 정보를 확인할 수 있습니다.
<br>
<br>
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
           메인화면 및 독서 발자취
        </td>
        <td align="center">
          도서 대출/이 책을 읽은 사람/도서 추천
        </td>
    </tr>
</table>

- 메인화면에서 메세지,공지사항 새로 들어온 도서, 대출중인 도서 목록을 확인할 수 있으며 상단의 뉴스 아이콘을 선택하면 친구 추가가 된 유저의 독서 발자취 소식이 뜹니다!<br>
 
- **독서 발자취란?** 독서발자취는 도서와 관련된 다양한 게시물들을 올리는 기능입니다. 도서 대출화면에서 확인 가능한 리뷰와는 별개로 도서 추천 글, 도서 관련 토론 주제 게시, 독서 일기등을 자유롭게 게시할 수 있습니다.
- **도서 대출** 장병들의 핸도폰에서 QRcode가 뜨면 이를 도서관의 QR코드 리더기에 갖다대어 대출을 진행합니다. 위의 이미지에는 QR리더기를 구비하지 못해 대출 버튼을 별도로 만들어 대출처리를 진행하였습니다. 
- **이 책을 읽은 사람들** 도서 대출 화면에서 도서를 대출하면 상단에 읽은 사람 목록에 노출됩니다. 이를 통해 해당 도서를 어떤 친구들이 읽었는지 확인할 수 있습니다.
- **리뷰 작성 기능** 리뷰 작성 기능의 경우 isbn을 공유하는 도서는 그룹(부대)와 상관없이 리뷰를 공유하여 작은 부대의 작은 도서관의 경우 리뷰의 수가 적을 수 밖에 없는 문제를 '군인'이라는 집단의 시너지를 발휘하도록 구성되어있습니다.
- **도서 추천 기능** 도서 추천 기능의 경우 친구목록이 스피너로 노출되어 해당 아이템을 선택하여 쉽게 도서 추천 메세지를 보낼 수 있습니다. 
 
<br>
<br>
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
           도서 신청/ 도서 신청 목록(관리자 계정)
        </td>
        <td align="center">
          관리자 페이지
        </td>
    </tr>
</table>

- **도서 신청** 도서 신청 메뉴를 누르면 제목 및 ISBN을 입력하여 원하는 도서를 신청할 수 있습니다. 네이버 API를 사용하여 도서 신청 내용이 자동 완성됩니다.
- **도서 신청 목록** 도서 신청 목록 화면에서 신청이 수락되었는지 비치되었는지 확인할 수 있습니다. **관리자 계정**의 경우에만 수락/배치 완료 버튼이 노출됩니다
- **관리자 페이지** 관리자 페이지에서 그룹원 수, 대출/연체 중인 도서 수 및 목록을 확인할 수 있습니다. 도서 등록 공지사항 등록등의 기능에 접근할 수 있습니다.
<br>
<table>
    <tr>
        <td width="50%">
            <img src="https://user-images.githubusercontent.com/63538097/137729032-a92129ed-6f70-42b4-a400-562dff1e3e32.gif">
        </td>
        <td width="50%">
            <img src="https://user-images.githubusercontent.com/63538097/137728362-d80f4cff-cd4c-46cb-ae61-d3ce36ed81b3.gif">
        </td>
    </tr>
    <tr>
        <td align="center">
           독서 발자취
        </td>
        <td align="center">
          메세지 확인(도서 추천 메세지 등)
        </td>
    </tr>
</table>



## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites) :heavy_exclamation_mark:
* ECMAScript 6 지원 브라우저 사용해야 정상적으로 이용할 수 있습니다.
* Google Chrome 버젼 77 이상을 권장합니다.
* node버전 12이상

## 기술 스택 (Technique Used) :black_medium_square:
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
   <div align="center"><img src="https://img.shields.io/badge/semantic-4FC08D?style=for-the-badge&logo=semantic&logoColor=white"><br>semantic</div>
  </td>
</table>

### API
네이버 검색 API

## 프로젝트 구조 안내
Front-End 관련 폴더 : Web_DigitalOfPages_kukgicjobs 폴더 내의 public, views

Back-End 관련폴더 : Web_DigitalOfPages_kukgicjobs 폴더 내의 database, routes, routesFunc, utils폴더


## 설치 안내 (Installation Process) :pencil2:

```bash
$ git clone git https://github.com/osamhack2021/Web_DigitalOfPages_kukgicjobs.git
cd Web_DigitalOfPages_kukgicjobs
$ npm install
```

## 프로젝트 사용법 (Getting Started) :pencil2:
네이버 API가 사용되었으므로 .env파일을 실행전 수정해야합니다.
https://developers.naver.com/apps/#/register
상기의 화면에서 애플리케이션을 등록한 후 id,passward를 받아 .env에 넣어주세요.
```
ID="발급받은 id"
PW="발급받은 passward"
```

###로컬에서 실행하는 경우(LocalTestVersion branch로 진행 https://github.com/osamhack2021/Web_DigitalOfPages_kukgicjobs/tree/LocalTestVersion):<br>
```bash
mongod(Web_DigitalOfPages_kukgicjobs디렉터리 밖에서 실행)
```
```bash
npm start(Web_DigitalOfPages_kukgicjobs디렉터리 내에서 명령어 실행)
```
 
## 기대효과
본 서비스를 통해 전국의 각 부대의 도서관은 추가적인 예산의 집행이나 별도의 장비 구비없이 도서 관리 체계를 운용할 수 있습니다. 따라서 도서의 도난 및 장기 미반납에 대응하고 도서 현황을 파악하여 중복된 도서의 구매를 미연에 방지할 수 있습니다. 뿐만 아니라 도서관의 경우 장병들의 독서 문화에 대한 데이터를 획득할 수 있으므로 병영도서관 개선시에 어떠한 장르 어떠한 내용의 도서를 구비할지 결정하는데 도움을 받을 수 있습니다. SNS 기능의 접목으로 인공지능의 예측에서 더 나아가 화제 및 이슈가 되고 장병들의 관심을 끄는 도서관으로 발전하여 장병들의 도서 선호도에 대한 데이터를 더 풍부하게 얻을 수 있음과 동시에 장병들의 독서 의지를 크게 향상시킬 것으로 기대됩니다. <br><br>
장병들의 경우 목록상에는 있으나 도서관에는 찾는 도서가 없어서 독서를 포기하는 일이 줄어들것 입니다. 뿐만아니라 SNS기능상에서 친구의 추천이나 친구의 독사 발자취등으로 인해 다양한 도서가 노출되어 자연스레 독서에 대해 관심을 갖게 될 것입니다.

## 발전가능성 및 확장성
본 프로젝트는 QR코드로 대출 및 반납을 진행하도록 제작되었습니다. 다만 QR코드로 대출하는 기능자체가 도서의 도난을 추후 적발하는데 유용하지만 원천차단할 수는 없습니다. 이에 CCTV에 인공지능을 접목하는 방법을 더헤볼 수 있습니다. 책을 책장에서 꺼내고 도서관을 나가는 것을 인식하도록 학습한 후 중간에 QR신호가 들어오면 정상적인 대출, 들어오지 않는다면 대출 오류 및 도난으로 판단하여 해당 시간대의 영상을 보고하도록 확장된 기능을 추가한다면 더욱 철저한 도서 관리 체계를 완성할 수 있을 것입니다.

## 팀 정보 (Team Information) :office:

 <table>
  <td>
   <div align="center">정지혁
  </td>
  <td>
    <img src="https://img.shields.io/badge/Github-jhCOR-black"/>
  </td>
   <td>
   팀장,프런트 엔드, 벡엔드, 기획
  </td>
   <td>
     <img src="https://img.shields.io/badge/Gmail-jhjung9759%40gmail.com-blue"/>
  </td>
</table>

 <table>
  <td>
   <div align="center">김정호
  </td>
  <td>
    <img src="https://img.shields.io/badge/Github-hou27-black"/>
  </td>
   <td>
   프런트 엔드, 벡엔드
  </td>
</table>
 <table>
  <td>
   <div align="center">양재훈
  </td>
  <td>
    <img src="https://img.shields.io/badge/Github-crazybirdz-black"/>
  </td>
   <td>
  프런트 엔드
  </td>

</table>

## 저작권 및 사용권 정보 (Copyleft / End User License)<br>
* [MIT] (https://github.com/osamhack2021/Web_DigitalOfPages_kukgicjobs/blob/main/LICENSE.md)


