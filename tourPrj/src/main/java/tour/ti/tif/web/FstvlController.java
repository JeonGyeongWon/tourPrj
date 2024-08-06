package tour.ti.tif.web;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@CrossOrigin(value = "*")
public class FstvlController {

	@RequestMapping(value = "/tif/tifList.do")
	public String tifListPage() throws Exception {

		return "/tour/ti/tif/tifListPage";

	}

	@RequestMapping(value = "/tif/tifDetail.do")
	public String tifDetail(ModelMap modelmap, @RequestParam HashMap<?, ?> map) throws Exception {
		System.out.println(map.get("contentId"));
		modelmap.addAttribute("contentId", map.get("contentId"));
		return "/tour/ti/tif/tifDetailPage";

	}
}
