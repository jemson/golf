define(['app'], function(App){

	App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){

		var Reservation = Parse.Object.extend({
			className: 'Reservation',
			initialize: function(options){
				// var courseId = options.courseId || {};

				this.on('add', _.bind(function(model){
					// console.log(model);
				}, this));
			
			},
		});

		var ReservationsCollection = Parse.Collection.extend({
			initialize: function(options){
				// var courseId = options.courseId || {};

				this.on('add', _.bind(function(model){
					this.checkReservation(model);
				}, this));
			
			},
			model: Reservation,
			checkReservation: function(model){
				// var that = this;
				// // check if model for a time has a reservation
				// // var re = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
				// // var todaysDate = new Date(d.getTime());
				// var d = new Date();				
				// var dateTomorrow = new Date(d.getTime() + 24 * 60 * 60 * 1000);
				// var dateYesterDay = new Date(d - 1000 * 60 * 60 * 24);
				
				// // TODO: query data according to course id 
				// // and date selected in the calendar
				// var dateNow = new Date().getDate();				
				// var query = new Parse.Query(Reservation)
				// 	.include('courseId')
				// 	.equalTo('courseId', {'__type':'Pointer','className':'Course','objectId':model.get('courseId')})
				// 	.greaterThan('time', dateYesterDay)
				// 	.lessThan('time', dateTomorrow)
				// 	.find(function(data){
				// 		for(var i = 0; i < data.length; ++i){							
				// 			if (+model.get('time') === +data[i].get('time')) {
				// 				model.set({'isReserved': true, 'isPaid': data[i].get('isPaid'), 'objectId': data[i].id});
				// 			}
				// 		}
				// 	});

			},
			countReservations: function(){
				var matches = this.filter(function(model){
					return model.get('isReserved') === true;
				});
				return matches.length;
			},
			countAvailableReservations: function(){
				return this.length - this.countReservations();
			},
			getReservationsByTime: function(time){
				return this.filter(function(reservation){
					return reservation.get('time') > time;
				});
			},
			scheduleFilter: function(){
				this.on('change', _.bind(function(){
					var matches = this.filter(function(model){
						return typeof model.get('isReserved') === 'undefined';
					});
					return this.reset(matches);
				}, this));
			},

		});
	
		var API = {

			// TODO change date according to selected date on calendar
			// TODO check reservation in Parse before returning the collection
			getFullReservationsParse: function(options){
				var reservationsCollection = new ReservationsCollection();

				// set the time for the schedule today hh/mm/ss/ms
				var startDate = new Date(options.date);				
				startDate.setHours(05, 45, 0, 0);
				var endDate = new Date(options.date);
				endDate.setHours(14, 0, 0, 0);
				var timeOfCourse = [];
				
			  	while(startDate < endDate){

					timeOfCourse.push({time:startDate, courseId: options.courseId});         

					var newDate = startDate.setMinutes( startDate.getMinutes() + 15 );
					startDate = new Date(newDate);
			    }

				var d = new Date();
				var s = new Date(options.date);				
				s.setHours(05, 45, 0, 0);				
				var dateTomorrow = new Date(d.getTime() + 24 * 60 * 60 * 1000);
				var dateYesterDay = new Date(d - 1000 * 60 * 60 * 24);
				// TODO: query data according to course id 
				// and date selected in the calendar
				var dateNow = new Date().getDate();				
				var query = new Parse.Query(Reservation)
					.include('courseId')
					.equalTo('courseId', {'__type':'Pointer','className':'Course','objectId':options.courseId})
					.greaterThanOrEqualTo('time', s)
					// .lessThanOrEqualTo('time', endDate)
					.find(function(data){
					reservationsCollection.map(function(model){
						for(var i = 0; i < data.length; ++i){
							if (+model.get('time') === +data[i].get('time')) {
								model.set({'isReserved': true, 'isPaid': data[i].get('isPaid'), 'objectId': data[i].id});
							}							
						}
					});
				});

				reservationsCollection.add(timeOfCourse);
				return reservationsCollection;
			},

			getEmptyReservationParse: function(){
				var emptyReservation = new Reservation();
				return emptyReservation;
			},

			recreateReservations: function(options){
				var reservations = new ReservationsCollection();
				reservations.add(options.data);
				return reservations;		
			},

		};
	
		App.reqres.setHandler('reservations:entity', function(){
		});

		App.reqres.setHandler('reservations:entities:full', function(options){
			return API.getFullReservationsParse(options);		
		});			

		App.reqres.setHandler('reservations:entity:empty', function(options){
			return API.getEmptyReservationParse(options);		
		});	

		App.reqres.setHandler('reservation:entities:recreate:parse', function(options){
			return API.recreateReservations(options);
		});		
	
	});

	return App.Entities;

});
