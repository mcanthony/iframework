// extends src/nodes/time.js which extends src/node-box-native-view.js

$(function(){

  Iframework.NativeNodes["time-throttle"] = Iframework.NativeNodes["time"].extend({

    info: {
      title: "throttle",
      description: "too many fps? use throttle to limit data rate passing through flow."
    },
    initializeModule: function(){
    },
    _ms: 1000/30,
    inputfps: function(fps){
      this._ms = 1000/fps;
      this.$(".info").text(fps+"fps, "+Math.round(this._ms*100)/100+"ms");
    },
    _lastTime: 0,
    redraw: function(timestamp){
      if(timestamp-this._lastTime >= this._ms) {
        this.send("data", this._data);
        this._lastTime = timestamp;
      }
    },
    inputs: {
      data: {
        type: "all",
        description: "data to throttle"
      },
      fps: {
        type: "float",
        description: "maximum frames per second",
        "default": 30
      }
    },
    outputs: {
      data: {
        type: "all"
      }
    }

  });


});
