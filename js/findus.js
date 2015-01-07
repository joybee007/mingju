
$(function(){



	var map = new BMap.Map("map");  // 创建Map实例
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint("318国际艺术园", function(point){
		if (point) {
			var marker = new BMap.Marker(point);  // 创建标注
			var opts = {
			  width : 200,     // 信息窗口宽度
			  height: 100,     // 信息窗口高度
			  title : "北京首府铭居建筑装饰工程有限公司" , // 信息窗口标题
			  enableMessage:false
			};
			var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象 
			map.centerAndZoom(point, 16);
			map.addOverlay(new BMap.Marker(point));
			map.openInfoWindow(infoWindow,point); //开启信息窗口
		}
	}, "北京市");


});
