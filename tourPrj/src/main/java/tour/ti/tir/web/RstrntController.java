package tour.ti.tir.web;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@CrossOrigin(value= "*")
public class RstrntController {

	@RequestMapping(value = "/tir/tirList.do")
	public String tirListPage() throws Exception {

		return "/tour/ti/tir/tirListPage";

	}

	@RequestMapping(value = "/tir/tirDetail.do")
	public String tirDetail(ModelMap modelmap, @RequestParam HashMap<?, ?> map) throws Exception {
		System.out.println(map.get("contentId"));
		modelmap.addAttribute("contentId", map.get("contentId"));
		return "/tour/ti/tir/tirDetailPage";

	}
}