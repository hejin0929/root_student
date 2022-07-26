"use strict";
exports.__esModule = true;
var mobx_1 = require("mobx");
var DetailsStore = /** @class */ (function () {
    function DetailsStore() {
        this.english = "";
        mobx_1.makeAutoObservable(this);
    }
    DetailsStore.prototype.handleRecord = function () {
        var _this = this;
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (res) {
            var chumks = [];
            _this.record = new MediaRecorder(res);
            Audios.start();
            Audios.ondataavailable = function (e) {
                chumks.push(e.data);
            };
            setTimeout(function () { return Audios.stop(); }, 3000);
            Audios.onstop = function () {
                var blob = new Blob(chumks, { type: "audio/webm;codes=opus" });
                var file = new window.File([blob], "record.webm");
                _this.url = (window.URL || webkitURL).createObjectURL(blob);
            };
        });
    };
    return DetailsStore;
}());
exports["default"] = DetailsStore;
