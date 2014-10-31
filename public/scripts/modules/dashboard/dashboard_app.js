define([
	'app',	
], function(App){

		App.module('DashBoardApp', function(DashBoardApp, App, Backbone, Marionette, $, _){

		DashBoardApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				'dashboard': 'show'
			}
		});
		
		var API = {
			show: function(uri, options){
				// var controllerOptions = options || {};
				// controllerOptions.id = this.getIdFromUri(uri);
				// controllerOptions.uri = uri;

				require(['modules/dashboard/show/show_controller'], function(){
					new DashBoardApp.Show.Controller();
				});

				// App.trigger('nav:active:change', '#schedule');
			},

			// getIdFromUri: function(uri){
			// 	return _.last(uri.split('-'));
			// },
		};

		// App.vent.on('show:home:page', function(options){
		// 	var username = options.get('username'),
		// 		id = options.id;
		// 	var uri = username + '-' + id;	
		// 	Backbone.history.navigate('dashboard/'+uri);
		// 	API.show(uri, {model: options});
		// });

		App.addInitializer(function(){
			new DashBoardApp.Router({
				controller: API
			});
		});

		App.vent.on("show:home:page", function(){
			Backbone.history.navigate('dashboard');
			API.show();
		});

	});

	return App.DashBoard;
});