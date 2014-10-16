define([
	'app',
	'text!modules/schedule/list/templates/layout.html',
	'text!modules/schedule/list/templates/reservations.html',
	'text!modules/schedule/list/templates/modal.html'	
], function(App, LayoutTemplate, ReservationTemplate, ModalTemplate){

	App.module('ScheduleApp.List', function(List, App, Backbone, Marionette, $, _){

		List.Layout = Marionette.LayoutView.extend({
			template: LayoutTemplate,
			tagName: 'main',
			regions: {
				reservationsRegion : '#reservations-region',
				calendarRegion: '#calendar-region',
			},
		});

		List.ModalTemplate = Marionette.ItemView.extend({
			template: ModalTemplate
		})

		List.ReservationsItemView = Marionette.ItemView.extend({
			template: ReservationTemplate,
			className: 'text-align-center padding-0-10-10 ',
			templateHelpers: {
				changeBgColor: function(){
					// if ( this.isBooked == true ) {
					// 	return 'background-color:yellow;'		
					// }					
				},
				changeText: function(){
					// if ( this.isBooked == true ) {
					// 	return 'PAID';						
					// } else {
					// 	return this.time;
					// }
				},						
			},
			events: {
				'click [data-button]': 'showDialog'
			},
			showDialog: function(){
				// $('#header-region').addClass('scale margin');
				// $('#nav-region').addClass('scale');
				// $('#main-region').addClass('scale');
				// $('body').addClass('body-color');					
				this.trigger('show:dialog', this);
			},
			modelEvents: {
				'change:isBooked':'render'
			},
		});
		
		List.ReservationsCollection = Marionette.CollectionView.extend({
			childView: List.ReservationsItemView,
			className: 'padding-15 margin-15 background-color-white main-content',
			onDomRefresh: function(){
				var pageHeight = $(document).height();
				$('.sidebar').css('height', pageHeight);
			}						
		});
	
	});

	return App.ScheduleApp.List;

});
