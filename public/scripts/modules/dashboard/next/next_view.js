define([
	"app",
	"text!modules/dashboard/next/templates/layout.html",
], function(App, LayoutTemplate){

	App.module("NextApp.Next", function(Next, App, Backbone, Marionette, $, _){

		Next.Layout = Marionette.LayoutView.extend({
			className: 'row',
			template: _.template('Next View'),
		});

	});

	return App.NextApp.Next;
});
