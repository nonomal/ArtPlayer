(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ArtplayerToolThumbnail = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var tinyEmitter = {exports: {}};

  function E () {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
  }

  E.prototype = {
    on: function (name, callback, ctx) {
      var e = this.e || (this.e = {});

      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx
      });

      return this;
    },

    once: function (name, callback, ctx) {
      var self = this;
      function listener () {
        self.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },

    emit: function (name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i = 0;
      var len = evtArr.length;

      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }

      return this;
    },

    off: function (name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];

      if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
        }
      }

      // Remove event from queue to prevent memory leak
      // Suggested by https://github.com/lazd
      // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

      (liveEvents.length)
        ? e[name] = liveEvents
        : delete e[name];

      return this;
    }
  };

  tinyEmitter.exports = E;
  tinyEmitter.exports.TinyEmitter = E;

  var Emitter = tinyEmitter.exports;

  function sleep(ms) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  }
  function runPromisesInSeries(ps) {
    return ps.reduce(function (p, next) {
      return p.then(next);
    }, Promise.resolve());
  }
  function getFileName(name) {
    var nameArray = name.split('.');
    nameArray.pop();
    return nameArray.join('.');
  }
  function clamp(num, a, b) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
  }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var ArtplayerToolThumbnail = /*#__PURE__*/function (_Emitter) {
    _inherits(ArtplayerToolThumbnail, _Emitter);

    var _super = _createSuper(ArtplayerToolThumbnail);

    function ArtplayerToolThumbnail() {
      var _this;

      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, ArtplayerToolThumbnail);

      _this = _super.call(this);
      _this.processing = false;
      _this.option = {};

      _this.setup(Object.assign({}, ArtplayerToolThumbnail.DEFAULTS, option));

      _this.video = ArtplayerToolThumbnail.creatVideo();
      _this.duration = 0;
      _this.inputChange = _this.inputChange.bind(_assertThisInitialized(_this));
      _this.ondrop = _this.ondrop.bind(_assertThisInitialized(_this));

      _this.option.fileInput.addEventListener('change', _this.inputChange);

      _this.option.fileInput.addEventListener('dragover', ArtplayerToolThumbnail.ondragover);

      _this.option.fileInput.addEventListener('drop', ArtplayerToolThumbnail.ondrop);

      return _this;
    }

    _createClass(ArtplayerToolThumbnail, [{
      key: "ondrop",
      value: function ondrop(event) {
        event.preventDefault();
        var file = event.dataTransfer.files[0];
        this.loadVideo(file);
      }
    }, {
      key: "setup",
      value: function setup() {
        var _this2 = this;

        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.option = Object.assign({}, this.option, option);
        var _this$option = this.option,
            fileInput = _this$option.fileInput,
            number = _this$option.number,
            width = _this$option.width,
            column = _this$option.column;
        this.errorHandle(fileInput instanceof Element, "The 'fileInput' is not a Element");

        if (!(fileInput.tagName === 'INPUT' && fileInput.type === 'file')) {
          fileInput.style.position = 'relative';
          var newFileInput = document.createElement('input');
          newFileInput.type = 'file';
          newFileInput.style.position = 'absolute';
          newFileInput.style.width = '100%';
          newFileInput.style.height = '100%';
          newFileInput.style.left = '0';
          newFileInput.style.top = '0';
          newFileInput.style.right = '0';
          newFileInput.style.bottom = '0';
          newFileInput.style.opacity = '0';
          fileInput.appendChild(newFileInput);
          this.option.fileInput = newFileInput;
        }

        ['number', 'width', 'column', 'begin', 'end'].forEach(function (item) {
          _this2.errorHandle(typeof _this2.option[item] === 'number', "The '".concat(item, "' is not a number"));
        });
        this.option.number = clamp(number, 10, 1000);
        this.option.width = clamp(width, 10, 1000);
        this.option.column = clamp(column, 1, 1000);
        return this;
      }
    }, {
      key: "inputChange",
      value: function inputChange(event) {
        var file = this.option.fileInput.files[0];
        this.loadVideo(file);
        event.target.value = '';
      }
    }, {
      key: "loadVideo",
      value: function loadVideo(file) {
        if (file) {
          var canPlayType = this.video.canPlayType(file.type);
          this.errorHandle(canPlayType === 'maybe' || canPlayType === 'probably', "Playback of this file format is not supported: ".concat(file.type));
          var videoUrl = URL.createObjectURL(file);
          this.videoUrl = videoUrl;
          this.file = file;
          this.emit('file', this.file);
          this.video.src = videoUrl;
          this.emit('video', this.video);
        }
      }
    }, {
      key: "start",
      value: function start() {
        var _this3 = this;

        if (!this.video.duration) return sleep(1000).then(function () {
          return _this3.start();
        });
        var _this$option2 = this.option,
            width = _this$option2.width,
            number = _this$option2.number,
            begin = _this$option2.begin,
            end = _this$option2.end;
        var height = this.video.videoHeight / this.video.videoWidth * width;
        this.option.height = height;
        this.option.begin = clamp(begin, 0, this.video.duration);
        this.option.end = clamp(end || this.video.duration, begin, this.video.duration);
        this.errorHandle(this.option.end > this.option.begin, "End time must be greater than the start time");
        this.duration = this.option.end - this.option.begin;
        this.density = number / this.duration;
        this.errorHandle(this.file && this.video, 'Please select the video file first');
        this.errorHandle(!this.processing, 'There is currently a task in progress, please wait a moment...');
        this.errorHandle(this.density <= 1, "The preview density cannot be greater than 1, but got ".concat(this.density));
        var screenshotDate = this.creatScreenshotDate();
        var canvas = this.creatCanvas();
        var context2D = canvas.getContext('2d');
        this.emit('canvas', canvas);
        var promiseList = screenshotDate.map(function (item, index) {
          return function () {
            return new Promise(function (resolve) {
              _this3.video.oncanplay = function () {
                context2D.drawImage(_this3.video, item.x, item.y, width, height);
                canvas.toBlob(function (blob) {
                  if (_this3.thumbnailUrl) {
                    URL.revokeObjectURL(_this3.thumbnailUrl);
                  }

                  _this3.thumbnailUrl = URL.createObjectURL(blob);

                  _this3.emit('update', _this3.thumbnailUrl, (index + 1) / number);

                  _this3.video.oncanplay = null;
                  resolve();
                });
              };

              _this3.video.currentTime = item.time;
            });
          };
        });
        this.processing = true;
        return runPromisesInSeries(promiseList).then(function () {
          _this3.processing = false;

          _this3.emit('done');
        }).catch(function (err) {
          _this3.processing = false;

          _this3.emit('error', err.message);

          throw err;
        });
      }
    }, {
      key: "creatScreenshotDate",
      value: function creatScreenshotDate() {
        var _this$option3 = this.option,
            number = _this$option3.number,
            width = _this$option3.width,
            height = _this$option3.height,
            column = _this$option3.column,
            begin = _this$option3.begin;
        var timeGap = this.duration / number;
        var timePoints = [begin + timeGap];

        while (timePoints.length < number) {
          var last = timePoints[timePoints.length - 1];
          timePoints.push(last + timeGap);
        }

        return timePoints.map(function (item, index) {
          return {
            time: item - timeGap / 2,
            x: index % column * width,
            y: Math.floor(index / column) * height
          };
        });
      }
    }, {
      key: "creatCanvas",
      value: function creatCanvas() {
        var _this$option4 = this.option,
            number = _this$option4.number,
            width = _this$option4.width,
            height = _this$option4.height,
            column = _this$option4.column;
        var canvas = document.createElement('canvas');
        var context2D = canvas.getContext('2d');
        canvas.width = width * column;
        canvas.height = Math.ceil(number / column) * height + 30;
        context2D.fillStyle = 'black';
        context2D.fillRect(0, 0, canvas.width, canvas.height);
        context2D.font = '14px Georgia';
        context2D.fillStyle = '#fff';
        context2D.fillText("From: https://artplayer.org/, Number: ".concat(number, ", Width: ").concat(width, ", Height: ").concat(height, ", Column: ").concat(column), 10, canvas.height - 11);
        return canvas;
      }
    }, {
      key: "download",
      value: function download() {
        this.errorHandle(this.file && this.thumbnailUrl, 'Download does not seem to be ready, please create preview first');
        this.errorHandle(!this.processing, 'There is currently a task in progress, please wait a moment...');
        var elink = document.createElement('a');
        var name = "".concat(getFileName(this.file.name), ".png");
        elink.download = name;
        elink.href = this.thumbnailUrl;
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
        this.emit('download', name);
        return this;
      }
    }, {
      key: "errorHandle",
      value: function errorHandle(condition, msg) {
        if (!condition) {
          this.emit('error', msg);
          throw new Error(msg);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.option.fileInput.removeEventListener('change', this.inputChange);
        this.option.fileInput.removeEventListener('dragover', ArtplayerToolThumbnail.ondragover);
        this.option.fileInput.removeEventListener('drop', ArtplayerToolThumbnail.ondrop);
        document.body.removeChild(this.video);

        if (this.videoUrl) {
          URL.revokeObjectURL(this.videoUrl);
        }

        if (this.thumbnailUrl) {
          URL.revokeObjectURL(this.thumbnailUrl);
        }

        this.emit('destroy');
      }
    }], [{
      key: "DEFAULTS",
      get: function get() {
        return {
          number: 60,
          width: 160,
          height: 90,
          column: 10,
          begin: 0,
          end: NaN
        };
      }
    }, {
      key: "ondragover",
      value: function ondragover(event) {
        event.preventDefault();
      }
    }, {
      key: "creatVideo",
      value: function creatVideo() {
        var video = document.createElement('video');
        video.style.position = 'absolute';
        video.style.top = '-9999px';
        video.style.left = '-9999px';
        video.muted = true;
        video.controls = true;
        document.body.appendChild(video);
        return video;
      }
    }]);

    return ArtplayerToolThumbnail;
  }(Emitter);

  return ArtplayerToolThumbnail;

}));
//# sourceMappingURL=artplayer-tool-thumbnail.js.map
