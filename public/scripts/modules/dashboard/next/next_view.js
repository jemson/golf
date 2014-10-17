define([
	"app",
	"text!modules/dashboard/next/templates/layout.html",
], function(App, LayoutTemplate){

	App.module("NextApp.Show", function(Show, App, Backbone, Marionette, $, _){

		Show.Layout = Marionette.LayoutView.extend({
			className: 'row',
			template: _.template('Count View'),
		});

	});

	return App.NextApp.Show;
});
