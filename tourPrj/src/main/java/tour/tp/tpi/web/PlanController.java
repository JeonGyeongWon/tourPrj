package tour.tp.tpi.web;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.com.cmm.LoginVO;
import tour.tp.tpi.service.Plan;
import tour.tp.tpi.service.PlanService;

@Controller
@CrossOrigin(value= "*")
public class PlanController {
	
	@Resource(name = "PlanService")
	private PlanService planService;

	@RequestMapping(value = "/tpi/tpiList.do")
	public String tpiListPage() throws Exception{
		
		return "/tour/tp/tpi/tpiListPage";
		
	}
	
	@RequestMapping(value = "/tpi/tpiCalModal.do")
	public String tpiCalModal() throws Exception{
		
		return "/tour/tp/tpi/tpiCalModal";
		
	}
	
	@RequestMapping(value = "/tpi/insertTourPlan.do")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> insertTourPlan(Plan plan) throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		Map<String, Object> resMap = new HashMap<String, Object>();
		
		if(isAuthenticated) {
			/*
			 * LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			 * plan.setFrstRegId(user.getId()); plan.setLastRegId(user.getId()); resMap =
			 * planService.insertTourPlan(plan);
			 */
		}else {
			resMap.put("result", "002");
			
		}
		System.out.println(resMap);
		return ResponseEntity.ok(resMap);
		
	}
	
	@RequestMapping(value = "/tpi/tpiPlan.do")
	public String tpiPlanPage(ModelMap model, Plan plan) throws Exception{
		
		System.out.println("plan >>   " + plan);
		
		model.addAttribute("startDate", plan.getTourStart());
		model.addAttribute("endDate", plan.getTourEnd());
		
		return "/tour/tp/tpi/tpiPlanPage";
		
	}
}
