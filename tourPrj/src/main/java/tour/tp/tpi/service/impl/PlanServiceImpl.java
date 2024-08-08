package tour.tp.tpi.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import egovframework.com.cmm.LoginVO;
import tour.tp.tpi.service.Plan;
import tour.tp.tpi.service.PlanInfo;
import tour.tp.tpi.service.PlanInfoDTO;
import tour.tp.tpi.service.PlanService;
import tour.tp.tpi.service.PlanVO;

@Service("PlanService")
public class PlanServiceImpl extends EgovAbstractServiceImpl implements PlanService  {
	
	@Resource(name = "PlanDAO")
    private PlanDAO planDAO;

	@Override
	public Map<String, Object> insertTourPlan(Plan plan) throws Exception {
		
		Map<String, Object> resMap = new HashMap<String, Object>();
		String result = "000";
		int res = planDAO.insertTourPlan(plan);
		if(res > 0) {
			result = "001";
			planDAO.insertPlanUser(plan);
		}
		
		resMap.put("plan", plan);
		resMap.put("result", result);
		
		return resMap;
	}

	@Override
	public Map<String, Object> selectTourPlan(Plan plan) throws Exception {
		
		Map<String, Object> resMap = new HashMap<String, Object>();
		resMap.put("result", "000");
		Plan selectPlan = planDAO.selectTourPlan(plan);
		
		if(selectPlan != null) {
			resMap.put("plan", selectPlan);
			resMap.put("result", "001");
		}
		
		return resMap;
	}

	@Override
	public List<Plan> selectTourPlanList(PlanVO plan) throws Exception {
		
		List<Plan> list = new ArrayList<>();
		list = planDAO.selectTourPlanList(plan);
		
		return list;
	}

	@Override
	public Map<String, Object> insertPlanInfo(PlanInfoDTO planInfo) throws Exception {
		
		Map<String, Object> resMap = new HashMap<String, Object>();
		String result = "000";
		int res = 0;
		List<PlanInfo> infoList = planInfo.getInfoList();
		if(infoList.size() > 0) {
			for(PlanInfo info : infoList) {
				info.setFrstRegId(planInfo.getFrstRegId());
				info.setLastRegId(planInfo.getFrstRegId());
				info.setTourPlanNo(planInfo.getTourPlanNo());
				info.setPlanDt(planInfo.getPlanDt());
				res += planDAO.insertPlanInfo(info);
			}
		}
		if(res > 0) {
			result = "001";
		}
		resMap.put("result", result);
		
		return resMap;
	}
	
	
}
