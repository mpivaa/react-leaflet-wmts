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
    layer: '',
    style: '',
    tilematrixSet: '',
    format: 'image/jpeg'
  },
  initialize: function initialize(url, options) {
    // (String, Object)
    this._url = url;

    var wmtsParams = _leaflet.default.extend({}, this.defaultWmtsParams),
        tileSize = options.tileSize || this.options.tileSize;

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
    _leaflet.default.TileLayer.prototype.onAdd.call(this, map);
  },
  getTileUrl: function getTileUrl(tilePoint, zoom) {
    // (Point, Number) -> String
    var map = this._map;
    crs = map.options.crs;
    tileSize = this.options.tileSize;
    nwPoint = tilePoint.multiplyBy(tileSize); //+/-1 in order to be on the tile

    nwPoint.x += 1;
    nwPoint.y -= 1;
    sePoint = nwPoint.add(new _leaflet.default.Point(tileSize, tileSize));
    nw = crs.project(map.unproject(nwPoint, zoom));
    se = crs.project(map.unproject(sePoint, zoom));
    tilewidth = se.x - nw.x;
    zoom = map.getZoom();
    ident = this.matrixIds[zoom].identifier;
    X0 = this.matrixIds[zoom].topLeftCorner.lng;
    Y0 = this.matrixIds[zoom].topLeftCorner.lat;
    tilecol = Math.floor((nw.x - X0) / tilewidth);
    tilerow = -Math.floor((nw.y - Y0) / tilewidth);
    url = _leaflet.default.Util.template(this._url, {
      s: this._getSubdomain(tilePoint)
    });
    return url + _leaflet.default.Util.getParamString(this.wmtsParams, url) + '&tilematrix=' + ident + '&tilerow=' + tilerow + '&tilecol=' + tilecol;
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