define([
	"app",
	"modules/dashboard/next/next_view",
	"entities/reservation"

], function(App, View){

	App.module("NextApp.Next", function(Next, App, Backbone, Marionette, $, _){

		Next.Controller = Marionette.Controller.extend({

			initialize: function(options){
				this.collection = options.collection;
				this.model = options.model;
				
				this.nextReservation = this.collection.getNextReservation(this.getCurrentTime());
				
				this.layout = this.getLayoutView();
				options.region.show(this.layout);

			},

			getLayoutView: function(){
				return new View.Layout({
					model: this.nextReservation,
					collection:this.collection
				});					
			},

			getCurrentTime: function(){
				var d = this.model.get('date'),
					time = ('0'+d.getHours()).slice(-2)+('0'+d.getMinutes()).slice(-2);

				return time;
			},

			saveReservation: function(iv){
				iv.model.set({isBooked:true})

				App.execute("next:refresh", {region:this.region, collection: this.collection});
			},

		});
	
	});

	return App.NextApp.Next;
		
});
