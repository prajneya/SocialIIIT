const ex = require("express");

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

function ratio(profile, user, arr)
{
	var hostel = checkhos(profile.hosnum, user.hosnum);
	var hosname = check(profile.hosname, user.hosname);
	var house = check(profile.house, user.house);
	var total = arr.length; // this includes the new friend included 
	if(total <= 1)
	{
		p = 0;
	}
	else 
	{
		p = 1;
	}
	user.hosnum = ((user.hosnum*((total-1)*p)) +hosnum)/total; 
	user.hosnum = ((user.hosname*((total-1)*p)) +hosname)/total; 
	user.hosnum = ((user.house*((total-1)*p)) +house)/total; 
	
	var sports = profile.sports;
	const sporlen = profile.sports.length;
	var sporarr = Array(sporlen).fill(0);
	var spouser = user.sports;
	var spouserlen = user.sports.length;
	for(j = 0; j < spouserlen; ++j)
	{
		for(k = 0; k < sporlen; ++k)
		{
			sporarr[j]=check(sports[j],spouser[k]);	
		}
		spouser[j] = ((sports*((total-1)*p)) + sporarr[j])/total; 
	}

	var clubs = profile.clubs;
	const clulen = profile.clubs.length;
	var cluarr = Array(clulen).fill(0);
	var cluuser = user.clubs;
	var cluuserlen = user.length;
	for(j = 0; j < cluuserlen; ++j)
	{
		for(k = 0; k < clulen; ++k)
		{
			cluarr[j]=check(clubs[j],cluuser[k]);	
		}
		cluuser[j] = ((cluuser[j]*((total-1)*p)) +cluarr[j])/total; 
	}
}