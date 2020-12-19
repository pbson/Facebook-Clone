"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = void 0;

var _socket = _interopRequireDefault(require("socket.io-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var socket = (0, _socket["default"])('http://192.168.0.140:3000', {
  forceNew: true,
  jsonp: false,
  transports: ['websocket']
});
exports.socket = socket;
socket.on('connection', function () {
  console.log('connection set');
});