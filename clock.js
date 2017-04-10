"use strict";
window.clock = window.clock || {};

function Clock() {
	this.startClock = function() {
		window.clock.controller.clearInterval();
		window.clock.controller.currentInterval = setInterval(this.drawClock.bind(this), 1000);
	}

	this.drawClock = function(seconds) {
		window.clock.controller.clearAllPixels();
		// var now = new Date(2016, 12, 31, 11, 13, 43, 500);
		var now = new Date();
		var hour = now.getHours() % 13;
		var hour2;
		var min = now.getMinutes();
		var sec = seconds ? now.getSeconds() : -1;

		if(hour >= 10) {
			hour2 = hour % 10;
			hour = Math.floor(hour / 10);
		}

		var min1 = Math.floor(min / 10);
		var min2 = min % 10;

		var mask = window.clock.chars.getMask(hour.toString());

		if(hour2 >= 0){
			mask = this.addCharToMask(mask, hour2.toString());
		}

		mask = this.addCharToMask(mask, ":");

		mask = this.addCharToMask(mask, min1.toString());
		mask = this.addCharToMask(mask, min2.toString());

		if(sec >= 0) {
			var sec1 = Math.floor(sec / 10);
			var sec2 = sec % 10;
			
			mask = this.addCharToMask(mask, ":");
			mask = this.addCharToMask(mask, sec1.toString());
			mask = this.addCharToMask(mask, sec2.toString());
		}
		
		window.clock.controller.stampCenter(mask);
	}

	this.addCharToMask = function(mask, ch) {
		if(!Array.isArray(mask)) {
			return false;
		}
		var charMask = window.clock.chars.getMask(ch);
		if(!charMask) {
			return false;
		}

		if(charMask.length !== mask.length) {
			return false;
		}

		for(var i = 0; i < mask.length; i++) {
			mask[i].push(0);
		}

		for(var y = 0; y < charMask.length; y++) {
			for(var x = 0; x < charMask[y].length; x++) {
				mask[y].push(charMask[y][x]);
			}
		}

		return mask;
	}
}

window.clock.clock = new Clock();
