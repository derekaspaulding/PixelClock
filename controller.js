"use strict";
window.clock = window.clock || {};

function Controller() {
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

	this.init = function () {
		this.canvas.width = this.canvas.scrollWidth;
		this.canvas.height = this.canvas.scrollHeight;
		this.ctx = this.canvas.getContext('2d');

		this.pixelSize = 20;
		this.width = 37;
		this.height = 8;

		for(var i = 0; i < this.width; i++) {
			for(var j = 0; j < this.height; j++) {
				var r = Math.floor(i * (127.5 / this.width) + j * (127.5 / this.height));
				var g = Math.floor(i * (127.5 / this.width) + j * (127.5 / this.height));
				var b = Math.floor(i * (127.5 / this.width) + j * (127.5 / this.height));
				this.fillPixel(i, j, r, g, b)
			}
		}
	};

	this.fillPixel = function(x, y, r, g, b) {
		var color = "rgb(" + r + ", " + g + ", " + b + ")";
		var bgColor = "rgb(" + this.bgColor.r + ", " + this.bgColor.g + ", " + this.bgColor.b + ")";
		console.log(color);

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

	this.stamp = function(x, y, mask) {
		for(var i = 0; i < mask.length; i++) {
			for(var j = 0; j < mask[i].length; j++) {
				if(mask[i][j].r && mask[i][j].g && mask[i][j].b) {
					this.fillPixel(x + i, y + j, mask[i][j].r, mask[i][j].g, mask[i][j].b);
				}
			}
		}
	};

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
