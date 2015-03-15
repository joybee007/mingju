
$(function(){
	var styleJson=[{featureType:"highway",elementType:"labels.text.fill",stylers:{color:"#5b5b5b"}},{featureType:"land",elementType:"all",stylers:{color:"#e3e3e3"}},{featureType:"water",elementType:"all",stylers:{color:"#575757"}},{featureType:"green",elementType:"all",stylers:{color:"#c6c6c6"}},{featureType:"highway",elementType:"geometry.stroke",stylers:{color:"#e0e0e0"}},{featureType:"highway",elementType:"geometry.fill",stylers:{color:"#ffffff"}},{featureType:"arterial",elementType:"geometry.fill",stylers:{color:"#ffffff"}},{featureType:"highway",elementType:"labels.text.stroke",stylers:{color:"#ffffff"}},{featureType:"local",elementType:"geometry.fill",stylers:{color:"#ffffff"}},{featureType:"local",elementType:"geometry.stroke",stylers:{color:"#e0e0e0"}},{featureType:"subway",elementType:"geometry",stylers:{color:"#bfbfbf"}},{featureType:"subway",elementType:"labels.text.fill",stylers:{color:"#757575"}},{featureType:"subway",elementType:"labels.text.stroke",stylers:{color:"#ffffff"}},{featureType:"label",elementType:"labels.text.stroke",stylers:{color:"#ffffff"}},{featureType:"label",elementType:"labels.text.fill",stylers:{color:"#171717"}},{featureType:"label",elementType:"labels.text.fill",stylers:{color:"#171717"}},{featureType:"poi",elementType:"labels.text.stroke",stylers:{color:"#ffffff"}},{featureType:"arterial",elementType:"labels.text.fill",stylers:{color:"#757575"}},{featureType:"arterial",elementType:"labels.text.stroke",stylers:{color:"#ffffff"}},{featureType:"manmade",elementType:"geometry.fill",stylers:{color:"#e3e3e3"}},{featureType:"poi",elementType:"all",stylers:{}}];
	var map = new BMap.Map("map");  // 创建Map实例
	//map.setMapStyle({style:'grayscale'});
	map.setMapStyle({
		styleJson:styleJson
	});
	map.enableScrollWheelZoom();
	// 创建地址解析器实例
	//var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	var point = new BMap.Point(116.48747841124047,40.04434137313762);
	var marker = new BMap.Marker(point);  // 创建标注
	var opts = {
		width : 315,     // 信息窗口宽度
		height: 100,     // 信息窗口高度
		//title : '<p class="f12">北京首府铭居建筑装饰工程有限公司</p>' , // 信息窗口标题
		offset:{
			height:-20,
			width:0
		},
		enableMessage:false
	};
	var infoWindow = new BMap.InfoWindow('<table class="f12 map-infoWindow"><tr><td width="80" align="right">ADD:</td><td>北京市朝阳区318国际艺术园区 东区4排7号</td></tr><tr><td align="right">TEL:</td><td>+86-(10)84569189</td></tr><tr><td align="right">E-mail:</td><td><a href="mailto:hjj@shoufumingju.com">hjj@shoufumingju.com</a></td></tr><tr><td align="right">Hot Line:</td><td>400-635-0517</td></tr></table>', opts);
	// 创建信息窗口对象
	map.centerAndZoom(point, 14);
	map.addOverlay(marker);
	map.openInfoWindow(infoWindow,point); //开启信息窗口
	marker.addEventListener('click',function(){
		map.openInfoWindow(infoWindow,point);
	});

});
