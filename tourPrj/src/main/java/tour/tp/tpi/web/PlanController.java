package tour.tp.tpi.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.com.cmm.LoginVO;
import tour.tp.tpi.service.Plan;
import tour.tp.tpi.service.PlanInfo;
import tour.tp.tpi.service.PlanInfoDTO;
import tour.tp.tpi.service.PlanService;
import tour.tp.tpi.service.PlanVO;

@Controller
public class PlanController {
	
	@Resource(name = "PlanService")
	private PlanService planService;

	@RequestMapping(value = "/tpi/tpiList.do")
	public String tpiListPage() throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if(!isAuthenticated) {
			return "uat/uia/EgovLoginUsr";
		}
		
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
		resMap.put("result", "000");
		if(isAuthenticated) {
			 LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			 plan.setFrstRegId(user.getUniqId()); 
			 plan.setLastRegId(user.getUniqId()); 
			 resMap = planService.insertTourPlan(plan);
		}else {
			resMap.put("result", "-1");
		}
		
		return ResponseEntity.ok(resMap);
		
	}
	
	@RequestMapping(value = {"/tpi/{tourPlanNo}/tpiPlan.do", "/tpi/tpiPlan.do"})
	public String tpiPlanPage(ModelMap model, @PathVariable(name = "tourPlanNo", required = false) String tourPlanNo) throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		if(!isAuthenticated) {
			return "uat/uia/EgovLoginUsr";
		}
		
		model.addAttribute("tourPlanNo", tourPlanNo);
		
		return "/tour/tp/tpi/tpiPlanPage";
		
	}
	
	@RequestMapping(value = "/tpi/selectTourPlanList.do")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> selectTourPlanList(PlanVO plan) throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		Map<String, Object> resMap = new HashMap<String, Object>();
		resMap.put("result", "000");
		if(isAuthenticated) {
			 LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			 plan.setFrstRegId(user.getUniqId()); 
			 resMap.put("planList", planService.selectTourPlanList(plan));
		}else {
			resMap.put("result", "-1");
		}
		
		return ResponseEntity.ok(resMap);
		
	}
	
	@RequestMapping(value = "/tpi/selectTourPlan.do")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> selectTourPlan(PlanVO plan) throws Exception{
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		Map<String, Object> resMap = new HashMap<String, Object>();
		resMap.put("result", "000");
		if(isAuthenticated) {
			 LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			 plan.setFrstRegId(user.getUniqId()); 
			 resMap = planService.selectTourPlan(plan);
		}else {
			resMap.put("result", "-1");
		}
		
		return ResponseEntity.ok(resMap);
		
	}
	
	@RequestMapping(value = "/tpi/insertPlanInfo.do")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> insertPlanInfo(PlanInfoDTO planInfo) throws Exception{
		
		System.out.println(planInfo.getInfoList());
		System.out.println(planInfo.getTourPlanNo());
		System.out.println(planInfo.getPlanDt());
		
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		Map<String, Object> resMap = new HashMap<String, Object>();
		resMap.put("result", "000");
		if(isAuthenticated) {
			 LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			 planInfo.setFrstRegId(user.getUniqId()); 
			 resMap = planService.insertPlanInfo(planInfo);
		}else {
			resMap.put("result", "-1");
		}
		
		return ResponseEntity.ok(resMap);
		
	}
}
