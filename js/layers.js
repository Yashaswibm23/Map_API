var button = document.createElement("div");
button.innerHTML = ``;
/* <div class="container-fluid mt-2">
<div class="row" style="justify-content: left">
    <div class="col-lg-3 col-md-3 col-xl-3 col-sm-12">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="house number, street name, locality, city, state, pincode" aria-label="Deduce Maps" aria-describedby="basic-addon2" id="searchbox">
            <div class="input-group-append">
                <button id="action-button" onclick="resetSearch()" class="btn btn-info" type="button"><img id="process" src="./icon/cros.png" alt=""></button>
            </div>
        </div>
        <div class="input-group gary-boarder recomendations" style="display: none;">
            
        </div>
    </div>
</div>
</div> */
var myControl = new ol.control.Control({ element: button });

var iconFeature = new ol.Feature({
  geometry: new ol.geom.Point([77.59416686033288, 12.972160346433755]),
  name: "Bengaluru",
});

var vectorPoint = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [iconFeature],
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 10],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: "./icon/location_1.png",
    }),
  }),
});

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
      //this.setRequestHeader("Authorization", "Basic " + btoa(user + ":" +pwd));
      this.setRequestHeader(
        "Authorization",
        "Basic " + btoa(atob("YWRtaW46c25laGE="))
      );
    } else {
      open.apply(this, arguments);
    }
  };
})(XMLHttpRequest.prototype.open);
 user = localStorage.getItem("username");
 pwd = localStorage.getItem("password");
token2=localStorage.getItem("Geoserver_Token");
// user = 'arpitha';
// pwd='1234';
// console.log(user,pwd)
// console.log("i am here ", user, pwd);

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
  //geometry: new ol.geom.Point([77.59416686033288, 12.972160346433755]),
  center: [77.59373097798546, 12.972798235385197],
  zoom: 10,
  // visible:true,
});
var map = new ol.Map({
  target: "map",
  view: view,
  controls: [myControl],
});

// ============================================================

// class RotateNorthControl extends Control {
//   /**
//    * @param {Object} [opt_options] Control options.
//    */
//   constructor(opt_options) {
//     const options = opt_options || {};

//     const button = document.createElement('button');
//     button.innerHTML = 'N';

//     const element = document.createElement('div');
//     element.className = 'rotate-north ol-unselectable ol-control';
//     element.appendChild(button);

//     super({
//       element: element,
//       target: options.target,
//     });

//     button.addEventListener('click', this.handleRotateNorth.bind(this), false);
//   }

//   handleRotateNorth() {
//     this.getMap().getView().setRotation(0);
//   }
// }
//=============================================================

var osm = new ol.layer.Tile({
  title: "Open Street Map",
  visible: true,
  source: new ol.source.OSM({
    //  url:'http://10.10.7.105:8082/tile/{z}/{x}/{y}.png'
  }),
});
// map.addLayer(osmTile);
// var DeduceMap = new ol.layer.Image({
//   title: "Deduce Map",
//   source: new ol.source.ImageWMS({
//     url: "http://10.10.5.169:8084/geoserver/INDIA/wms",
//     params: { LAYERS: "INDIA:Bangalore_BFP_Nilaya_V.3,INDIA:BNG_OSM_ROADS,INDIA:Bangalore_Poi_V1.0", TILED: true },
//     serverType: "geoserver",
//     imageLoadFunction: xhrImageLoadFunction,
//   }),
// });
// var Satellite = new ol.layer.Tile({
//   title: "Satellite",
//   visible: true,
//   source: new ol.source.XYZ({
//     attributions: [
//       "Powered by Esri",
//       "Source:Esri,DigitalGlobe,GeoEye,Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
//     ],
//     attributionsCollapsible: false,
//     url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//     maxZoom: 23,
//   }),
// });

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
    url: "http://10.10.5.169:8084/geoserver/INDIA/wms",
    params: { LAYERS: "INDIA:Bangalore_Poi_V1.0", TILED: true },
    imageLoadFunction: xhrImageLoadFunction,
    serverType: "geoserver",
    ratio: 1,
  }),
});

var base_maps = new ol.layer.Group({
  title: "Base Maps ",
  fold: true,
  layers: [osm],
  // layers: [DeduceMap],
});

// var overlays = new ol.layer.Group({
//   title: "Map Layers",
//   layers: [
//     // Buildings,
//     // akshara,
//     // Environ,
//     Roads,
//     Nilaya,
//     Pheonix,
//     // EV_dot,
//     // Admin,
//     vectorPoint,
//   ],
// });
map.addLayer(base_maps);
// map.addLayer(overlays);
var userLayers = [];

//get the access token from local storage
var token = localStorage.getItem("access_token");
const apiKey = localStorage.getItem("api_key");

// Fetch the user's permissions from the API

fetch(`http://10.10.5.171:200/maps/getlayers/?api_key=${apiKey}`, {
  headers: {
    Authorization: "Bearer " + token,
  },
})

  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // check if the user has permission to access Nilaya layer and add it to userLayers if true
    if (data.permissions.includes("Bangalore_BFP_Nilaya_V.3")) {
      userLayers.push(Nilaya);
    } // check if the user has permission to access Pheonix layer and add it to userLayers if true

    if (data.permissions.includes("Bangalore_Poi_V1.0")) {
      userLayers.push(Pheonix);
    } // check if the user has permission to access Roads layer and add it to userLayers if true

    if (data.permissions.includes("Roads_Bangalore_V4.42")) {
      userLayers.push(Roads);
    } // create the layer group with the user's layers

    const overlays = new ol.layer.Group({
      title: "Map Layers",
      layers: userLayers,
    });

    map.addLayer(overlays);
  })
  .catch((error) => {
    console.error("Error fetching permission data:", error);
  });

// var userLayers = [];

// // get the access token from local storage
// var username = localStorage.getItem("username");
// var token = 'YWRtaW46Z2Vvc2VydmVy'
// // Fetch the user's permissions from the API
// fetch(`http://10.10.7.43:8084/geoserver/rest/security/roles/user/${username}`, {
//   headers: {
//     Authorization: "Basic " + token,
//     Accept: "application/json"
//   }
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then(data => {
//     // check if the user has permission to access Nilaya layer and add it to userLayers if true
//     if (data.roles.includes("Bangalore_BFP_Nilaya_V.3")) {
//       userLayers.push(Nilaya);
//     }
//     // check if the user has permission to access Pheonix layer and add it to userLayers if true
//     if (data.roles.includes("Bangalore_Poi_V1.0")) {
//       userLayers.push(Pheonix);
//     }
//     // check if the user has permission to access Roads layer and add it to userLayers if true
//     if (data.roles.includes("Bangalore_Roads")) {
//       userLayers.push(Roads);
//     }
//     // create the layer group with the user's layers
//     const overlays = new ol.layer.Group({
//       title: "Map Layers",
//       layers: userLayers
//     });
//     map.addLayer(overlays);
//   })
//   .catch(error => {
//     console.error("Error fetching permission data:", error);
//   });


// const overlays = new ol.layer.Group({
//   title: "Map Layers",
//   layers: userLayers,
// });
// map.addLayer(overlays);

// =========================================================

// var popup = new Popup();
// map.addOverlay(popup);

var element = document.getElementById("popup");

var popup = new ol.Overlay({
  element: element,
  positioning: "bottom-center",
  stopEvent: false,
  offset: [0, -50],
});
map.addOverlay(popup);

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

// var geocoder = new Geocoder('nominatim', {
//     provider: 'osm',
//     lang: 'en',
//     placeholder: 'Search for ...',
//     limit: 5,
//     debug: false,
//     autoComplete: true,
//     keepOpen: true
// });

// console.log(geocoder)
// map.addControl(geocoder);

// geocoder.on('addresschosen', function(evt) {
//     //console.info(evt);
//     if (popup) {
//         popup.hide();
//     }
//     window.setTimeout(function() {
//         popup.show(evt.coordinate, evt.address.formatted);
//     }, 3000);
// });

// ====================================== hhh ================================
function recomendAddressHtml(index, address, lat, lon) {
  return `<div id="${index}_address "style="width: inherit;padding: 8px;" class="d-flex address"><img class="logo-text" src="./icon/search.svg" alt=""><span class="d-inline-block text-truncate trunc-text" >
                  <a class="address-link" href="javascript:go(${lat},${lon},'${address}')">${address}</a>
                  </span>
              </div>`;
}

function afddressNotfound() {
  return `<div "style="width: inherit;padding: 8px;" class="d-flex">
              <span class="d-inline-block" style="padding: 7px;font-size: medium;color: #aeaeae;">No result found !!
              </span>
          </div>`;
}

function go(lat, lon, address) {
  resetSearch();
  zoomToLocation([lon, lat], (duration = 300), iconFeature, 20),
    popout(iconFeature, address);
  console.log(lat + ", " + lon);
}

// format=json
// lat=12.958078
// lon=77.6595077
// limit=1
var regTest = /[-+]?[0-9]*\.?[0-9]*/gi;

var urlr = new URL("http://10.10.2.36:8000/reverse/");
urlr.searchParams.set("format", "json");
urlr.searchParams.set("limit", "5");

var url = new URL("http://10.10.2.36:8000/search.php/");
url.searchParams.set("format", "json");
url.searchParams.set("limit", "5");

function delay(callback, ms) {
  var timer = 0;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

function resetSearch() {
  console.log($("#process").hasClass("search-progress"));
  if (!$("#process").hasClass("search-progress")) {
    $(".recomendations").empty();
    $(".recomendations").hide();
    $("input#searchbox").val("");
    $("#action-button").removeClass("boarder-top-right");
    $("#searchbox").removeClass("boarder-top-left");
  }
}

$("input#searchbox").keyup(
  delay(function (e) {
    console.log(this.value);
    if (this.value == "") return;

    var matched = this.value.match(regTest);
    var numberOfMatch =
      matched && matched.length == 2 ? matched.join("").length : 0;
    if (numberOfMatch / this.value.length > 0.85) {
      matched = matched.map((A) => Number(A));
      urlr.searchParams.set("lat", matched[0]);
      urlr.searchParams.set("lat", matched[1]);
      var urlHref = urlr.href;
    } else {
      url.searchParams.set("q", this.value);
      var urlHref = url.href;
    }
    $("#process").attr("class", "search-progress");
    $("#process").attr("src", "./icon/Rolling.svg");
    fetch(urlHref, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "sec-ch-ua":
          '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    })
      .then((A) => A.json())
      .then((A) => {
        $(".recomendations").empty();
        $(".recomendations").show();
        if (!A.length) {
          $(".recomendations").append(afddressNotfound);

          $("#process").attr("src", "./icon/cros.png");
          $("#process").removeClass("search-progress");
          $("#action-button").addClass("boarder-top-right");
          $("#searchbox").addClass("boarder-top-left");
        }
        A.forEach((rec) => {
          $(".recomendations").append(
            recomendAddressHtml(rec.osm_id, rec.display_name, rec.lat, rec.lon)
          );
        });

        $("#process").attr("src", "./icon/cros.png");
        $("#process").removeClass("search-progress");
        $("#action-button").addClass("boarder-top-right");
        $("#searchbox").addClass("boarder-top-left");
      })
      .catch((e) => {
        $(".recomendations").empty();
        $(".recomendations").show();
        $(".recomendations").append(afddressNotfound);

        $("#process").attr("src", "./icon/cros.png");
        $("#process").removeClass("search-progress");
        $("#action-button").addClass("boarder-top-right");
        $("#searchbox").addClass("boarder-top-left");
      });
  }, 500)
);

// ============================ zoom to location ================================
function zoomToLocation(location, duration = 300, pointFeature, zoom = 15) {
  map.getView().animate({
    center: location,
    duration: duration,
    zoom: zoom,
  });
  pointFeature.setGeometry(new ol.geom.Point(location));
}

function popout(pointFeature, location_info) {
  var popover = bootstrap.Popover.getInstance(element);
  if (popover) {
    popover.dispose();
  }
  var coordinates = pointFeature.getGeometry().getCoordinates();
  console.log(coordinates);
  popup.setPosition(coordinates);
  var lat = coordinates[1];
  var lon = coordinates[0];
  popover = new bootstrap.Popover(element, {
    animation: false,
    container: element,
    content:
      "<p>Address: <code>" +
      location_info +
      "</code></p>" +
      "<p><code>" +
      lat +
      ", " +
      lon +
      "</code></p>",
    html: true,
    placement: "top",
    title: "X",
  });
  popover.show();
}
