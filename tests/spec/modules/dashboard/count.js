define([
	'modules/dashboard/count/count_view'
], function(View){

	describe('Dashboard Count View', function(){

		describe('Layout', function(){
			var fixture, pl;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				pl = new View.Layout();
			});	

			it('should have a template', function(){
				expect(pl.template).to.be.a('string');
			});

			it('should show a reservation count and the count of available schedules', function(){
				expect(pl.serializeData).to.be.a('function');
			});

		});

	});

});