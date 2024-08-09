package tour.tp.tpi.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@SuppressWarnings("serial")
public class PlanInfoDTO extends PlanInfo implements Serializable  {

	/**
	 * 등록리스트
	 */
	private List<PlanInfo> infoList;


	public List<PlanInfo> getInfoList() {
		return infoList;
	}

	public void setInfoList(String param) {
		Gson gson = new Gson();
		System.out.println(param);
		List<PlanInfo> infoList = gson.fromJson(param.replaceAll("&quot;", "\""), new TypeToken<ArrayList<PlanInfo>>(){}.getType());
	
		this.infoList = infoList;
	}
	
	
	
}
