"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactLeaflet = require("react-leaflet");

var _lodash = require("lodash");

var _wmts = _interopRequireDefault(require("./wmts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EVENTS_RE = /^on(.+)$/i;

var WMTSTileLayer =
/*#__PURE__*/
function (_GridLayer) {
  _inherits(WMTSTileLayer, _GridLayer);

  function WMTSTileLayer() {
    _classCallCheck(this, WMTSTileLayer);

    return _possibleConstructorReturn(this, _getPrototypeOf(WMTSTileLayer).apply(this, arguments));
  }

  _createClass(WMTSTileLayer, [{
    key: "createLeafletElement",
    value: function createLeafletElement(props) {
      var url = props.url,
          params = _objectWithoutProperties(props, ["url"]);

      return new _wmts.default(url, this.getOptions(params));
    }
  }, {
    key: "updateLeafletElement",
    value: function updateLeafletElement(fromProps, toProps) {
      _get(_getPrototypeOf(WMTSTileLayer.prototype), "updateLeafletElement", this).call(this, fromProps, toProps);

      var prevUrl = fromProps.url,
          _po = fromProps.opacity,
          _pz = fromProps.zIndex,
          prevParams = _objectWithoutProperties(fromProps, ["url", "opacity", "zIndex"]);

      var url = toProps.url,
          _o = toProps.opacity,
          _z = toProps.zIndex,
          params = _objectWithoutProperties(toProps, ["url", "opacity", "zIndex"]);

      if (url !== prevUrl) {
        this.leafletElement.setUrl(url);
      }

      if (!(0, _lodash.isEqual)(params, prevParams)) {
        this.leafletElement.setParams(params);
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions(params) {
      return (0, _lodash.reduce)(_get(_getPrototypeOf(WMTSTileLayer.prototype), "getOptions", this).call(this, params), function (options, value, key) {
        if (!EVENTS_RE.test(key)) {
          options[key] = value;
        }

        return options;
      }, {});
    }
  }]);

  return WMTSTileLayer;
}(_reactLeaflet.GridLayer);

var _default = (0, _reactLeaflet.withLeaflet)(WMTSTileLayer);

exports.default = _default;