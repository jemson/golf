// define([
// 	'modules/dashboard/schedule/schedule_view'
// ], function(View){

// 	describe('ScheduleApp.Schedule', function(){

// 		describe('Layout', function(){
// 			var fixture, pl, ml, mln, courses, res;
		
// 			before(function(){
// 				fixture = $("#test");
// 			});

// 			beforeEach(function(){
// 				pl = new View.Layout();

// 			});	

// 			it('should have a template', function(){
// 				expect(pl.template).to.be.a('string');
// 			});	

// 			// it('should show a course region', function(){
// 			// 	expect(pl.regions).to.be.an('object').and.to.have.ownProperty('coursesRegion');
// 			// 	expect(pl.regions.coursesRegion).to.equal('#courses-region').and.to.be.a('string');
// 			// });

// 			// it('should show a reservations region', function(){
// 			// 	expect(pl.regions).to.be.an('object').and.to.have.ownProperty('reservationsRegion');
// 			// 	expect(pl.regions.reservationsRegion).to.equal('#reservations-region').and.to.be.a('string');
// 			// });

// 			// it('should show a photo calendar region', function(){
// 			// 	expect(pl.regions).to.be.an('object').and.to.have.ownProperty('calendarRegion');
// 			// 	expect(pl.regions.calendarRegion).to.equal('#calendar-region').and.to.be.a('string');
// 			// });

// 			// it('modal should have a template', function(){
// 			// 	expect(ml.template).to.be.a('string');
// 			// });	

// 			// it('reserved itemview should have a template', function(){
// 			// 	expect(al.template).to.be.a('function');
// 			// });

// 			// it('course region should show list of courses', function(){
// 			// 	expect(course.template).to.be.a('function');
// 			// });

// 			// it('course region should show list of schedules when click', function(){
// 			// 	expect(course.events).to.be.an('object').and.to.have.ownProperty('click [data-reservation]');
// 			// });

// 			// it('course region should render if isSelected attribute has change', function(){
// 			// 	expect(course.modelEvents).to.be.an('object').and.to.have.ownProperty('change:isSelected');
// 			// });			

// 			// it('course region should render if isPaid attribute has change', function(){
// 			// 	expect(course.modelEvents).to.be.an('object').and.to.have.ownProperty('change:isPaid');
// 			// });

// 			// it('courses collection view should have a child view', function(){
// 			// 	expect(courses.childView).to.be.a('function');
// 			// });			

// 			// it('reservation region should have a template', function(){
// 			// 	expect(res.template).to.be.a('string');
// 			// });

// 			// it('reservation region should show a list of schedule', function(){
// 			// 	expect(res.template).to.be.a('string');
// 			// });

// 			// it('reservation region should show dialog when click on a schedule button', function(){
// 			// 	expect(res.showDialog).to.be.a('function');
// 			// 	expect(res.events).to.be.an('object').and.to.have.ownProperty('click [data-button]').and.to.include.keys('click [data-button]');
// 			// });

// 			// it('reservation region should render if isReserved attribute has change', function(){
// 			// 	expect(res.modelEvents).to.be.an('object').and.to.have.ownProperty('change:isReserved');
// 			// });				

// 			// it('reservations collection view should have a child view', function(){
// 			// 	expect(resc.childView).to.be.a('function');
// 			// });			

// 		});	

// 	});

// });