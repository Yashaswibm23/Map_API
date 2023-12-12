//===============Start Roles==========================================
(function (open) {
  XMLHttpRequest.prototype.open = function () {
    var method = arguments[0].toLowerCase();
    var url = arguments[1];
    if (url == undefined) {
      console.log(arguments);
    }
    if (method === "get" || method === "post") {
      this.withCredentials = true;
      open.apply(this, arguments);
      // this.setRequestHeader("Authorization", "Basic " + btoa('deduce2' + ":" + '1234'));
      // this.setRequestHeader("Authorization", "Basic " + btoa(hemanth5 + ":" +hemanth));
      //this.setRequestHeader("Authorization", "Basic " + btoa(atob(token2)));
      this.setRequestHeader(
        "Authorization",
        "Basic " + btoa(atob("YWRtaW46c25laGE="))
      );
    } else {
      open.apply(this, arguments);
    }
  };
})(XMLHttpRequest.prototype.open);

function xhrTileLoadFunction(tile, src) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    var arrayBufferView = new Uint8Array(this.response);
    var blob = new Blob([arrayBufferView], { type: "image/png" });
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);
    tile.getImage().src = imageUrl;
  };
  xhr.open("GET", src);
  xhr.send();
}
function xhrImageLoadFunction(image, src) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    var arrayBufferView = new Uint8Array(this.response);
    var blob = new Blob([arrayBufferView], { type: "image/png" });
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);
    image.getImage().src = imageUrl;
  };
  xhr.open("GET", src);
  xhr.send();
}

var view = new ol.View({
  projection: "EPSG:4326",
  center: [78.76718611027216, 22.594643042142994],
  zoom: 5,
  // visible:true,
});
var map = new ol.Map({
  target: "map",
  view: view,
  controls: [],
});

var osm = new ol.layer.Tile({
  title: "Open Street Map",
  visible: true,
  source: new ol.source.OSM({
    //  url:'http://10.10.7.105:8082/tile/{z}/{x}/{y}.png'
  }),
});
var DeduceMap = new ol.layer.Image({
  title: "Deduce Map",
  source: new ol.source.ImageWMS({
    //url: "BUILDINGS_NILAYA_BANGALORE",
    url: "http://10.10.5.169:8084/geoserver/INDIA/wms",
    params: { LAYERS: "INDIA:CITY_BOUND_BANGALORE_V1.4", TILED: true },
    serverType: "geoserver",
  }),
});
var Satellite = new ol.layer.Tile({
  title: "Satellite",
  visible: true,
  source: new ol.source.XYZ({
    attributions: [
      "Powered by Esri",
      "Source:Esri,DigitalGlobe,GeoEye,Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
    ],
    attributionsCollapsible: false,
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    maxZoom: 23,
  }),
});

var Nilaya = new ol.layer.Image({
  title: "Nilaya",
  source: new ol.source.ImageWMS({
    url: "http://10.10.5.169:8084/geoserver/INDIA/wms",
    params: { LAYERS: "INDIA:Bangalore_BFP_Nilaya_V.3", TILED: true },
    imageLoadFunction: xhrImageLoadFunction,
    serverType: "geoserver",
  }),
});
var Roads = new ol.layer.Image({
  title: "Roads",
  source: new ol.source.ImageWMS({
    url: "http://10.10.5.169:8084/geoserver/INDIA/wms",
    params: { LAYERS: "INDIA:Roads_Bangalore_V4.42", TILED: true },
    imageLoadFunction: xhrImageLoadFunction,
    serverType: "geoserver",
  }),
});
var Pheonix = new ol.layer.Image({
  title: "Pheonix",
  source: new ol.source.ImageWMS({
    url: "http://10.10.5.169:8084/geoserver/Bengaluru/wms",
    params: { LAYERS: "INDIA:Bangalore_Poi_V1.0", TILED: true },
    imageLoadFunction: xhrImageLoadFunction,
    serverType: "geoserver",
    ratio: 1,
  }),
});

var base_maps = new ol.layer.Group({
  title: "Base Maps ",
  fold: true,
  // layers: [osm, DeduceMap],
  layers: [Satellite, osm, DeduceMap],
});

var overlays = new ol.layer.Group({
  title: "Map Layers",
  layers: [Roads, Nilaya, Pheonix],
});

fetch("http://10.10.5.171:200/maps/demomap/", {
  method: "POST",
})
  .then((response) => {
    console.log(response);
    if (response.status === 200) {
      map.addLayer(base_maps);
      map.addLayer(overlays);
    } else if (response.status === 429) {
      alert("Login Required");
    }
    // else if (response.status === 429) {
    //     const alertDiv = document.createElement('div');
    //     alertDiv.classList.add('custom-alert');
    //     alertDiv.textContent = 'Login Required';
    //     document.body.appendChild(alertDiv);
    //   }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
var userLayers = [];

var mousePosition = new ol.control.MousePosition({
  className: "mousePosition",
  projection: "EPSG:4326",
  coordinateFormat: function (coordinate) {
    return ol.coordinate.format(coordinate, "{y}, {x}", 6);
  },
});
map.addControl(mousePosition);

var scaleControl = new ol.control.ScaleLine({
  bar: true,
  text: true,
});
map.addControl(scaleControl);

layerSwitcher = new ol.control.LayerSwitcher({
  activationMode: "click",
  startActive: false,
  tipLabel: "Layers", // Optional label for button
  groupSelectStyle: "children", // Can be 'children' [default], 'group' or 'none'
  collapseTipLabel: "Collapse layers",
});
map.addControl(layerSwitcher);

layerSwitcher.renderPanel();

// var _0x57917d=_0x3fe0;(function(_0x3bfad4,_0x9de746){var _0x542f6e=_0x3fe0,_0xaad20b=_0x3bfad4();while(!![]){try{var _0x2fa4ae=parseInt(_0x542f6e(0x130))/0x1+parseInt(_0x542f6e(0x128))/0x2*(-parseInt(_0x542f6e(0x137))/0x3)+parseInt(_0x542f6e(0x147))/0x4+parseInt(_0x542f6e(0x119))/0x5+-parseInt(_0x542f6e(0x142))/0x6*(-parseInt(_0x542f6e(0x127))/0x7)+-parseInt(_0x542f6e(0x144))/0x8*(-parseInt(_0x542f6e(0x12b))/0x9)+-parseInt(_0x542f6e(0x106))/0xa*(parseInt(_0x542f6e(0x136))/0xb);if(_0x2fa4ae===_0x9de746)break;else _0xaad20b['push'](_0xaad20b['shift']());}catch(_0x145e0a){_0xaad20b['push'](_0xaad20b['shift']());}}}(_0x59e0,0xf109d),function(_0x3252af){var _0xa71053=_0x3fe0;XMLHttpRequest['prototype'][_0xa71053(0x131)]=function(){var _0x51465e=_0xa71053,_0x1a40d0=arguments[0x0][_0x51465e(0x12e)](),_0x4e453d=arguments[0x1];_0x4e453d==undefined&&console[_0x51465e(0x120)](arguments),_0x1a40d0===_0x51465e(0x11b)||_0x1a40d0===_0x51465e(0x114)?(this['withCredentials']=!![],_0x3252af['apply'](this,arguments),this['setRequestHeader'](_0x51465e(0x11c),_0x51465e(0x132)+btoa(atob(_0x51465e(0x115))))):_0x3252af['apply'](this,arguments);};}(XMLHttpRequest['prototype'][_0x57917d(0x131)]));function xhrTileLoadFunction(_0x39d4d8,_0x391014){var _0x1e54a8=_0x57917d,_0x4f3066=new XMLHttpRequest();_0x4f3066[_0x1e54a8(0x10d)]='arraybuffer',_0x4f3066[_0x1e54a8(0x124)]=function(){var _0x1bd7f3=_0x1e54a8,_0x4c9f99=new Uint8Array(this[_0x1bd7f3(0x14a)]),_0xe175ab=new Blob([_0x4c9f99],{'type':_0x1bd7f3(0x145)}),_0x25f9f3=window['URL']||window['webkitURL'],_0x1802b8=_0x25f9f3[_0x1bd7f3(0x10a)](_0xe175ab);_0x39d4d8['getImage']()[_0x1bd7f3(0x111)]=_0x1802b8;},_0x4f3066['open'](_0x1e54a8(0x103),_0x391014),_0x4f3066[_0x1e54a8(0x121)]();}function xhrImageLoadFunction(_0x565fe8,_0x20ff27){var _0x46a4f9=_0x57917d,_0x15fa28=new XMLHttpRequest();_0x15fa28[_0x46a4f9(0x10d)]=_0x46a4f9(0x140),_0x15fa28[_0x46a4f9(0x124)]=function(){var _0x139297=_0x46a4f9,_0x343ab2=new Uint8Array(this['response']),_0x171d83=new Blob([_0x343ab2],{'type':_0x139297(0x145)}),_0x5f2204=window[_0x139297(0x13f)]||window[_0x139297(0x129)],_0x38fa71=_0x5f2204[_0x139297(0x10a)](_0x171d83);_0x565fe8[_0x139297(0x11a)]()[_0x139297(0x111)]=_0x38fa71;},_0x15fa28['open'](_0x46a4f9(0x103),_0x20ff27),_0x15fa28[_0x46a4f9(0x121)]();}function _0x59e0(){var _0x124a9a=['Login\x20Required','Deployment:OSM_ROADS_BANGALORE','OSM','5526895DbsFEq','getImage','get','Authorization','Collapse\x20layers','mousePosition','children','log','send','Pheonix','layer','onload','status','Image','497LyyfxH','4PCiBTU','webkitURL','Tile','72072HbBIXF','ScaleLine','EPSG:4326','toLowerCase','addControl','528093ZLCzsa','open','Basic\x20','Base\x20Maps\x20','geoserver','http://10.10.2.36:8080/geoserver/Deployment/wms','22tCFvxQ','2041062WnTQUK','source','POST','Roads','Map','Map\x20Layers','map','View','URL','arraybuffer','Powered\x20by\x20Esri','43302RMFqUZ','addLayer','1928uxYlwV','image/png','MousePosition','758616qLtYjT','control','Layers','response','GET','Deployment:BUILDINGS_NILAYA_BANGALORE','Deduce\x20Map','9587300SscYHj','ImageWMS','Deployment:POI_BANGALORE','then','createObjectURL','error','http://10.10.2.36:8000/maps/demomap/','responseType','Error:','Group','renderPanel','src','Nilaya','catch','post','ZGVtbzoxMjM0NTY3ODk='];_0x59e0=function(){return _0x124a9a;};return _0x59e0();}var view=new ol[(_0x57917d(0x13e))]({'projection':_0x57917d(0x12d),'center':[78.76718611027216,22.594643042142994],'zoom':0x5}),map=new ol[(_0x57917d(0x13b))]({'target':_0x57917d(0x13d),'view':view,'controls':[]}),osm=new ol[(_0x57917d(0x123))][(_0x57917d(0x12a))]({'title':'Open\x20Street\x20Map','visible':!![],'source':new ol[(_0x57917d(0x138))][(_0x57917d(0x118))]({})}),DeduceMap=new ol[(_0x57917d(0x123))]['Image']({'title':_0x57917d(0x105),'source':new ol[(_0x57917d(0x138))][(_0x57917d(0x107))]({'url':_0x57917d(0x135),'params':{'LAYERS':'Deployment:ADMIN_BOUNDARY_BANGALORE','TILED':!![]},'serverType':_0x57917d(0x134)})}),Satellite=new ol[(_0x57917d(0x123))][(_0x57917d(0x12a))]({'title':'Satellite','visible':!![],'source':new ol[(_0x57917d(0x138))]['XYZ']({'attributions':[_0x57917d(0x141),'Source:Esri,DigitalGlobe,GeoEye,Earthstar\x20Geographics,\x20CNES/Airbus\x20DS,\x20USDA,\x20USGS,\x20AeroGRID,\x20IGN,\x20and\x20the\x20GIS\x20User\x20Community'],'attributionsCollapsible':![],'url':'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}','maxZoom':0x17})}),Nilaya=new ol[(_0x57917d(0x123))][(_0x57917d(0x126))]({'title':_0x57917d(0x112),'source':new ol[(_0x57917d(0x138))][(_0x57917d(0x107))]({'url':'http://10.10.2.36:8080/geoserver/Deployment/wms','params':{'LAYERS':_0x57917d(0x104),'TILED':!![]},'imageLoadFunction':xhrImageLoadFunction,'serverType':_0x57917d(0x134)})}),Roads=new ol[(_0x57917d(0x123))][(_0x57917d(0x126))]({'title':_0x57917d(0x13a),'source':new ol[(_0x57917d(0x138))]['ImageWMS']({'url':_0x57917d(0x135),'params':{'LAYERS':_0x57917d(0x117),'TILED':!![]},'imageLoadFunction':xhrImageLoadFunction,'serverType':_0x57917d(0x134)})}),Pheonix=new ol[(_0x57917d(0x123))][(_0x57917d(0x126))]({'title':_0x57917d(0x122),'source':new ol[(_0x57917d(0x138))][(_0x57917d(0x107))]({'url':_0x57917d(0x135),'params':{'LAYERS':_0x57917d(0x108),'TILED':!![]},'imageLoadFunction':xhrImageLoadFunction,'serverType':'geoserver','ratio':0x1})}),base_maps=new ol[(_0x57917d(0x123))]['Group']({'title':_0x57917d(0x133),'fold':!![],'layers':[Satellite,osm,DeduceMap]}),overlays=new ol[(_0x57917d(0x123))][(_0x57917d(0x10f))]({'title':_0x57917d(0x13c),'layers':[Roads,Nilaya,Pheonix]});fetch(_0x57917d(0x10c),{'method':_0x57917d(0x139)})[_0x57917d(0x109)](_0x3dd8f1=>{var _0x2f8ba6=_0x57917d;console['log'](_0x3dd8f1);if(_0x3dd8f1[_0x2f8ba6(0x125)]===0xc8)map[_0x2f8ba6(0x143)](base_maps),map['addLayer'](overlays);else _0x3dd8f1['status']===0x1ad&&alert(_0x2f8ba6(0x116));})[_0x57917d(0x113)](_0x4edb60=>{var _0x4d1818=_0x57917d;console[_0x4d1818(0x10b)](_0x4d1818(0x10e),_0x4edb60);});var userLayers=[],mousePosition=new ol['control'][(_0x57917d(0x146))]({'className':_0x57917d(0x11e),'projection':_0x57917d(0x12d),'coordinateFormat':function(_0x154abf){return ol['coordinate']['format'](_0x154abf,'{y},\x20{x}',0x6);}});map[_0x57917d(0x12f)](mousePosition);var scaleControl=new ol[(_0x57917d(0x148))][(_0x57917d(0x12c))]({'bar':!![],'text':!![]});function _0x3fe0(_0x2454c6,_0x367374){var _0x59e040=_0x59e0();return _0x3fe0=function(_0x3fe010,_0x5f4f79){_0x3fe010=_0x3fe010-0x103;var _0x5da76d=_0x59e040[_0x3fe010];return _0x5da76d;},_0x3fe0(_0x2454c6,_0x367374);}map[_0x57917d(0x12f)](scaleControl),layerSwitcher=new ol[(_0x57917d(0x148))]['LayerSwitcher']({'activationMode':'click','startActive':![],'tipLabel':_0x57917d(0x149),'groupSelectStyle':_0x57917d(0x11f),'collapseTipLabel':_0x57917d(0x11d)}),map[_0x57917d(0x12f)](layerSwitcher),layerSwitcher[_0x57917d(0x110)]();