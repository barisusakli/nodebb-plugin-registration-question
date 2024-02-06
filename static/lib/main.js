"use strict";
/*global utils, app*/

$(function() {
	$(window).on('action:ajaxify.end', async function () {
		if (ajaxify.data.template.register && utils.param('error') === 'wrong-answer') {
			const alerts = await app.require('alerts');
			alerts.error('You have answered the registration question incorrectly - please try again.');
		}
	});
});