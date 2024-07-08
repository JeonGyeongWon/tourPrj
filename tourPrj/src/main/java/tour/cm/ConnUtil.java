package tour.cm;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository("connUtil")
public class ConnUtil {
	
	 // 통신시 읽어올 I/O 스트림
    private BufferedReader in = null;
    
    private OutputStream os = null;
    
	/**
	* <pre>
	* 1. 개요 : 연결 객체정보 설정
	* 2. 처리내용 : 연결 객체정보 설정
	* </pre>
	* @Method Name : getConnSetting
	* @date : 2023.11.08
	* @author : gwjeon
	* @param1 URL
	*	-----------------------------------------------------------------------
	*	변경일				작성자						변경내용 
	*	----------- ------------------- ---------------------------------------
	*	2023.10.30 			gwjeon						최초작성
	*	----------------------------------------------------------------------
	*/
    public HttpURLConnection getConnSetting(String url, String method) throws Exception{
    	
         
         URL projUrl = new URL(url);
         HttpURLConnection conn = (HttpURLConnection)projUrl.openConnection();
         conn.setUseCaches(false);
         conn.setDoOutput(true);
         conn.setDoInput(true);
         conn.setRequestMethod(method); // 고정
         
         conn.setRequestProperty("Accept", "application/json; charset=utf-8");
         conn.setRequestProperty("Content-Type", "application/json; charset=utf-8");

         conn.setConnectTimeout(100000000);
         conn.setReadTimeout(100000000);
         
         return conn;
         
    }
	
    /**
	* <pre>
	* 1. 개요 : 데이터 읽기 
	* 2. 처리내용 : 데이터 읽기 
	* </pre>
	* @Method Name : getReadData
	* @date : 2023.11.08
	* @author : gwjeon
	* @param1 URL
	*	-----------------------------------------------------------------------
	*	변경일				작성자						변경내용 
	*	----------- ------------------- ---------------------------------------
	*	2023.11.08 			gwjeon						최초작성
	*	----------------------------------------------------------------------
	*/
    public String getReadData(String url, String jsonValue, int code, String method) {
    	
    	String retJson = "";
    	HttpURLConnection conn = null;
         
    	try {
    		 conn = getConnSetting(url, method);

             os = conn.getOutputStream();
             os.write(jsonValue.getBytes("UTF-8"));
             os.flush();

             String inputLine = null;
             StringBuffer outResult = new StringBuffer();

             System.out.println("conn.getResponseCode() >>>" + conn.getResponseCode());
             
             if(conn.getResponseCode() == 200) {
                 in = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));
             }else {
                 in = new BufferedReader(new InputStreamReader(conn.getErrorStream(),"UTF-8"));
             }
             while((inputLine = in.readLine()) != null){
                 outResult.append(inputLine);
             }

             in.close();
             os.close();
             
             conn.disconnect();

             // 리턴 JSON 확인
             retJson = outResult.toString();
             
//             System.out.println("retJson >>>>" + retJson);

         }
         catch(Exception e) {
             e.printStackTrace();
         }finally {
             try {
                 if(in != null) {
                     in.close();
                 }
                 
                 if(os != null) {
                	 os.close();
                 }
                 
                 if(conn != null) {
                	 conn.disconnect();
                 }
                 
             }catch(Exception e) {
            	 e.printStackTrace();
             }
         }
    	 return retJson;
    }
	
}
