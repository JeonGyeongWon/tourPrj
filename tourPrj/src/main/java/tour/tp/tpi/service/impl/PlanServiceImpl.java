package tour.tp.tpi.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import tour.tp.tpi.service.Plan;
import tour.tp.tpi.service.PlanService;

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
		}
		
		resMap.put("plan", plan);
		resMap.put("result", result);
		
		return resMap;
	}
	
	
}
