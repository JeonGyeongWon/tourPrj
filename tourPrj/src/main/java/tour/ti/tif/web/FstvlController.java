package tour.ti.tif.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(value= "*")
public class FstvlController {
	
	@RequestMapping(value = "/tif/tifList.do")
	public String tifListPage() throws Exception{
		
		return "/tour/ti/tif/tifListPage";
		
	}
}
