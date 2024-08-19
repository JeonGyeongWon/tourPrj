package tour.tp.tpi.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class PlanInfo implements Serializable  {
	
	/**
	 * 여행계획번호
	 */
	private String tourPlanNo = "";

	/**
	 * 계획정보번호
	 */
	private String infoNo = "";

	/**
	 * 투어일련번호
	 */
	private String contentId = "";

	/**
	 * 장소이름
	 */
	private String name = "";

	/**
	 * x좌표
	 */
	private String mapx = "";
	
	/**
	 * 등록id
	 */
	private String frstRegId = "";

	/**
	 * 등록일자
	 */
	private String frstMdfrDt = "";

	/**
	 * 수정id
	 */
	private String lastRegId = "";

	/**
	 * 수정일자
	 */
	private String lastMdfrDt = "";

	/**
	 * y좌표
	 */
	private String mapy = "";

	/**
	 * 주소
	 */
	private String address = "";

	/**
	 * 지역코드?
	 */
	private String areaCd = "";

	/**
	 * 시군구코드?
	 */
	private String sigunguCd = "";

	/**
	 * 순서
	 */
	private String planOrder = "";
	
	/**
	 * 시작시간
	 */
	private String planStart = "";
	
	/**
	 * 종료시간
	 */
	private String planEnd = "";
	
	/**
	 * 해당날짜
	 */
	private String planDt = "";
	
	/**
	 * 전화번호
	 */
	private String telNo = "";
	
	/**
	 * 사용여부
	 */
	private String useyn = "";
	
	
	public String getTourPlanNo() {
		return tourPlanNo;
	}

	public void setTourPlanNo(String tourPlanNo) {
		this.tourPlanNo = tourPlanNo;
	}

	public String getInfoNo() {
		return infoNo;
	}

	public void setInfoNo(String infoNo) {
		this.infoNo = infoNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMapx() {
		return mapx;
	}

	public void setMapx(String mapx) {
		this.mapx = mapx;
	}

	public String getFrstRegId() {
		return frstRegId;
	}

	public void setFrstRegId(String frstRegId) {
		this.frstRegId = frstRegId;
	}

	public String getFrstMdfrDt() {
		return frstMdfrDt;
	}

	public void setFrstMdfrDt(String frstMdfrDt) {
		this.frstMdfrDt = frstMdfrDt;
	}

	public String getLastRegId() {
		return lastRegId;
	}

	public void setLastRegId(String lastRegId) {
		this.lastRegId = lastRegId;
	}

	public String getLastMdfrDt() {
		return lastMdfrDt;
	}

	public void setLastMdfrDt(String lastMdfrDt) {
		this.lastMdfrDt = lastMdfrDt;
	}

	public String getMapy() {
		return mapy;
	}

	public void setMapy(String mapy) {
		this.mapy = mapy;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPlanOrder() {
		return planOrder;
	}

	public void setPlanOrder(String planOrder) {
		this.planOrder = planOrder;
	}

	public String getPlanStart() {
		return planStart;
	}

	public void setPlanStart(String planStart) {
		this.planStart = planStart;
	}

	public String getPlanEnd() {
		return planEnd;
	}

	public void setPlanEnd(String planEnd) {
		this.planEnd = planEnd;
	}

	public String getPlanDt() {
		return planDt;
	}

	public void setPlanDt(String planDt) {
		this.planDt = planDt;
	}

	public String getTelNo() {
		return telNo;
	}

	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}

	public String getContentId() {
		return contentId;
	}

	public void setContentId(String contentId) {
		this.contentId = contentId;
	}

	public String getAreaCd() {
		return areaCd;
	}

	public void setAreaCd(String areaCd) {
		this.areaCd = areaCd;
	}

	public String getSigunguCd() {
		return sigunguCd;
	}

	public void setSigunguCd(String sigunguCd) {
		this.sigunguCd = sigunguCd;
	}

	public String getUseyn() {
		return useyn;
	}

	public void setUseyn(String useyn) {
		this.useyn = useyn;
	}

	
	
}
