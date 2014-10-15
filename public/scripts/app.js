	define([
	'marionette',
	'config/settings'
], function(Marionette){

	var App = new Marionette.Application();

	App.addRegions({
		headerRegion: '#header-region',
		navRegion: '#nav-region',
		mainRegion:'#main-region'
	});

	App.on('before:start', function(){

	});

	App.addInitializer(function(){
		require(['modules/header/header_app','modules/nav/nav_app']);
	});

	App.on('start', function() {
		require([
			// 'modules/header/home_app',
			// "apps/calendar/calendar_app"
		], function(){

			if (Backbone.history) {
				Backbone.history.start();
			}

			$(document).on('click', 'a:not([data-bypass])', function(e) {
				var href = $(this).attr('href');
				var protocol = this.protocol + '//';

				if (href.slice(protocol.length) !== protocol) {
					e.preventDefault();
					Backbone.history.navigate(href, true);
				}
			});

		});

	});	

	return App;
});