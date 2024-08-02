package tour.tp.tpi.service;

import java.util.HashMap;
import java.util.Map;

public interface PlanService {
	
	/**
	 * 여행계획 등록
	 */
	public Map<String, Object> insertTourPlan(Plan plan)
	  throws Exception;

}
