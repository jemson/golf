define([
	'app',
	'modules/schedule/list/list_view',
	'components/modal/modal_controller',
	'entities/course',
	'entities/date',
	'entities/reservation_parse'
], function(App, View, Modal){

	App.module('ScheduleApp.List', function(List, App, Backbone, Marionette, $, _){

		List.Controller = Marionette.Controller.extend({

			initialize: function(options){
				var that = this;
					data = {
						date: new Date(),
					}
				var fetchedCourses = App.request('courses:entities');

				this.date = new Date();

				this.id = options.id;

				this.courseId = '';

				this.day = App.request('date:entity', data);

				this.dates = App.request('dates:entities:date');
				
				this.reservationCollection = App.request('reservations:entities:empty');

				this.emptyReservation = App.request('reservations:entity:empty');

				this.layout = this.getLayoutView();

				this.listenTo(this.layout, 'show', function(){
					this.calendarRegion();
				});

				App.mainRegion.show(this.layout);

				fetchedCourses.done(_.bind(function(courses){
					this.courses = courses;
					this.iterateCourses(courses);
					this.coursesRegion();
				}, this));

				App.vent.on('change:reservation:date', _.bind(function(options){
					this.changeReservationDate(options.model);
				}, this));

			},

			changeReservationDate: function(model){
				var month = model.get('month_name') 
					day = model.get('exact_date') 
					year = model.get('year');
				this.date = new Date(month + ' ' + day + ' ' + year);
				this.schedules = App.request('reservations:entities:full', {courseId:this.courseId, date:this.date});
				this.reservationsRegion();
			},

			openSchedulePage: function(iv){
				var that = this;
				this.courseId = iv.model.id;
				this.schedules = App.request('reservations:entities:full', {courseId:this.courseId, date:this.date});
				// var x = this.schedules.countReservations();
				// console.log(x);
				this.reservationsRegion();
			},

			coursesRegion: function(){
				this.courses = this.getCourses();
				this.listenTo(this.courses, 'childview:show:schedules', this.openSchedulePage);
				this.layout.coursesRegion.show(this.courses);
			},

			reservationsRegion: function(){
				this.reservationsView = this.getReservationsView();
				this.listenTo(this.reservationsView, 'childview:show:dialog', this.showDialog);
				// console.log(this.layout.reservationsRegion, this.layout.calendarRegion, this.layout.coursesRegion);
				this.layout.reservationsRegion.show(this.reservationsView);
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

			getReservationsView: function(){
				return new View.ReservationsCollection({collection: this.schedules});
			},	

			getCourses: function(){
				return new View.Courses({collection: this.courses});
			},

			getModalTemplate: function(){
				return new View.ModalTemplate();
			},	

			getNoCourseSelected: function(){
				return new View.NoCourseSelectedTemplate();
			},

			showDialog: function(iv){
				var that = this,
					options = {};
				if(iv.model.get('courseId') !== '') { 
					var modalTemplate = this.getModalTemplate();
						options.header = true;
						options.footer = true;
				}else{	 
					var modalTemplate = this.getNoCourseSelected();
						options.header = false;
						options.footer = false;
				}	

				// save reservation
				this.listenTo(iv.model, 'save:reservation', function(){
					var time = iv.model.get('time')
						course = iv.model.get('courseId');

					this.emptyReservation.save({
						  courseId: {'__type':'Pointer','className':'Course','objectId':course},
						  memberId: {'__type':'Pointer','className':'User','objectId': 'gK63TY0vdZ'},
						  time: time
						}, {
						wait: true,
						success: function(model) {
							iv.model.set('isReserved', true);
							iv.model.set('objectId', model.id)
							that.emptyReservation = App.request('reservations:entity:empty');
						},
						error: function(model, error) {
						// console.log(model, error);
						}
					});
				});

				// TODO: Move to entities file
				// remove reservation
				this.listenTo(iv.model, 'remove:reservation', function(){
					var id = iv.model.id;
					var test = Parse.Object.extend('Reservation');
					var query = new Parse.Query(test);
					query.get(id, {
						wait: true,
						success: function(model){
							model.destroy({
								wait: true,
								success: function(model){
									iv.model.set('isReserved', false); 
									that.stopListening(iv.model); 
								}
							});
						},
						error: function(model, error){
							console.log(model, error);
						}
					});
				});

				// TODO: Move to entities file
				// update if user is paid
				this.listenTo(iv.model, 'update:reservation', function(options){
					var paid = true;
					var id = iv.model.id;
					options.action === 'pay' ? paid = true : paid = false;

					var test1 = Parse.Object.extend('Reservation');
					var query1 = new Parse.Query(test1);
					query1.get(id, {
						wait: true,
						success: function(model){
							model.save({'isPaid': paid}, {
								wait: true,
								success: function(model){
									iv.model.set('isPaid', paid);
									that.stopListening(iv.model); 
								}
							});
						},
						error: function(model, error){
							console.log(model, error);
						}
					});

				});

				new Modal.Controller({contentView: modalTemplate , options: options, model: iv.model});

			},

			// get courses
			// iterate through courses
			// Create a collection full of time/date/course
			// Use model initialize event to check if time/date/course has been reserved
			// **get reservations after iteration
			// **load reservation collection after reservations retrieved
			// 
			iterateCourses: function(courses){
				// courses.map( _.bind(function(course){
				// 	if (course.get('holes') === 18){
				// 		this.courseOne = App.request('reservations:entities:full', {courseId:course.id});											
				// 	}else{
				// 		this.courseTwo = App.request('reservations:entities:full', {courseId:course.id});											
				// 	}
				// }, this));
				// console.log(this.courseOne, this.courseTwo);
			},

		});
	
	});

	return App.ScheduleApp.List;

});
