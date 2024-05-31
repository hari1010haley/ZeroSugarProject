목차
개요
Skills
Installation
API Documents
프로젝트 및 이슈관리
Authors
References

📖 개요
현재 회원님 위주의 관리 시스템으로서 회원관리를 용이하게 하며 재등록날짜가 다가오는 회원님을 볼 수 있습니다. 
> 목적
> 1. 기존에 사용하던 studiomate 유료 회원관리 사이트에서는 회원을 일일이 상세보기하여 만료일을 확인하고 리스트화해야하는 번거로움이 있었다. 따라서 현재 회원위주의 등록,조회,수정 시스템을 구축한다.
> 2. 웹브라우저에서 검색해서 들어가는 관리자페이지를 메인페이지에 한데 모아 연결한다.  

주요기능
<단일 Member table로 관리위주의 웹>
1. 회원 등록 시에 Strict TypeForm 보다는 String 으로 Data를 받아 등록,수정이 빠르고 편리
2. remDays는 멤버리스트 조회시에 data 저장하기 보다는 LocalDate와, 저장된 endDate를 이용하여 화면상에 보이게끔 처리
3. 회원 등록 폼 최소화: 만료일을 보는것이 주 목적으로 이름, 나이, 핸드폰번호, 등록일, 만료일 정보로 회원등록 -> 성별, 주소는 의도적 제외
<재등록멤버확인 가능>
1. 현재날짜 기준 만료일이 15일 전후안에 있는 경우 재등록멤버 버튼에서 list로 확인 가능
2. 서비스측면에서 더 정확한 재등록 관리를 위해 재등록여부, 재등록 횟수 Colomn 추가
<관리를 위한 관리자 페이지 nav바에 연결>
1. 인스타그램, 네이버스마트플레이스, 카카오페이지 연동 


추후기능
1. 재등록 임박멤버 팝업기능(모달, 만료날짜 5일내외기준)
2. TodoList 기능추가
3. 게시판 기능 추가 -> 업무 소통 tool로 활용가능성 


Skills
> Spring-Boot  Java  JavaScript
> Vite  Node.js  React
> H2  Docker 


Installation
[spring.io] 
  gradle, thyneleaf 의존성 설정
[Vite+React]
npm install -g create-vite
create-vite my-react-app --template react
cd my-react-app
npm run dev
npm run build
cp -r build/* path/to/spring-boot-project/src/main/resources/static/
[H2 connection]
bin % ./h2.sh
[Docker]
docker compose -f "docker-compose.yml" up -d --build


API Documents


프로젝트 및 이슈관리
1. remDays type 설정과 데이터 처리여부 결정
2. expireMembersBetweenDates 로직 처리
3. React build 후 SpringBoot와 통합연결
4. 배포

Authors
김하림	@hari1010haley	rlagkfla09@gmail.com


References
참조사이트: None.
개선을 위한 사이트: www.studiomate.co.kr 


🔗 배포 링크 : www.healingcare.co.kr

🗓️ 2024.05-.01 - 2024.05.31
📑 PPT
🖥️ 프로젝트 시연영상
메인화면 
회원조회 
업데이트 
재등록멤버확인 
