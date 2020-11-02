const ex = require("express");
const data = require("../util/userdata");

function check (a,b)
{
	if(a == b)
		return 1;
	else 
		return 0;
}

function checkhos (a,b)
{
	if(a < 100) //for obh ground floor
	{
		if(b < 100)
			return 1;
		else 
			return 0;
	}
	else // for non obh
	{
		x = (a/100)%100| 0 ; // for hundred's place 
		y = (b/100)%100| 0 ; // for hundred's place 
		z = check(x,y);
		return z;
	}
}

function host_hous(profile,arr)
{
	var hosnum = profile.hosnum;
	var hosname = profile.hosname;
	var house = profile.house;
	var count_hostel = 0;
	var count_hosname = 0;
	var count_house = 0;
	const total = arr.length;
	for(i = 0; i < total; ++i)

	{
		var fren = arr[i];
		count_hostel = count_hostel+checkhos(hosnum,fren.hosnum);
		count_hosname = count_hosname+check(hosname,fren.hosname);
		count_house = count_house+check(house,fren.house);
	}
	count_hostel = count_hostel/total;
	count_hosname = count_hosname/total;
	count_house = count_house/total;
	return [count_hostel, count_hosname, count_house];
}

function sporty(profile,arr)
{
	var sports = profile.sports;
	const sporlen = profile.sports.length;
	const total = arr.length;
	var sporarr = Array(sporlen).fill(0);
	for(let i = 0; i < total; ++i)
	{
		var fren = arr[i];
		var spofre = fren.sports;
		var spofrelen = fren.sports.length;
		for(j = 0; j < sporlen; ++j)
		{
			for(k = 0; k < spofrelen; ++k)
			{
				sporarr[j]=sporarr[j]+check(sports[j],spofre[k]);	
			}
			sporarr[j]=sporarr[j]/total;
		}
	}
	return sporarr;
}

function club(profile,arr)
{
	var clubs = profile.clubs;
	const clulen = profile.clubs.length;
	const total = arr.length;
	var cluarr = Array(clulen).fill(0);
	for(let i = 0; i < total; ++i)
	{
		var fren = arr[i];
		var clufre = fren.clubs;
		var clufrelen = fren.clubs.length;
		for(j = 0; j < clulen; ++j)
		{
			for(k = 0; k < clufrelen; ++k)
			{
				cluarr[j]=cluarr[j]+check(clubs[j],clufre[k]);	
			}
			cluarr[j]=cluarr[j]/total;
		}
	}
	return cluarr;
}

function resetratio(a,arr)
{
	var host_hou = host_hous(a,arr);
	var sporarr = sporty(a,arr);
	var cluarr = club(a,arr);
	var arra = [host_hou[0], host_hou[1], host_hou[2], sporarr, cluarr ];
	await data.updateDets(a.id, arra);
}

function scoring(a,b,arr)
{
	profile = a;
	const nonfren = b;
	var total = 0;
	var perhos;
	var persport;
	var perclub;
	var score = 0;
	var totsport = 0;
	var totclub = 0;

	if(arr.length == 0) // for new user
	{
		totsport = profile.sports.length;
		totclub = profile.clubs.length;
		score = score + checkhos(profile.hosnum,nonfren.hosnum);
		score = score + check(profile.hosname,nonfren.hosname);
		score = score + check(profile.house,nonfren.house);

		const sporlenuser = profile.sports.length;
		const sporlennon = nonfren.sports.length;
		for(j = 0; j < sporlenuser; ++j)
		{
			for(k = 0; k < sporlennon; ++k)
			{
				
				score = score + check(profile.sports[j],nonfren.sports[k]);	
			}
		}

		const clulenuser = profile.clubs.length;
		const clulennon = nonfren.clubs.length;
		for(j = 0; j < clulenuser; ++j)
		{
			for(k = 0; k < clulennon; ++k)
			{
				score = score + check(profile.clubs[j],nonfren.clubs[k]);		
			}
		}
		total = 3 + clulenuser + sporlenuser;
	}
	else
	{
		const cur = await data.getUserDetsById(a.id);
		score = score + cur.hosnum*checkhos(profile.hosnum,nonfren.hosnum);
		score = score + cur.hosname*check(profile.hosname,nonfren.hosname);
		score = score + cur.house*check(profile.house,nonfren.house);

		const sporlenuser = profile.sports.length;
		const sporlennon = nonfren.sports.length;
		for(j = 0; j < sporlenuser; ++j)
		{
			totsport = totsport + cur.sports[j];
			for(k = 0; k < sporlennon; ++k)
			{
				
				score = score + cur.sports[j]*check(profile.sports[j],nonfren.sports[k]);	
			}
		}

		const clulenuser = profile.clubs.length;
		const clulennon = nonfren.clubs.length;
		for(j = 0; j < clulenuser; ++j)
		{
			totclub = totclub + cur.clubs[j];
			for(k = 0; k < clulennon; ++k)
			{
				score = score + cur.clubs[j]*check(profile.clubs[j],nonfren.clubs[k]);		
			}
		}
		total = cur.hosnum + cur.hosname + cur.house + totclub + totsport;
	}
	score = score/total;
	return score;
}
// first argument is of profile which we want to see and second argument is of user whose account we are using
function common(profile, user, friends, email)  
{											
	var hostel = checkhos(profile.hosnum, user.hosnum);
	var hosname = check(profile.hosname, user.hosname);
	var house = check(profile.house, user.house);

	var sports = profile.sports;
	const sporlen = profile.sports.length;
	var sporarr = Array(sporlen).fill(0);
	var spouser = user.sports;
	var spouserlen = user.sports.length;
	for(j = 0; j < sporlen; ++j)
	{
		for(k = 0; k < spouserlen; ++k)
		{
			sporarr[j]=check(sports[j],spouser[k]);	
		}
	}

	var clubs = profile.clubs;
	const clulen = profile.clubs.length;
	var cluarr = Array(clulen).fill(0);
	var cluuser = user.clubs;
	var cluuserlen = user.length;
	for(j = 0; j < clulen; ++j)
	{
		for(k = 0; k < cluuserlen; ++k)
		{
			cluarr[j]=check(clubs[j],cluuser[k]);	
		}
	}

	var sval = 0.5 * scoring(profile, user, friends);
	if(profile.cluster_no == user.cluster_no)
		sval += 0.5;

	sval *= 100;
	return {
		hosnum: {val: user.hosnum, flag: hostel},
		hosname: {val: user.hosname, flag: hosname},
		house: {val: user.house, flag: house},
		sports: {val: user.sports, flag: sporarr},
		clubs: {val: user.clubs, flag: cluarr},
		match: sval,
		email: email
	};
}

module.exports = { "scoring": scoring };
module.exports = { "common": common };
module.exports = { "resetratio": resetratio };

