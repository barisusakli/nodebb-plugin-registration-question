"use strict";

const plugin = module.exports;
const meta = require.main.require('./src/meta');

plugin.init = async function(params) {
	const { router } = params;
	const routeHelpers = require.main.require('./src/routes/helpers');
	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/registration-question', function (req, res) {
		res.render('admin/plugins/registration-question', {
			title: 'Registration Question & Answer',
		});
	});
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
	const inputId = 'registration-question';
	const captcha = {
		label: `[[registration-question:input-label]]<br/>${question}`,
		inputId: inputId,
		html: `
			<input class="form-control" name="${inputId}" id="${inputId}" aria-required="true" />
		`,
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
		throw new Error('[[registration-question:error-wrong-answer]]');
	}
	return params;
};

