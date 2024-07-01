/****************************************************************
 *
 * 파일명 : EgovMenuList.js
 * 설  명 : 전자정부 공통서비스 메뉴 JavaScript
 *
 *   수정일         수정자           Function 명
 * ------------    ---------    ----------------------------
 * 2011.09.01	    이기하			imgpath 변수는 js를 호출하는
 * 								    jsp에서 입력받도록 수정
 *
 *
 */

/*
 * 노드 , 트리 구성 정보 선언
 */
//editMenuListCreateTree
//editMenuListTreeNodes
//treeNodes
var editMenuListTreeNodes			= new Array();
//openTreeNodes
var editMenuListOpenTreeNodes	    = new Array();
//treeIcons
// treeIcons
var editMenuListTreeIcons			= new Array(6);
//var imgpath         = "./../../../../../../../images/egovframework/com/cmm/utl/";
//treeYeobu
var editMenuListTreeYeobu       = false;

var editMenuListHtmlCode       = "";

/*
 * 노드 , 트리 구성 이미지 정보
 */
function editMenuListPreloadIcons() {
	editMenuListTreeIcons[0] = new Image();
	editMenuListTreeIcons[0].src = imgpath+"menu_plus.gif";
	editMenuListTreeIcons[1] = new Image();
	editMenuListTreeIcons[1].src = imgpath+"menu_plusbottom.gif";
	editMenuListTreeIcons[2] = new Image();
	editMenuListTreeIcons[2].src = imgpath+"menu_minus.gif";
	editMenuListTreeIcons[3] = new Image();
	editMenuListTreeIcons[3].src = imgpath+"menu_minusbottom.gif";
	editMenuListTreeIcons[4] = new Image();
	editMenuListTreeIcons[4].src = imgpath+"menu_folder.gif";
	editMenuListTreeIcons[5] = new Image();
	editMenuListTreeIcons[5].src = imgpath+"menu_folderopen.gif";
}
/*
* 트리생성함수
*/
function editMenuListCreateTree(arrName, vYeobu) {

   var startNode, openNode;
	editMenuListTreeNodes = arrName;
	editMenuListTreeYeobu = vYeobu;
	if (editMenuListTreeNodes.length > 0) {
		editMenuListPreloadIcons();
		if (startNode == null) startNode = 0;
		if (openNode != 0 || openNode != null) editMenuListTreeSetOpenTreeNodes(openNode);
		if (startNode !=0) {
			
			var nodeValues = editMenuListTreeNodes[editMenuListGetTreeArrayId(startNode)].split("|");
			editMenuListHtmlCode += "<a href='" + nodeValues[3] + "' onmouseover='window.status='" + nodeValues[3] + "';return true;' onmouseout='window.status=' ';return true;'><img src='"+imgpath+"menu_folderopen.gif' border='0' align='absbottom' alt=''>" + nodeValues[2] + "</a><br>"; 
			
			//document.write("<a href='" + nodeValues[3] + "' onmouseover='window.status='" + nodeValues[3] + "';return true;' onmouseout='window.status=' ';return true;'><img src='"+imgpath+"menu_folderopen.gif' border='0' align='absbottom' alt=''>" + nodeValues[2] + "</a><br>");
		} else document.write("<img src='"+imgpath+"menu_base.gif' border='0' align='absbottom' alt='' >root<br>");
		var recursedNodes = new Array();
		editMenuListAddTreeNode(startNode, recursedNodes);
		
		document.write(editMenuListHtmlCode);
	}
}
/*
* 노드위치 확인
*/
function editMenuListGetTreeArrayId(node) {
	for (i=0; i<editMenuListTreeNodes.length; i++) {
		var nodeValues = editMenuListTreeNodes[i].split("|");
		if (nodeValues[0]==node) return i;
	}
	return 0;
}
/*
* 트리 노드 열기
*/
function editMenuListTreeSetOpenTreeNodes(openNode) {
	for (i=0; i<editMenuListTreeNodes.length; i++) {
		var nodeValues = editMenuListTreeNodes[i].split("|");
		if (nodeValues[0]==openNode) {
			editMenuListOpenTreeNodes.push(nodeValues[0]);
			editMenuListTreeSetOpenTreeNodes(nodeValues[1]);
		}
	}
}
/*
* 트리노드 오픈 여부 확인
*/
function editMenuListIsTreeNodeOpen(node) {
   if (editMenuListTreeYeobu){ return true; }
   for (i=0; i<editMenuListOpenTreeNodes.length; i++){
	   if (editMenuListOpenTreeNodes[i]==node){ return true; }
   }
   return false;
}
/*
* 하위 트리노드 존재여부 확인
*/
function editMenuListHasChildTreeNode(parentNode) {
	for (i=0; i< editMenuListTreeNodes.length; i++) {
		var nodeValues = editMenuListTreeNodes[i].split("|");
		if (nodeValues[1] == parentNode) return true;
	}
	return false;
}
/*
* 트리노드 최하위 여부 확인
*/
function editMenuListLastTreeSibling (node, parentNode) {
	var lastChild = 0;
	for (i=0; i< editMenuListTreeNodes.length; i++) {
		var nodeValues = editMenuListTreeNodes[i].split("|");
		if (nodeValues[1] == parentNode)
			lastChild = nodeValues[0];
	}
	if (lastChild==node) return true;
	return false;
}
/*
* 신규 트리노드 추가
*/
function editMenuListAddTreeNode(parentNode, recursedNodes) {
	for (var i = 0; i < editMenuListTreeNodes.length; i++) {

		var nodeValues = editMenuListTreeNodes[i].split("|");
		if (nodeValues[1] == parentNode) {

			var lastSibling	= editMenuListLastTreeSibling(nodeValues[0], nodeValues[1]);
			var hasChildNode	= editMenuListHasChildTreeNode(nodeValues[0]);
			var isNodeOpen = editMenuListIsTreeNodeOpen(nodeValues[0]);
			for (g=0; g<recursedNodes.length; g++) {
				if (recursedNodes[g] == 1) document.write("<img src='"+imgpath+"menu_line.gif' border='0' align='absbottom' alt='' >");
				else  document.write("<img src='"+imgpath+"menu_empty.gif' border='0' align='absbottom' alt='' >");
			}
			if (lastSibling) recursedNodes.push(0);
			else recursedNodes.push(1);
			if (hasChildNode) {
				if (lastSibling) {
					document.write("<a href='javascript: editMenuListOpenCloseEx(" + nodeValues[0] + ", 1);'><img id='editMenuListJoin" + nodeValues[0] + "' src='"+imgpath);
					 	if (isNodeOpen) document.write("menu_minus");
						else document.write("menu_plus");
					document.write("bottom.gif' border='0' align='absbottom' alt='Open/Close node' ></a>");
				} else {
					document.write("<a href='javascript: editMenuListOpenCloseEx(" + nodeValues[0] + ", 0);'><img id='editMenuListJoin" + nodeValues[0] + "' src='"+imgpath);
						if (isNodeOpen) document.write("menu_minus");
						else document.write("menu_plus");
					document.write(".gif' border='0' align='absbottom' alt='Open/Close node' /></a>");
				}
			} else {
				if (lastSibling) document.write("<img src='"+imgpath+"menu_joinbottom.gif' border='0' align='absbottom' alt='' >");
				else document.write("<img src='"+imgpath+"menu_join.gif' border='0' align='absbottom' alt='' >");
			}
			document.write("<a href=javascript:fnChoiceNodesProcess('" + i + "');>");
			if (hasChildNode) {
				document.write("<img id='editMenuListIcon" + nodeValues[0] + "' src='"+imgpath+"menu_folder")
					if (isNodeOpen) document.write("open");
				document.write(".gif' border='0' alt='Folder' >");
			} else document.write("<img id='editMenuListIcon" + nodeValues[0] + "' src='"+imgpath+"menu_page.gif' border='0' align='absbottom' alt='Page'>");

			document.write(nodeValues[2]);
			document.write("</a><br>");
			if (hasChildNode) {
				document.write("<div id='editMenuListDiv" + nodeValues[0] + "'");
					if (!isNodeOpen) document.write(" style='display: none;'");
				document.write(">");
				editMenuListAddTreeNode(nodeValues[0], recursedNodes);
				document.write("</div>");
			}
			recursedNodes.pop();
		}
	}
}
/*
* 트리노드 액션(열기,닫기)
*/
function editMenuListOpenCloseEx(node, bottom) {
	var editMenuListTreeDiv = document.getElementById("editMenuListDiv" + node);
	var editMenuListTreeJoin	= document.getElementById("editMenuListJoin" + node);
	var editMenuListTreeIcon = document.getElementById("editMenuListIcon" + node);

	if (editMenuListTreeDiv.style.display == 'none') {
		if (bottom==1) editMenuListTreeJoin.src = editMenuListTreeIcons[3].src;
		else editMenuListTreeJoin.src = editMenuListTreeIcons[2].src;
		editMenuListTreeIcon.src = editMenuListTreeIcons[5].src;
		editMenuListTreeDiv.style.display = '';
	} else {
		if (bottom==1) editMenuListTreeJoin.src = editMenuListTreeIcons[1].src;
		else editMenuListTreeJoin.src = editMenuListTreeIcons[0].src;
		editMenuListTreeIcon.src = editMenuListTreeIcons[4].src;
		editMenuListTreeDiv.style.display = 'none';
	}
}
if(!Array.prototype.push) {
	function fnArrayPush() {
		for(var i=0;i<arguments.length;i++)
			this[this.length]=arguments[i];
		return this.length;
	}
	Array.prototype.push = fnArrayPush;
}
if(!Array.prototype.pop) {
	function fnArrayPop(){
		lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
	}
	Array.prototype.pop = fnArrayPop;
}

