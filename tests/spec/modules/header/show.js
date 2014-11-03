define([
	'modules/header/show/show_view'
], function(View){

	describe('HeaderApp.Show', function(){

		var fixture, view;

		before(function(){
			fixture = $("#test");
		});

		beforeEach(function(){
			view = new View.Layout({
				el: "#test"
			});
			view.render();
		});

		// it('should appear when the page is loaded (desktop)', function(){
		// 	expect(view.template).to.not.be.empty;
		// });

		// it('should to the homepage when the logo is clicked', function(){
			
		// });

		// it('should open a notifications dropdown when notifications is clicked (desktop)', function(){
			
		// });

		// it('should go to the settings page when settings is clicked', function(){
			
		// });

		afterEach(function(){
			fixture.empty();
		})

		after(function(){
		});

	});
});