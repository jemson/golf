define([
	"app",	
], function(App){

		App.module("DashBoardApp", function(DashBoardApp, App, Backbone, Marionette, $, _){

		DashBoardApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"dashboard": "show"
			}
		});
		
		var API = {
			show: function(options){
				require(["modules/dashboard/show/show_controller"], function(){
					new DashBoardApp.Show.Controller(options);
				});
			}
		};

		App.addInitializer(function(){
			new DashBoardApp.Router({
				controller: API
			});
		});

	});

	return App.DashBoard;
});