define([
	"app",
	"modules/dashboard/next/next_view",
], function(App, View){

		App.module("NextApp.Next", function(Next, App, Backbone, Marionette, $, _){
	
			Next.Controller = Marionette.Controller.extend({
	
				initialize: function(options){
					
					this.layout = this.getLayoutView();
					options.region.show(this.layout);

				},

				getLayoutView: function(){
					return new View.Layout();					
				},

			});
		
		});
	
		return App.NextApp.Next;
		
});
