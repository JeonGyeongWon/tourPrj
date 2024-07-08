package tour.cm;

import java.io.Reader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibatis.common.resources.Resources;

@Repository("convertutil")
public class ConvertUtil {
	/**
     * <pre>
     * 1. 개요 : Map데이터를 JSON으로 변환한다.
 	 * 2. 처리내용 : Map데이터를 JSON으로 변환한다.
     * </pre>
     * @Method Name : mapToJson
     * @date : 2023. 10. 30
     * @author : gwjeon
     * @history : 
     *	-----------------------------------------------------------------------
     *	변경일				작성자						변경내용 
     *	----------- ------------------- ---------------------------------------
     *	2023. 11. 08		gwjeon				최초 작성 
     *	-----------------------------------------------------------------------
     */
	
	 public String mapToJson(Map map) {
		   
		   String result = "";
		   HashMap errorMap = new HashMap();
		   try{
			   result = JSONObject.toJSONString(map);
		   }catch(Exception e) {
			   e.printStackTrace();
			   result = JSONObject.toJSONString(errorMap);
		   }
		   
		   return result;
	}
	 
	 /**
     * <pre>
     * 1. 개요 : List데이터를 JSON으로 변환한다.
 	 * 2. 처리내용 : List데이터를 JSON으로 변환한다.
     * </pre>
     * @Method Name : ListToJson
     * @date : 2023. 11. 09
     * @author : gwjeon
     * @history : 
     *	-----------------------------------------------------------------------
     *	변경일				작성자						변경내용 
     *	----------- ------------------- ---------------------------------------
     *	2023. 11. 09		gwjeon				최초 작성 
     *	-----------------------------------------------------------------------
     */
	
	 public JSONArray ListToJson(List<Map<String,Object>> listMap) {
		   
		   JSONArray jsonArray = null;
		   
		   try{
			   jsonArray = new JSONArray();
			   for(Map map: listMap) {
				   jsonArray.add(mapToJson(map));
			   }
		   }catch(Exception e) {
		   }
		   
		   return jsonArray;
	}
	 
	 /**
	     * <pre>
	     * 1. 개요 : JSON데이터를 Map으로 변환한다.
	 	 * 2. 처리내용 : JSON데이터를 Map으로 변환한다.
	     * </pre>
	     * @Method Name : JsonToMap
	     * @date : 2023. 11. 08
	     * @author : gwjeon
	     * @history : 
	     *	-----------------------------------------------------------------------
	     *	변경일				작성자						변경내용 
	     *	----------- ------------------- ---------------------------------------
	     *	2023. 11. 08		gwjeon				최초 작성 
	     *	-----------------------------------------------------------------------
	     */
		
		 public Map<String,Object> JsonToMap(String json) throws Exception {
			   
			 ObjectMapper objectMapper = new ObjectMapper();
			 //예쁘게 정렬
//			 objectMapper.configure(SerializationFeature.INDENT_OUTPUT,true);
			 TypeReference<Map<String, Object>> typeReference = new TypeReference<Map<String,Object>>() {};
			   
			 return objectMapper.readValue(json, typeReference);
		}

	 /**
	     * <pre>
	     * 1. 개요 : 세금계산서 properties 파일의 내용을 가져온다
	 	 * 2. 처리내용 : 세금계산서 properties 파일의 내용을 가져온다.
	 	 * 은행 연계에 필수 KEY값이 존재하는지 확인
	     * </pre>
	     * @Method Name : getTaxProperties
	     * @date : 2023. 10. 31
	     * @author : gwjeon
	     * @history : 
	     *	-----------------------------------------------------------------------
	     *	변경일				작성자						변경내용 
	     *	----------- ------------------- ---------------------------------------
	     *	2023. 10. 31		gwjeon				최초 작성 
	     *	-----------------------------------------------------------------------
	     */
	 
	 public Properties getProperties(String path) {
		   
		   String result = "";
		   Properties prop = new Properties();
		   try{
			   Reader reader = Resources.getResourceAsReader(path);
			   prop.load(reader);
			   reader.close();
		   }catch(Exception e) {
			   e.printStackTrace();
		   }
		   
		   return prop;
	}
	 
	/**
     * <pre>
     * 1. 개요 : error properties 파일의 내용을 가져온다
 	 * 2. 처리내용 : error properties 파일의 내용을 가져온다.
 	 * 은행 연계에 필수 KEY값이 존재하는지 확인
     * </pre>
     * @Method Name : getBankProperties
     * @date : 2023. 10. 31
     * @author : gwjeon
     * @history : 
     *	-----------------------------------------------------------------------
     *	변경일				작성자						변경내용 
     *	----------- ------------------- ---------------------------------------
     *	2023. 10. 31		gwjeon				최초 작성 
     *	-----------------------------------------------------------------------
     */
	 
	 public Properties getErrorProperties() {
		  return getProperties("socket/error/error.properties");
	 }	 
	 
	/**
     * <pre>
     * 1. 개요 : 은행 properties 파일의 내용을 가져온다
 	 * 2. 처리내용 : 은행 properties 파일의 내용을 가져온다.
 	 * 은행 연계에 필수 KEY값이 존재하는지 확인
     * </pre>
     * @Method Name : getBankProperties
     * @date : 2023. 10. 31
     * @author : gwjeon
     * @history : 
     *	-----------------------------------------------------------------------
     *	변경일				작성자						변경내용 
     *	----------- ------------------- ---------------------------------------
     *	2023. 10. 31		gwjeon				최초 작성 
     *	-----------------------------------------------------------------------
     */
	 
	 public Properties getBankProperties() {
		 return getProperties("socket/validator/validator_bank.properties");
	}
	 
	 /**
     * <pre>
     * 1. 개요 : 세금계산서 properties 파일의 내용을 가져온다
 	 * 2. 처리내용 : 세금계산서 properties 파일의 내용을 가져온다.
     * </pre>
     * @Method Name : getTaxProperties
     * @date : 2023. 10. 31
     * @author : gwjeon
     * @history : 
     *	-----------------------------------------------------------------------
     *	변경일				작성자						변경내용 
     *	----------- ------------------- ---------------------------------------
     *	2023. 10. 31		gwjeon				최초 작성 
     *	-----------------------------------------------------------------------
     */
	 
	 public Properties getTaxProperties() {
		 return getProperties("socket/validator/validator_tax.properties");
	 }
}
