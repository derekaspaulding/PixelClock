"use strict";
window.clock = window.clock || {};

function Controller() {
	this.currentInterval;
	this.pixelMatrix = [];
	this.canvas = document.querySelector('#pixelCanvas');
	this.ctx;
	this.pixelSize;
	this.width; // Width in our pixels
	this.height;
	this.bgColor = {
		r: 0,
		g: 0,
		b: 0
	}

	this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890:";
	this.lettersIndex = 0;
	
	this.init = function () {
		this.canvas.width = this.canvas.scrollWidth;
		this.canvas.height = this.canvas.scrollHeight;
		this.ctx = this.canvas.getContext('2d');

		this.pixelSize = 20;
		this.width = 40;
		this.height = 24;

		for(var i = 0; i < this.width; i++) {
			for(var j = 0; j < this.height; j++) {
				/*
				var r = Math.floor(i * (127.5 / this.width) + j * (127.5 / this.height));
				var g = Math.floor(i * (127.5 / this.width) + j * (127.5 / this.height));
				var b = Math.floor(i * (127.5 / this.width) + j * (127.5 / this.height));
				*/
				this.fillPixel(i, j, this.bgColor.r, this.bgColor.g, this.bgColor.b)
			}
		}
		/*
		this.stamp(0, 1, window.clock.chars.getMask('0'));
		this.stamp(4, 1, window.clock.chars.getMask('1'));
		this.stamp(7, 1, window.clock.chars.getMask(':'));
		this.stamp(10, 1, window.clock.chars.getMask('0'));
		this.stamp(14, 1, window.clock.chars.getMask('9'));
		*/

		var next = document.querySelector('#next');
		var clockStart = document.querySelector('#clock');

		next.addEventListener('click', function(e) {
			var mask = window.clock.chars.getMask(window.clock.controller.letters[window.clock.controller.lettersIndex]);
			window.clock.controller.lettersIndex = window.clock.controller.lettersIndex == window.clock.controller.letters.length - 1 ? 0 : window.clock.controller.lettersIndex + 1;

			window.clock.controller.clearAllPixels();
			window.clock.controller.stampCenter(mask);
		});

		clockStart.addEventListener('click', function(e) {
			clearInterval(this.currentInterval);
			window.clock.clock.startClock();
		});
	};

	this.clearInterval = function() {
		if(Array.isArray(this.currentInterval)) {
			for(var i = 0; i < this.currentInterval.length; i++) {
				clearInterval(this.currentInterval[i]);
			}
		}
		else if((typeof this.currentInterval) === 'number') {
			clearInterval(this.currentInterval);
		}
	}

	this.fillPixel = function(x, y, r, g, b) {
		var color = "rgb(" + r + ", " + g + ", " + b + ")";
		var bgColor = "rgb(" + this.bgColor.r + ", " + this.bgColor.g + ", " + this.bgColor.b + ")";

		this.ctx.beginPath();
		this.ctx.rect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
		this.ctx.fillStyle = color;
		this.ctx.strokeStyle = bgColor;
		this.ctx.stroke();
		this.ctx.fill();
	};

	this.clearPixel = function(x, y) {
		this.fillPixel(x, y, this.bgColor.r, this.bgColor.g, this.bgColor.b);
	};

	this.clearAllPixels = function () {
		for(var i = 0; i < this.width; i++){
			for(var j = 0; j < this.height; j++) {
				this.clearPixel(i, j);
			}
		}
	};

	this.stamp = function(x, y, mask) {
		for(var i = 0; i < mask.length; i++) {
			for(var j = 0; j < mask[i].length; j++) {
				if(mask[i][j].r && mask[i][j].g && mask[i][j].b) {
					this.fillPixel(x + j, y + i, mask[i][j].r, mask[i][j].g, mask[i][j].b);
				}
			}
		}
	};

	this.stampCenter = function(mask) {
		var height = mask.length;
		var width = mask[0].length;
		var marginX = Math.floor((this.width - width) / 2);
		var marginY = Math.floor((this.height - height) / 2);
		this.stamp(marginX, marginY, mask);
	}

	this.getRandomColor = function() {
		var values = '123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			var colorVal = values[Math.floor(Math.random() * values.length)];
			color += colorVal;
		}
		return color;
	};

	this.test = function() {
	};
}

	window.clock.controller = new Controller();

	window.clock.controller.init();
