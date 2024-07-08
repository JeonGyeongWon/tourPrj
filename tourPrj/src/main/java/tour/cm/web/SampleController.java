package tour.cm.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import tour.cm.service.OpenServiceApi;

@Controller
public class SampleController {
	
	@Autowired
	private OpenServiceApi openServiceApi;
	
	@RequestMapping(value = "/api/test.do")
	@ResponseBody
	public Object sampleTest(@RequestParam HashMap map) throws Exception{
		
		return openServiceApi.getOpenData(map);
		
	}
	
	
	@RequestMapping(value = "/api/sample.do")
	@CrossOrigin(value= "*")
	public String samplePage(Map map) throws Exception{
		
		return "/tour/sample/samplePage";
		
	}
	
}
