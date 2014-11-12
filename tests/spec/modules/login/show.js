define([
	'modules/login/show/show_view'
], function(View){

	describe('Log In View', function(){

		describe('Layout', function(){
			var fixture, li;
		
			before(function(){
				fixture = $("#test");
			});

			beforeEach(function(){
				li = new View.Layout();
			});

			it('should have a template', function(){
				expect(li.template).to.be.a('string');
			});
		});
	});

});