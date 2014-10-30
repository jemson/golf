define([
	'modules/schedule/list/list_view'
], function(View){

	describe('ScheduleApp.List', function(){

		describe('Layout', function(){
			var fixture, pl;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				pl = new View.Layout({
					el: "#test"
				});
				pl.render();
			});	

			it('should have a template', function(){
				console.log(pl.template);
				expect(pl.template ).to.be.a( 'string' );
			});	

		});	

	});

});