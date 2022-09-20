"use strict";

const plugin = module.exports;
const meta = require.main.require('./src/meta');

plugin.init = async function(params) {
	const { router } = params;
	const routeHelpers = require.main.require('./src/routes/helpers');
	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/registration-question', [], renderAdmin);
};

plugin.addAdminNavigation = async function(header) {
	header.plugins.push({
		route: '/plugins/registration-question',
		icon: 'fa-tint',
		name: 'Registration Question'
	});
	return header;
};

plugin.addCaptcha = async function (params) {
	const question = meta.config['registration-question:question'];

	const captcha = {
		label: 'Registration Question',
		html: '<div class="card card-body"><strong>' + question + '</strong><br /><input class="form-control" name="registration-question" id="registration-question" /></div>'
	};

	if (params.templateData.regFormEntry && Array.isArray(params.templateData.regFormEntry)) {
		params.templateData.regFormEntry.push(captcha);
	} else {
		params.templateData.captcha = captcha;
	}

	return params;
};

plugin.checkRegister = async function(params) {
	const answer = String(meta.config['registration-question:answer']);
	if (answer.toLowerCase() !== params.req.body['registration-question'].toLowerCase()) {
		throw new Error('Wrong registration answer');
	}
	return params;
};

function renderAdmin(req, res) {
	res.render('admin/plugins/registration-question', {});
}

module.exports = plugin;
