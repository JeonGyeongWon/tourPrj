package tour.ti.tih.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(value= "*")
public class HotelController {

	@RequestMapping(value = "/tih/tihList.do")
	public String tihListPage() throws Exception{
		
		return "/tour/ti/tih/tihListPage";
		
	}
}
