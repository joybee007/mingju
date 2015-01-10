
$(function(){
	var map = new BMap.Map("map");  // 创建Map实例
	//map.setMapStyle({style:'grayscale'});
	// 创建地址解析器实例
	//var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	var point = new BMap.Point(116.48747841124047,40.04434137313762);
	var marker = new BMap.Marker(point);  // 创建标注
	var opts = {
	  width : 315,     // 信息窗口宽度
	  height: 100,     // 信息窗口高度
	  //title : '<p class="f12">北京首府铭居建筑装饰工程有限公司</p>' , // 信息窗口标题
	  enableMessage:false
	};
	var infoWindow = new BMap.InfoWindow('<table class="f12 map-infoWindow"><tr><td width="60">ADD</td><td>北京市朝阳区318国际艺术园区 东区4排7号</td></tr><tr><td>TEL</td><td>+86-(10)84569189</td></tr><tr><td>E-mail</td><td><a href="mailto:hjj@shoufumingju.com">hjj@shoufumingju.com</a></td></tr><tr><td>Hot Line</td><td>400-668-8888</td></tr></table>', opts);
	// 创建信息窗口对象
	map.centerAndZoom(point, 14);
	map.addOverlay(marker);
	map.openInfoWindow(infoWindow,point); //开启信息窗口
	marker.addEventListener('click',function(){
		map.openInfoWindow(infoWindow,point);
	});

});
