"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// From: https://github.com/mylen/leaflet.TileLayer.WMTS
var _default = _leaflet.default.TileLayer.extend({
  defaultWmtsParams: {
    service: 'WMTS',
    request: 'GetTile',
    version: '1.0.0',
    layers: '',
    styles: '',
    tilematrixSet: '',
    format: 'image/jpeg'
  },
  initialize: function initialize(url, options) {
    // (String, Object)
    this._url = url;

    var wmtsParams = _leaflet.default.extend({}, this.defaultWmtsParams);

    var tileSize = options.tileSize || this.options.tileSize;

    if (options.detectRetina && _leaflet.default.Browser.retina) {
      wmtsParams.width = wmtsParams.height = tileSize * 2;
    } else {
      wmtsParams.width = wmtsParams.height = tileSize;
    }

    for (var i in options) {
      // all keys that are not TileLayer options go to WMTS params
      if (!this.options.hasOwnProperty(i) && i != 'matrixIds') {
        wmtsParams[i] = options[i];
      }
    }

    this.wmtsParams = wmtsParams;
    this.matrixIds = options.matrixIds || this.getDefaultMatrix();

    _leaflet.default.setOptions(this, options);
  },
  onAdd: function onAdd(map) {
    this._crs = this.options.crs || map.options.crs;

    _leaflet.default.TileLayer.prototype.onAdd.call(this, map);
  },
  getTileUrl: function getTileUrl(coords) {
    // (Point, Number) -> String
    var tileSize = this.options.tileSize;
    var nwPoint = coords.multiplyBy(tileSize);
    nwPoint.x += 1;
    nwPoint.y -= 1;
    var sePoint = nwPoint.add(new _leaflet.default.Point(tileSize, tileSize));
    var zoom = this._tileZoom;

    var nw = this._crs.project(this._map.unproject(nwPoint, zoom));

    var se = this._crs.project(this._map.unproject(sePoint, zoom));

    var tilewidth = se.x - nw.x; //zoom = this._map.getZoom();

    var ident = this.matrixIds[zoom].identifier;
    var tilematrix = this.wmtsParams.tilematrixSet + ':' + ident;
    var X0 = this.matrixIds[zoom].topLeftCorner.lng;
    var Y0 = this.matrixIds[zoom].topLeftCorner.lat;
    var tilecol = Math.floor((nw.x - X0) / tilewidth);
    var tilerow = -Math.floor((nw.y - Y0) / tilewidth);

    var url = _leaflet.default.Util.template(this._url, {
      s: this._getSubdomain(coords)
    });

    return url + _leaflet.default.Util.getParamString(this.wmtsParams, url) + '&tilematrix=' + tilematrix + '&tilerow=' + tilerow + '&tilecol=' + tilecol;
    /*
      var tileBounds = this._tileCoordsToBounds(coords);
      var zoom = this._tileZoom;
      var nw = this._crs.project(tileBounds.getNorthWest());
      var se = this._crs.project(tileBounds.getSouthEast());
      var tilewidth = se.x-nw.x;
      var ident = this.matrixIds[zoom].identifier;
      var X0 = this.matrixIds[zoom].topLeftCorner.lng;
      var Y0 = this.matrixIds[zoom].topLeftCorner.lat;
      var tilecol=Math.floor((nw.x+1-X0)/tilewidth);
      var tilerow=-Math.floor((nw.y-1-Y0)/tilewidth);
      var url = L.Util.template(this._url, {s: this._getSubdomain(coords)});
      console.log(L.Util.getParamString(this.wmtsParams, url) + "&tilematrix=" + ident + "&tilerow=" + tilerow +"&tilecol=" + tilecol );
      return url + L.Util.getParamString(this.wmtsParams, url) + "&tilematrix=" + ident + "&tilerow=" + tilerow +"&tilecol=" + tilecol ;
      */
  },
  setParams: function setParams(params, noRedraw) {
    _leaflet.default.extend(this.wmtsParams, params);

    if (!noRedraw) {
      this.redraw();
    }

    return this;
  },
  getDefaultMatrix: function getDefaultMatrix() {
    /**
     * the matrix3857 represents the projection
     * for in the IGN WMTS for the google coordinates.
     */
    var matrixIds3857 = new Array(22);

    for (var i = 0; i < 22; i++) {
      matrixIds3857[i] = {
        identifier: '' + i,
        topLeftCorner: new _leaflet.default.LatLng(20037508.3428, -20037508.3428)
      };
    }

    return matrixIds3857;
  }
});

exports.default = _default;