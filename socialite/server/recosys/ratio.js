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

function updateratio(profile, user, arr)
{
	var total = arr.length; // this includes the new friend included 
	if(total <= 1)
	{
		p = 0;
	}
	else 
	{
		p = 1;
	}
	var hosnum = ((user.hosnum*((total-1)*p)) + check(profile.hosnum, user.hosnum))/total;
	var hosname = ((user.hosname*((total-1)*p)) + check(profile.hosname, user.hosname))/total;
	var house = ((user.house*((total-1)*p)) + check(profile.house, user.house))/total;
	
	var sports = profile.sports;
	const sporlen = profile.sports.length;
	var spouser = user.sports;
	var spouserlen = user.sports.length;
	var sporarr = Array(spouserlen).fill(0);
	for(j = 0; j < spouserlen; ++j)
	{
		for(k = 0; k < sporlen; ++k)
		{
			sporarr[j]=check(sports[j],spouser[k]);	
		}
		sporarr[j] = ((sports*((total-1)*p)) + sporarr[j])/total; 
	}

	var clubs = profile.clubs;
	const clulen = profile.clubs.length;
	var cluuser = user.clubs;
	var cluuserlen = user.length;
	var cluarr = Array(cluuserlen).fill(0);
	for(j = 0; j < cluuserlen; ++j)
	{
		for(k = 0; k < clulen; ++k)
		{
			cluarr[j]=check(clubs[j],cluuser[k]);	
		}
		cluarr[j] = ((cluuser[j]*((total-1)*p)) +cluarr[j])/total; 
	}
	return [hosnum, hosname, house, sporarr, cluarr];
}