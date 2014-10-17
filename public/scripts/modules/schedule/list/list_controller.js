define([
	'app',
	'modules/schedule/list/list_view',
	'components/modal/modal_controller',
	'entities/reservation'
], function(App, View, Modal){

	App.module('ScheduleApp.List', function(List, App, Backbone, Marionette, $, _){

		List.Controller = Marionette.Controller.extend({

			initialize: function(){
				
				this.reservationCollection = App.request('reservations:entities:empty');

				// this.emptyCollection = App.request('reservations:entities:empty');

				this.layout = this.getLayoutView();

				this.listenTo(this.layout, 'show', function(){
					this.calendarRegion();
					this.reservationsRegion();

				});

				App.mainRegion.show(this.layout);

			},

			reservationsRegion: function(){
				this.listView = this.getReservationsView();
				this.listenTo(this.listView, 'childview:show:dialog', this.showDialog);
				this.layout.reservationsRegion.show(this.listView);
			},

			calendarRegion: function(){
				App.execute('calendar:load', { region: this.layout.calendarRegion } );
			},

			getLayoutView: function(){
				return new View.Layout();
			},

			getModalTemplate: function(){
				return new View.ModalTemplate();
			},	

			getReservationsView: function(){
				return new View.ReservationsCollection({collection: this.reservationCollection});
			},

			showDialog: function(iv){
				this.modalTemplate = this.getModalTemplate();
				var options = {};
				options.header = true;
				options.footer = true;
				new Modal.Controller({contentView: this.modalTemplate, options: options, model: iv.model});
			},

		});
	
	});

	return App.ScheduleApp.List;

});
