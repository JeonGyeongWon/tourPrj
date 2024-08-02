package tour.cm.service.impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tour.cm.ConnUtil;
import tour.cm.ConvertUtil;
import tour.cm.StringUtil;
import tour.cm.service.OpenServiceApi;

@Service("OpenApiServiceImpl")
@Primary
public class OpenApiServiceImpl implements OpenServiceApi{

	@Resource(name = "convertutil")
	private ConvertUtil convertUtil;
	
	@Resource(name = "connUtil")
	private ConnUtil connUtil;
	
	
    @Value("${Globals.openData.endPoint}")
	private String openDataUrl;
	
	@Value("${Globals.openData.secretkey}")
	private String openDataSecretKey;
	
	@Override
	public Object getOpenData(Map map)   {
		
		LocalDateTime today = LocalDateTime.now();
		DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyyMMdd");		
		String batchDt = today.format(formatter1);
		
		StringBuilder sb = new StringBuilder();
			int totCnt = 0;
			Map resMap = null;
				try {
					// 1. URL을 만들기 위한 StringBuilder. type은 각 openData 종류를 의미함
					
					String chkUrl = StringUtil.nullConvert(map.get("chkUrl"));
					
					StringBuilder urlBuilder = new StringBuilder(openDataUrl + chkUrl); /*URL*/
			        // 2. 오픈 API의요청 규격에 맞는 파라미터 생성, 발급받은 인증키.
					
					/*공통항목*/
			        urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + openDataSecretKey); /*Service Key*/
			        urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*XML 또는 JSON*/
			        urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); /*OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)*/
			        urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8")); /*서비스명(어플명)*/
			        
			        String numOfRows = StringUtil.nullConvert(map.get("numOfRows"));
			        String pageNo = StringUtil.nullConvert(map.get("pageNo"));
					String listYn = StringUtil.nullConvert(map.get("listYn"));
					String arrange = StringUtil.nullConvert(map.get("arrange"));
					String contentId= StringUtil.nullConvert(map.get("contentId"));
					String contentTypeId = StringUtil.nullConvert(map.get("contentTypeId"));
					String areaCode = StringUtil.nullConvert(map.get("areaCode"));
			        
					switch(chkUrl) {
					
					// 1. 위치기반 관광정보 조회
					case "/locationBasedList1":

						urlBuilder.append("&" + URLEncoder.encode("listYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*목록구분(Y=목록, N=개수)*/
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
				        urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode("A", "UTF-8")); /*정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)*/
				        urlBuilder.append("&" + URLEncoder.encode("mapX","UTF-8") + "=" + URLEncoder.encode("126.981611", "UTF-8")); /*GPS X좌표(WGS84 경도좌표)*/
				        urlBuilder.append("&" + URLEncoder.encode("mapY","UTF-8") + "=" + URLEncoder.encode("37.568477", "UTF-8")); /*GPS Y좌표(WGS84 위도좌표)*/
				        urlBuilder.append("&" + URLEncoder.encode("radius","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*거리반경(단위:m) , Max값 20000m=20Km*/
				        urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode("15", "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
				        urlBuilder.append("&" + URLEncoder.encode("modifiedtime","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*수정일(형식 :YYYYMMDD)*/
					
				        break;
				        
				     // 2. 키워드 검색 조회
					case "/searchKeyword1":
						
						urlBuilder.append("&" + URLEncoder.encode("listYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*목록구분(Y=목록, N=개수)*/
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
				        urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode("A", "UTF-8")); /*정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)*/
				        urlBuilder.append("&" + URLEncoder.encode("keyword","UTF-8") + "=" + URLEncoder.encode("강원", "UTF-8")); /*검색요청할키워드 : (국문=인코딩필요) 샘플 - 강원*/
				        urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode("15", "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
					
				        break;
				    
				     // 3. 행사정보 조회
					case "/searchFestival1":
						
						urlBuilder.append("&" + URLEncoder.encode("listYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*목록구분(Y=목록, N=개수)*/
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
				        urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode("A", "UTF-8")); /*정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)*/
				        urlBuilder.append("&" + URLEncoder.encode("eventStartDate","UTF-8") + "=" + URLEncoder.encode("20170901", "UTF-8")); /*행사시작일(형식 :YYYYMMDD)*/
					
				        break;
				     // 4. 숙박정보 조회
					case "/searchStay1":
						
						urlBuilder.append("&" + URLEncoder.encode("listYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*목록구분(Y=목록, N=개수)*/
						//urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode(numOfRows, "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
				        urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode("A", "UTF-8")); /*정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)*/
				      
						break;
					
					//5. 공통정보 조회
					case "/detailCommon1":
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
						//urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode("126508", "UTF-8")); /*콘텐츠ID*/
						urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode(contentId, "UTF-8")); /*콘텐츠ID*/
				        //urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode("12", "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
				        urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode(contentTypeId, "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
				        urlBuilder.append("&" + URLEncoder.encode("defaultYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*기본정보조회여부( Y,N )*/
				        urlBuilder.append("&" + URLEncoder.encode("firstImageYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*원본, 썸네일대표 이미지, 이미지 공공누리유형정보 조회여부( Y,N )*/
				        urlBuilder.append("&" + URLEncoder.encode("areacodeYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*지역코드, 시군구코드조회여부( Y,N )*/
				        urlBuilder.append("&" + URLEncoder.encode("catcodeYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*대,중,소분류코드조회여부( Y,N )*/
				        urlBuilder.append("&" + URLEncoder.encode("addrinfoYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*주소, 상세주소조회여부( Y,N )*/
				        urlBuilder.append("&" + URLEncoder.encode("mapinfoYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*좌표X, Y 조회여부( Y,N )*/
				        urlBuilder.append("&" + URLEncoder.encode("overviewYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*콘텐츠개요조회여부( Y,N )*/
				        
				        break;
				        
				      //6. 소개정보조회
					case "/detailIntro1":
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
						//urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode("2674675", "UTF-8")); /*콘텐츠ID*/
						urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode(contentId, "UTF-8")); /*콘텐츠ID*/
				        //urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode("15", "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
				        urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode(contentTypeId, "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
				        
				        break;  
				    
				        //7. 반복정보조회
					case "/detailInfo1":
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
						//urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode("2674675", "UTF-8")); /*콘텐츠ID*/
						urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode(contentId, "UTF-8")); /*콘텐츠ID*/
				        //urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode("15", "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
				        urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode(contentTypeId, "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
				        
				        break;
				       
				      //8. 이미지 정보 조회
					case "/detailImage1":
						//urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						//urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode(numOfRows, "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8")); /*페이지 번호*/
						//urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode("1095732", "UTF-8")); /*콘텐츠ID*/
						urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode(contentId, "UTF-8")); /*콘텐츠ID*/
				        urlBuilder.append("&" + URLEncoder.encode("imageYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*이미지조회1 : Y=콘텐츠이미지조회 N=”음식점”타입의음식메뉴이미지*/
				        urlBuilder.append("&" + URLEncoder.encode("subImageYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*이미지조회2 : Y=원본,썸네일이미지조회,공공누리 저작권유형정보조회 N=Null*/
				        
				        break;
				      
				      //9 관광정보 동기화 목록 조회
					case "/areaBasedSyncList1":
						urlBuilder.append("&" + URLEncoder.encode("listYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*목록구분(Y=목록, N=개수)*/
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
						urlBuilder.append("&" + URLEncoder.encode("showflag","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*컨텐츠표출여부(1=표출, 0=비표출)*/
				        urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode("A", "UTF-8")); /*정렬 구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가 반드시 있는 정렬 (O=제목순, Q=수정일순, R=생성일순)*/
				        urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode("15", "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
				        urlBuilder.append("&" + URLEncoder.encode("areaCode","UTF-8") + "=" + URLEncoder.encode("4", "UTF-8")); /*지역코드(지역코드조회 참고)*/
				        urlBuilder.append("&" + URLEncoder.encode("sigunguCode","UTF-8") + "=" + URLEncoder.encode("4", "UTF-8")); /*시군구코드(지역코드조회 참고)*/
					    
				        break;
				        
				      //10 지역코드조회
					case "/areaCode1":
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("20", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
//				        urlBuilder.append("&" + URLEncoder.encode("areaCode","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*지역코드(지역코드조회 참고)*/
					    
				        break;
				        
				      //11 반려동물 동반 여행 정보
					case "/detailPetTour1":
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
						urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode("125534", "UTF-8")); /*콘텐츠ID(옵션,미기입시 전체목록조회)*/
				        
				        break;
				        
				        //12 서비스 분류 코드 조회
					case "/categoryCode1":
						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
						urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode("12", "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
						urlBuilder.append("&" + URLEncoder.encode("cat1","UTF-8") + "=" + URLEncoder.encode("A01", "UTF-8")); /*대분류코드*/
						urlBuilder.append("&" + URLEncoder.encode("cat2","UTF-8") + "=" + URLEncoder.encode("A0101", "UTF-8")); /*중분류코드*/
						urlBuilder.append("&" + URLEncoder.encode("cat3","UTF-8") + "=" + URLEncoder.encode("A01010100", "UTF-8")); /*소분류코드*/
						     
				        break;  
				        
				      //13 지역기반 관광정보조회
					case "/areaBasedList1":
						
						urlBuilder.append("&" + URLEncoder.encode("listYN","UTF-8") + "=" + URLEncoder.encode(listYn, "UTF-8")); /*목록구분(Y=목록, N=개수)*/
//						urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한페이지결과수*/
						urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8")); /*페이지 번호*/
						urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode(arrange, "UTF-8")); /*정렬 구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가 반드시 있는 정렬 (O=제목순, Q=수정일순, R=생성일순)*/
					    urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode(contentTypeId, "UTF-8")); /*관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID*/
					    urlBuilder.append("&" + URLEncoder.encode("areaCode","UTF-8") + "=" + URLEncoder.encode(areaCode, "UTF-8")); /*지역코드(지역코드조회 참고)*/
//				        urlBuilder.append("&" + URLEncoder.encode("sigunguCode","UTF-8") + "=" + URLEncoder.encode("4", "UTF-8")); /*시군구코드(지역코드조회 참고)*/
//				        urlBuilder.append("&" + URLEncoder.encode("cat1","UTF-8") + "=" + URLEncoder.encode("B02", "UTF-8")); /*대분류코드*/
//						urlBuilder.append("&" + URLEncoder.encode("cat2","UTF-8") + "=" + URLEncoder.encode("B0201", "UTF-8")); /*중분류코드*/
//						urlBuilder.append("&" + URLEncoder.encode("cat3","UTF-8") + "=" + URLEncoder.encode("B02010100", "UTF-8")); /*소분류코드*/
//						urlBuilder.append("&" + URLEncoder.encode("modifiedtime","UTF-8") + "=" + URLEncoder.encode("20220721", "UTF-8")); /*수정일(형식 :YYYYMMDD)*/
						         
				        break;   
					}
			        
			        
			        // 3. URL 객체 생성.
			        URL url = new URL(urlBuilder.toString());
			        // 4. 요청하고자 하는 URL과 통신하기 위한 Connection 객체 생성.
			        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			        // 5. 통신을 위한 메소드 SET.
			        conn.setRequestMethod("GET");
			        // 6. 통신을 위한 Content-type SET. 
			        conn.setRequestProperty("Content-type", "application/json");
			        // 7. 통신 응답 코드 확인.
			        System.out.println("Response code: " + conn.getResponseCode());
			        // 8. 전달받은 데이터를 BufferedReader 객체로 저장.
			        BufferedReader rd;
			        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
			            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			        } else {
			            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			        }
			        // 9. 저장된 데이터를 라인별로 읽어 StringBuilder 객체로 저장.
			        
			        String line;
			        while ((line = rd.readLine()) != null) {
			            sb.append(line);
			        }
			        
			        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
			        
			        System.out.println(sb);
			        
			        
			        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
			        // 10. 객체 해제.
			        rd.close();
			        conn.disconnect();
			        
//			        resMap = convertUtil.JsonToMap(sb.toString());
			        
			        
				} catch (Exception e) {
					e.printStackTrace();
				}

		
			return sb.toString();
	}
}
