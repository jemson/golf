define([
	"app",
	"modules/calendar/show/show_view", 
	"entities/date"
], function(App, View){

	App.module("CalendarApp.Show", function(Show, App, Backbone, Marionette, $, _){
	Show.Controller = Marionette.Controller.extend({
			initialize: function(options){
				this.layout = this.getLayoutView();

				this.mo = App.request("dates:entities:months");

				this.dates = App.request("dates:entities:date");

				this.day = App.request("dates:entities:day");

				this.emptyMonth = App.request("dates:entities:emptyMonth");

				this.emptyDate = App.request("dates:entities:emptyDates");
				
				this.date = new Date();
				this.getMonths();
				

				this.listenTo(this.layout, "show", function(){
					this.calendarHead();
					this.calendarBody();
				});

				App.calendarRegion.show(this.layout);

			},

			getLayoutView: function(){
				return new View.Layout();
			},

			getMonthsView:function(){
				return new View.Calendar({model:this.emptyMonth});
			},

			getDatesView:function(){
				return new View.Date({test:31});
			},

			calendarHead: function(){
				var headerView = this.getMonthsView();
				this.layout.calendarHead.show(headerView);

				this.listenTo(headerView, "calendar:month:change", this.triggerMonth);
			},

			calendarBody: function(){
				this.bodyView = this.getDatesView();
				this.layout.calendarBody.show(this.bodyView);

				this.listenTo(this.bodyView, "childview:day:click", this.changeSelectedDate);
				this.listenTo(this.bodyView, "childview:day:click", this.selectedDate);
			},

			getMonths: function(){
				var that = this;
				var days = this.day.at(that.date.getDay()).get("day");
				var pick = this.mo.at(that.date.getMonth()).get("month");

				month = [];
				this.mo.each(function(model){
					if (model.get("month") == pick) {
						that.emptyMonth.set({
							month: model.get("month"),
							year: that.date.getFullYear(),
							day: that.date.getDay(),
							date: that.date.getDate(),
							number: that.date.getMonth(),
							isSelected: true,
							originalMonth: that.date.getMonth(),
						});	
					}
				});
			},

		});
	});
	return App.CalendarApp.Show;
});