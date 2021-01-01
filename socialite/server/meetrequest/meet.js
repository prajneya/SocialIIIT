const data = require("../util/userdata");
const { UserDets, Meet } = require("../models/User")

const moment = require("moment-timezone")
const { UserInputError } = require('apollo-server')

async function meetaccept(user_id, fren_id)
{
	try{
		errors = {}
		var meet = await data.getMeet(user_id, fren_id);	
		dets = await data.getUserDetsById(user_id)
		if(dets.sendmeet.includes(meet._id))
		{
			errors.general = 'You have already sent the request. Kindly refresh the page.';
			throw new UserInputError('You have already sent the request. Kindly refresh the page.', { errors });
		}

		moment.tz.setDefault('Asia/Calcutta')
		fdate = moment(meet.date).format("DD-MM-YYYY")
		ftime = moment(moment(meet.time, "HH:mm:ss")).format("HH:mm:ss")
		var fts = moment(`${fdate} ${ftime}`, 'DD-MM-YYYY HH:mm:ss').format();
		fts = moment(fts)
		var now = moment().format('YYYY-MM-DD HH:mm:ss')
		now = moment(now)

		if(now > fts)
		{
			errors.general = 'Invalid timestamp';
			throw new UserInputError('Invalid timestamp', { errors });
		}

		await data.updateAccRejMeet(user_id, fren_id, meet._id)	
		var notifida = await data.newNotif(fren_id, user_id, "macc");
		await data.removeNotif(user_id, fren_id, "mreq");
		var notifidb = await data.newNotif(user_id, fren_id, "macc");

		await Meet.updateOne({_id: meet._id}, {$push: {sched: notifida}})
		await Meet.updateOne({_id: meet._id}, {$push: {sched: notifidb}})

		if(meet.notif)
		{
			title = "Meet Reminder"
			var user1 = await data.getUserInfo(user_id)
			var user2 = await data.getUserInfo(fren_id)
			msg1 = `<head>
			<title></title>
			<!--[if !mso]><!-- -->
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<!--<![endif]-->
		  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		  <style type="text/css">
			#outlook a { padding: 0; }
			.ReadMsgBody { width: 100%; }
			.ExternalClass { width: 100%; }
			.ExternalClass * { line-height:100%; }
			body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
			table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
			img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
			p { display: block; margin: 13px 0; }
		  </style>
		  <!--[if !mso]><!-->
		  <style type="text/css">
			@media only screen and (max-width:480px) {
			  @-ms-viewport { width:320px; }
			  @viewport { width:320px; }
			}
		  </style>
		  <!--<![endif]-->
		  <!--[if mso]>
		  <xml>
			<o:OfficeDocumentSettings>
			  <o:AllowPNG/>
			  <o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		  </xml>
		  <![endif]-->
		  <!--[if lte mso 11]>
		  <style type="text/css">
			.outlook-group-fix {
			  width:100% !important;
			}
		  </style>
		  <![endif]-->
		  
		  <!--[if !mso]><!-->
			  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
			  <style type="text/css">
		  
				  @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
		  
			  </style>
			<!--<![endif]--><style type="text/css">
			@media only screen and (min-width:480px) {
			  .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
			}
		  </style>
		  </head>
		  <body style="background: #F9F9F9;">
			<div style="background-color:#F9F9F9;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]-->
			<style type="text/css">
			  html, body, * {
				-webkit-text-size-adjust: none;
				text-size-adjust: none;
			  }
			  a {
				color:#1EB0F4;
				text-decoration:none;
			  }
			  a:hover {
				text-decoration:underline;
			  }
			</style>
		  <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
				<![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:138px;"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]-->
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#7289DA url() top center / cover no-repeat;"><!--[if mso | IE]>
				<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
				  <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png" />
				  <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
				<![endif]--><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;" align="center" border="0" background="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:640px;">
				<![endif]--><div style="cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;">Meet Reminder!</div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]--></td></tr></tbody></table><!--[if mso | IE]>
				  </v:textbox>
				</v:rect>
				<![endif]--></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]-->
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]--><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
				<![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
					  
		  
			<h2 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">Hey there!</h2>
			<p>You have a meet scheduled with <b>${user2.username}</b> (<b>${user2.email}</b>) right now!
			<br />
			<br>Here are the details of your meet.
			<br>Type: ${meet.type}
			<br>Duration: ${meet.duration}
			<br>Message: ${meet.msg}
			<br>Link: <a href=${meet.link} style="text-decoration:none;line-height:100%;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
            <pre>${meet.link}</pre></a>
			<br>Place: ${meet.place}
			</p>
		  
				</td></tr></table>
				<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]-->
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
				<![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;"><div style="font-size:1px;line-height:12px;">&nbsp;</div></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]-->
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]--><div style="margin:0 auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;"><table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:0px;"><!--[if mso | IE]>
				<table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
				</td></tr></table>
				<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]-->
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]--><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
				<![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
				Sent by Peersity  • <a href="http://peersity.in/" style="color:#1EB0F4;text-decoration:none;" target="_blank">@peersity</a>
			  </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
				An Initiative by IIIT Hyderabad Students
			  </div></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]--></div>
		  
		  </body>`

			msg2 = `<head>
			<title></title>
			<!--[if !mso]><!-- -->
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<!--<![endif]-->
		  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		  <style type="text/css">
			#outlook a { padding: 0; }
			.ReadMsgBody { width: 100%; }
			.ExternalClass { width: 100%; }
			.ExternalClass * { line-height:100%; }
			body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
			table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
			img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
			p { display: block; margin: 13px 0; }
		  </style>
		  <!--[if !mso]><!-->
		  <style type="text/css">
			@media only screen and (max-width:480px) {
			  @-ms-viewport { width:320px; }
			  @viewport { width:320px; }
			}
		  </style>
		  <!--<![endif]-->
		  <!--[if mso]>
		  <xml>
			<o:OfficeDocumentSettings>
			  <o:AllowPNG/>
			  <o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		  </xml>
		  <![endif]-->
		  <!--[if lte mso 11]>
		  <style type="text/css">
			.outlook-group-fix {
			  width:100% !important;
			}
		  </style>
		  <![endif]-->
		  
		  <!--[if !mso]><!-->
			  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
			  <style type="text/css">
		  
				  @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
		  
			  </style>
			<!--<![endif]--><style type="text/css">
			@media only screen and (min-width:480px) {
			  .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
			}
		  </style>
		  </head>
		  <body style="background: #F9F9F9;">
			<div style="background-color:#F9F9F9;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]-->
			<style type="text/css">
			  html, body, * {
				-webkit-text-size-adjust: none;
				text-size-adjust: none;
			  }
			  a {
				color:#1EB0F4;
				text-decoration:none;
			  }
			  a:hover {
				text-decoration:underline;
			  }
			</style>
		  <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
				<![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:138px;"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]-->
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#7289DA url() top center / cover no-repeat;"><!--[if mso | IE]>
				<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
				  <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png" />
				  <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
				<![endif]--><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;" align="center" border="0" background="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:640px;">
				<![endif]--><div style="cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;">Meet Reminder!</div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]--></td></tr></tbody></table><!--[if mso | IE]>
				  </v:textbox>
				</v:rect>
				<![endif]--></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]-->
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]--><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
				<![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
					  
		  
			<h2 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">Hey there!</h2>
			<p>You have a meet scheduled with <b>${user1.username}</b> (<b>${user1.email}</b>) right now!
			<br />
			<br>Here are the details of your meet.
			<br>Type: ${meet.type}
			<br>Duration: ${meet.duration}
			<br>Message: ${meet.msg}
			<br>Link: <a href=${meet.link} style="text-decoration:none;line-height:100%;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
            <pre>${meet.link}</pre></a>
			<br>Place: ${meet.place}
			</p>
		  
				</td></tr></table>
				<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]-->
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
				<![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;"><div style="font-size:1px;line-height:12px;">&nbsp;</div></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]-->
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]--><div style="margin:0 auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;"><table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:0px;"><!--[if mso | IE]>
				<table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
				</td></tr></table>
				<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]-->
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
				  <tr>
					<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
				<![endif]--><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
				<![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
				Sent by Peersity  • <a href="http://peersity.in/" style="color:#1EB0F4;text-decoration:none;" target="_blank">@peersity</a>
			  </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
				An Initiative by IIIT Hyderabad Students
			  </div></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
				</td></tr></table>
				<![endif]--></div>
		  
		  </body>`

			data.mailSched(fts, {
				'email': user1.email, 
				'title': title, 
				'msg': msg1
			})
			data.mailSched(fts, {
				'email': user2.email, 
				'title': title, 
				'msg': msg2
			})
		}
	} catch(err){
		throw new Error(err);
	}
}

async function meetreject(user_id, fren_id)
{
	try{
		errors = {}
		var meet = await data.getMeet(user_id, fren_id);	
		dets = await data.getUserDetsById(user_id)
		if(dets.sendmeet.includes(meet._id))
		{
			errors.general = 'You have already sent the request. Kindly refresh the page.';
			throw new UserInputError('You have already sent the request. Kindly refresh the page.', { errors });
		}

		await data.updateAccRejMeet(user_id, fren_id, meet._id, 0);
		await data.removeNotif(user_id, fren_id, "mreq");
		await Meet.deleteOne({_id: meet._id})
	} catch(err){
		throw new Error(err);
	}
}

async function meetrequest(meetdata)
{
	try{
		errors = {}
		moment.tz.setDefault('Asia/Calcutta')
		fdate = moment(meetdata.date).format("DD-MM-YYYY")
		ftime = moment(moment(meetdata.time, "HH:mm:ss")).format("HH:mm:ss")
		var fts = moment(`${fdate} ${ftime}`, 'DD-MM-YYYY HH:mm:ss').format();
		fts = moment(fts)
		var now = moment().format('YYYY-MM-DD HH:mm:ss')
		now = moment(now)

		if(now > fts)
		{
			errors.general = 'Invalid timestamp';
			throw new UserInputError('Invalid timestamp', { errors });
		}

		user_id = meetdata.sender
		fren_id = meetdata.sendee
		var oldMeet = await data.getMeet(user_id, fren_id);	
		if(Object.keys(oldMeet).length)
		{
			errors.general = 'Meet thread already exists with this user. Kindly refresh page.';
			throw new UserInputError('Meet thread already exists with this user. Kindly refresh page.', { errors });
		}
		await data.newNotif(fren_id, user_id, "mreq");

		const newMeet = new Meet({
			people: [user_id, fren_id],
			type: meetdata.type,
			date: meetdata.date,
			time: meetdata.time,
			duration: meetdata.duration,
			link: meetdata.link,
			msg: meetdata.msg,
			place: meetdata.place,
			notif: meetdata.notif,
			sched: []
		});

		await newMeet.save().then(async(saved) => {
			await data.updateRequestMeet(user_id, fren_id, saved._id);
			});
	} catch(err){
		throw new Error(err);
	}
}

async function meetDisp(user, other)
{
	try{
		var meet = await data.getMeet(user, other);	
		return meet
	} catch(err){
		throw new Error(err);
	}
}

async function schedMeet(notifid)
{
	try{
		ret = await Meet.findOne({ sched: notifid })
		return ret
	} catch(err){
		throw new Error(err);
	}
}

async function allMeets(user)
{
	try{
		var meets, m, meetDets = []
		await UserDets.findOne({_id: user}).then((dets) => {
			meets = dets.meets
		})

		for(var i = 0; i < meets.length; ++i)
		{
			m = await Meet.findOne({_id: meets[i]})
			meetDets.push(m)
		}

		return meetDets
	} catch(err){
		throw new Error(err);
	}
}


async function meetEdit(meetdata)
{
	try{
		errors = {}
		moment.tz.setDefault('Asia/Calcutta')
		fdate = moment(meetdata.date).format("DD-MM-YYYY")
		ftime = moment(moment(meetdata.time, "HH:mm:ss")).format("HH:mm:ss")
		var fts = moment(`${fdate} ${ftime}`, 'DD-MM-YYYY HH:mm:ss').format();
		fts = moment(fts)
		var now = moment().format('YYYY-MM-DD HH:mm:ss')
		now = moment(now)

		if(now > fts)
		{
			errors.general = 'Invalid timestamp';
			throw new UserInputError('Invalid timestamp', { errors });
		}

		user_id = meetdata.sender
		fren_id = meetdata.sendee
		var meet = await data.getMeet(user_id, fren_id);	

		dets = await data.getUserDetsById(user_id)
		if(dets.sendmeet.includes(meet._id))
		{
			errors.general = 'You have already sent the request. Kindly refresh the page.';
			throw new UserInputError('You have already sent the request. Kindly refresh the page.', { errors });
		}

		await data.removeNotif(user_id, fren_id, "mreq");
		await data.newNotif(fren_id, user_id, "mreq");

		await Meet.updateOne({_id: meet._id}, {$set: {
			type: meetdata.type,
			date: meetdata.date,
			time: meetdata.time,
			duration: meetdata.duration,
			link: meetdata.link,
			msg: meetdata.msg,
			place: meetdata.place,
			notif: meetdata.notif
		}});

		await data.updateAccRejMeet(user_id, fren_id, meet._id, 0);
		await data.updateRequestMeet(user_id, fren_id, meet._id);
	} catch(err){
		throw new Error(err);
	}
}


module.exports = { "meetrequest": meetrequest, "meetaccept": meetaccept, "meetreject": meetreject, "meetDisp": meetDisp, "schedMeet": schedMeet, "allMeets": allMeets, "meetEdit": meetEdit };
