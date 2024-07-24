package tour.tp.tpi.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(value= "*")
public class PlanController {

	@RequestMapping(value = "/tpi/tpiList.do")
	public String tpiListPage() throws Exception{
		
		return "/tour/tp/tpi/tpiListPage";
		
	}
	
	@RequestMapping(value = "/tpi/tpiCalModal.do")
	public String tpiCalModal() throws Exception{
		
		return "/tour/tp/tpi/tpiCalModal";
		
	}
	
	@RequestMapping(value = "/tpi/tpiPlan.do")
	public String tpiPlanPage(ModelMap model, String startDate, String endDate) throws Exception{
		
		model.addAttribute("startDate", startDate);
		model.addAttribute("endDate", endDate);
		
		return "/tour/tp/tpi/tpiPlanPage";
		
	}
}
