package tour.tp.tpi.service;

import java.util.List;
import java.util.Map;

import egovframework.com.cmm.LoginVO;


public interface PlanService {
	
	/**
	 * 여행계획 등록
	 */
	public Map<String, Object> insertTourPlan(Plan plan)
	  throws Exception;
	
	/**
	 * 여행계획 상세조회
	 */
	public Map<String, Object> selectTourPlan(Plan plan)
	  throws Exception;
	
	/**
	 * 여행계획 리스트조회
	 */
	public List<Plan> selectTourPlanList(PlanVO plan)
	  throws Exception;
	
	/**
	 * 계획정보 등록
	 */
	public Map<String, Object> insertPlanInfo(PlanInfoDTO planInfo)
	  throws Exception;
	
	/**
	 * 여행계획 리스트조회
	 */
	public List<PlanInfo> selectPlanInfoList(PlanInfo info)
	  throws Exception;
	
	/**
	 * 여행계획 삭제
	 */
	public Map<String, Object> deletePlanInfo(PlanInfo info)
	  throws Exception;
	
}
