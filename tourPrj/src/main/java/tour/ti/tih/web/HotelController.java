package tour.ti.tih.web;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@CrossOrigin(value = "*")
public class HotelController {

	@RequestMapping(value = "/tih/tihList.do")
	public String tihListPage() throws Exception {

		return "/tour/ti/tih/tihListPage";

	}

	@RequestMapping(value = "/tih/tihDetail.do")
	public String tihDetail(ModelMap modelmap, @RequestParam HashMap<?, ?> map) throws Exception {
		System.out.println(map.get("contentId"));
		modelmap.addAttribute("contentId", map.get("contentId"));
		return "/tour/ti/tih/tihDetailPage";

	}
}
