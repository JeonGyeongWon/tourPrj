package tour.tp.tpi.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Plan implements Serializable {
	/**
	 * 여행계획번호
	 */
	private String tourPlanNo = "";
	/**
	 * 여행이름
	 */
	private String tourNm = "";
	/**
	 * 여행시작일
	 */
	private String tourStart = "";
	/**
	 * 여행종료일
	 */
	private String tourEnd = "";
	/**
	 * 등록 아이디
	 */
	private String frstRegId = "";
	/**
	 * 등록일자
	 */
	private String frstMdfrDt = "";
	/**
	 * 수정 아이디
	 */
	private String lastRegId = "";
	/**
	 * 수정일자
	 */
	private String lastMdfrDt = "";
	public String getTourPlanNo() {
		return tourPlanNo;
	}
	public void setTourPlanNo(String tourPlanNo) {
		this.tourPlanNo = tourPlanNo;
	}
	public String getTourNm() {
		return tourNm;
	}
	public void setTourNm(String tourNm) {
		this.tourNm = tourNm;
	}
	public String getTourStart() {
		return tourStart;
	}
	public void setTourStart(String tourStart) {
		this.tourStart = tourStart;
	}
	public String getTourEnd() {
		return tourEnd;
	}
	public void setTourEnd(String tourEnd) {
		this.tourEnd = tourEnd;
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
	
	
}
