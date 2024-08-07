package tour.tp.tpi.service.impl;

import java.util.List;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import tour.tp.tpi.service.Plan;
import tour.tp.tpi.service.PlanInfo;
import tour.tp.tpi.service.PlanVO;

@Repository("PlanDAO")
public class PlanDAO extends EgovAbstractMapper {

	public int insertTourPlan(Plan plan) throws Exception {
		String planNo =  selectOne("PlanDAO.selectMaxPlanNo");
		plan.setTourPlanNo(planNo);
	
		return insert("PlanDAO.insertTourPlan", plan);
    }
	
	public int insertPlanUser(Plan plan) throws Exception {
		
		return insert("PlanDAO.insertPlanUser", plan);
    }
	
	public Plan selectTourPlan(Plan plan) throws Exception {
		
		return selectOne("PlanDAO.selectTourPlan", plan);
    }
	
	public List<Plan> selectTourPlanList(PlanVO plan) throws Exception {
		
		return selectList("PlanDAO.selectTourPlanList", plan);
    }
	
	public int insertPlanInfo(PlanInfo info) throws Exception {
		
		PlanInfo getNo =  selectOne("PlanDAO.selectMaxInfoNo", info);
		info.setInfoNo(getNo.getInfoNo());
		info.setPlanOrder(getNo.getPlanOrder());
	
		return insert("PlanDAO.insertPlanInfo", info);
    }
}