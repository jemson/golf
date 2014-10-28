define([
	'app',
	'modules/schedule/list/list_view',
	'components/modal/modal_controller',
	'entities/reservation',
	'entities/course',
	'entities/date',
	'entities/reservation',
], function(App, View, Modal){

	App.module('ScheduleApp.List', function(List, App, Backbone, Marionette, $, _){

		List.Controller = Marionette.Controller.extend({

			initialize: function(options){
				var that = this;
				var fetchedCourses = App.request('courses:entities');
				this.dates = App.request('dates:entities:date');
				
				this.reservationCollection = App.request('reservations:entities:empty');

				this.emptyReservation = App.request('reservations:entity:empty');

				this.layout = this.getLayoutView();

				this.listenTo(this.layout, 'show', function(){
					this.calendarRegion();
					// this.reservationsRegion();

				});

				App.mainRegion.show(this.layout);

				fetchedCourses.done(_.bind(function(courses){
					this.courses = courses;
					this.iterateCourses(courses);
					// this.getReservationsCollection();

					// that.courses = data;
					// that.coursesRegion();
					this.coursesRegion();
				}, this));

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

			coursesRegion: function(){
				this.courses = this.getCourses();
				this.listenTo(this.courses, 'childview:show:schedules', this.openSchedulePage);
				this.layout.coursesRegion.show(this.courses);
			},

			openSchedulePage: function(iv){
				var that = this;
				var courseId = iv.model.id;
				this.schedules = App.request('reservations:entities:full', {courseId:courseId});
				this.listenTo(this.schedules, 'change', function(){
					that.reservationsRegion();
				});
				this.reservationsRegion();
			},

			reservationsRegion: function(){
				this.reservationsView = this.getReservationsView();
				this.listenTo(this.reservationsView, 'childview:show:dialog', this.showDialog);
				this.layout.reservationsRegion.show(this.reservationsView);
			},

			calendarRegion: function(){
				var options = {};
					options.region = this.layout.calendarRegion;
					options.model = this.dates;
					
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

			showDialog: function(iv){
				var that = this;
				var modalTemplate = this.getModalTemplate();
					options = {};
					options.header = true;
					options.footer = true;

				this.listenTo(iv.model, 'save:reservation', function(){
					var time = iv.model.get('time')
						name = modalTemplate.ui.input.val()
						course = iv.model.get('courseId');
						// console.log(courseId);

					this.emptyReservation.save({
						  courseId: {'__type':'Pointer','className':'Course','objectId':course},
						  // memberId: 1234567,
						  time: time
						}, {
						  success: function(model) {
							iv.model.set('isReserved', true);
						  	console.log(model);
						  },
						  error: function(model, error) {
							console.log(model, error);
						  }
						});
				});

				new Modal.Controller({contentView: modalTemplate, options: options, model: iv.model});

			},

		});
	
	});

	return App.ScheduleApp.List;

});
