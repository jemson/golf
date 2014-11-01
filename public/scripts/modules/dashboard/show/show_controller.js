define([
	'app',
	'modules/dashboard/show/show_view',
	'entities/date',
	'entities/reservation',
	'entities/reservation_parse'
], function(App, View){

		App.module('DashBoardApp.Show', function(Show, App, Backbone, Marionette, $, _){
	
			Show.Controller = Marionette.Controller.extend({
	
				initialize: function(options){
					var data = {
						date: new Date(),
					}

					this.dates = App.request('dates:entities:date');
					this.day = App.request('date:entity', data);
					this.reservations = App.request('reservation:entities', {date:this.day.get('date')});
					this.parseReservation = App.request('reservations:entities:full', {date:this.day.get('date'), courseId:'fMQIT0ix52'});
					this.test();

					this.layout = this.getLayoutView();
					this.listenTo(this.layout, 'show', function(){
						this.dayRegion();
						this.countRegion();
						this.nextRegion();
						this.scheduleRegion();
						this.calendarRegion();
					});

					App.mainRegion.show(this.layout);

					this.listenTo(this.day, 'render:layout', function(){
						console.log('hello');
						this.countRegion();
						this.nextRegion();
						this.test();
						this.scheduleRegion();
					});
				},

				test: function(){
					this.listenTo(this.parseReservation, 'change', function(){
						var x = this.parseReservation.map(function(model){
							return model.attributes;
						});

						this.reservations.reset(x);
						this.countRegion();
						this.nextRegion();
					});
				},

				dayRegion: function(){
					var options = {};
					options.region = this.layout.dayRegion;
					options.model = this.day;
					options.dates = this.dates;
					require(['modules/dashboard/day/day_controller'], function(Day){
						new Day.Controller(options);
					});
				},

				countRegion: function(){
					var options = {};
					options.collection = this.reservations;
					options.region = this.layout.countRegion;
					require(['modules/dashboard/count/count_controller'], function(Count){
						new Count.Controller(options);
					});
				},

				// countRegion: function(){
				// 	App.execute("count:load:region", { region: this.layout.countRegion, collection: this.parseReservation} );
				// },

				nextRegion: function(){
					var options = {};
					options.collection = this.reservations;
					options.region = this.layout.nextRegion;
					options.model = this.day;
					options.dates = this.dates;
					require(['modules/dashboard/next/next_controller'], function(Next){
						new Next.Controller(options);
					});
				},

				scheduleRegion: function(){
					var options = {};
					options.collection = this.parseReservation;
					options.region = this.layout.scheduleRegion
					require(['modules/dashboard/schedule/schedule_controller'], function(Schedule){
						new Schedule.Controller(options);
					});
				},

				calendarRegion: function(){
					var options = {};
					options.region = this.layout.calendarRegion;
					options.model = this.dates;
					options.day = this.day;
					require(['modules/calendar/show/show_controller'], function(Show){
						new Show.Controller(options);
					});
				},

				getLayoutView: function(){
					return new View.Layout();					
				},

			});
		
		});
	
		return App.DashBoardApp.Show;
		
});
