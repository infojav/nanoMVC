// app.js
// application sandbox (singleton).

define([
	"jquery"
], function($) {
	"use strict";

	var _name = 'App';
	var _debug = false;
	
	var app = function() {
		return {
			getName: _getName,
			config: _config,

			model: _model,
			view: _view,
			controller: _controller,
			
			// pub/sub (Observer)
			on: _on,
			off: _off,
			emit: _emit,

			// util
			trace: _trace,
			extend: _extend
		}
	};

	var _view = {
		$: $,
		extend: function(newView) {
			_extend(newView, _view);
			return newView;
		}
	};

	var _controller = {
		extend: function(newController) {
			_extend(newController, _controller);
			return newController;
		}
	};
	var _model = {
		extend: function(newModel) {
			_extend(newModel, _model);
			return newModel;
		}
	};

	// Application configuration
	function _config(config) {
		var config = config || {};

		_name = config.name || _name;
		_debug = config.debug || _debug;
		_trace("Application: '" + _name + "' configured.");

		return this;
	};

	function _getName() {
		return this.name;
	};

	// emit / Subscribe
	// wrapping jquery on, off, emit to simulate pub/sub.
	var _o = $({});

	function _on(topic, callback, _this) {
		_o.on.call(_o, topic, callback.bind(_this));
		_trace('Event on: ' + topic);
		return this;
	};

	function _off(event) {
		_o.off.call(_o, event);
		_trace('Event off: ' + event);
		return this;
	};

	function _emit(event, data) {
		_o.trigger.call(_o, event, data);
		_trace('Emited event: ' + event);
		return this;
	};

	// Utils
	function _extend() {
		$.extend.apply({}, arguments);
	};

	function _trace(log) { 
		_debug && console.log(log); 
	};

	return app();
});