package tour.tp.tpi.service.impl;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import tour.tp.tpi.service.Plan;

@Repository("PlanDAO")
public class PlanDAO extends EgovAbstractMapper {

	public int insertTourPlan(Plan plan) throws Exception {
	String planNo =  selectOne("PlanDAO.selectMaxPlanId");
	plan.setTourPlanNo(planNo);

	return insert("PlanDAO.insertTourPlan", plan);
    }
	
}
