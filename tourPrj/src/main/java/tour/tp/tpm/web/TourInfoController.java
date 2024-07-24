package tour.tp.tpm.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(value= "*")
public class TourInfoController {
	
	/**
	* 게획짜기_관광정보 모달창
	* 24.07.23 njkim
	**/
	@RequestMapping(value = "/tpm/tourInfoModal.do")
	public String makePlan() throws Exception{
		
		return "/tour/tp/tpm/tpmModal";
	}
}
