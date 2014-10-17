define([
	"app",
	"text!modules/dashboard/count/templates/layout.html",
], function(App, LayoutTemplate){

	App.module("CountApp.Show", function(Show, App, Backbone, Marionette, $, _){

		Show.Layout = Marionette.LayoutView.extend({
			className: 'row',
			template: _.template('Count View'),
		});

	});

	return App.CountApp.Show;
});
