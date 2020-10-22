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

function host_hous(profile,arr)
{
	var hosnum = profile.hosnum;
	var hosname = profile.hosname;
	var house = profile.house;
	var count_hostel = 0;
	var count_hosname = 0;
	var count_house = 0;
	const total = profile.friends.length;
	for(let i = 0; i < total; ++i)
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
	const total = profile.friends.length;
	var sporarr = Array(sporlen).fill(0);
	for(let i = 0; i < total; ++i)
	{
		var fren = arr[i];
		var spofre = fren.sports;
		var spofrelen = fren.length;
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
	const total = profile.friends.length;
	var cluarr = Array(clulen).fill(0);
	for(let i = 0; i < total; ++i)
	{
		var fren = arr[i];
		var clufre = fren.clubs;
		var clufrelen = fren.length;
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

	if(profile.friends.length == 0) // for new user
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
			totsport = totsport + persport[j];
			for(k = 0; k < sporlennon; ++k)
			{
				
				score = score + check(profile.sports[j],nonfren.sports[k]);	
			}
		}

		const clulenuser = profile.clubs.length;
		const clulennon = nonfren.clubs.length;
		for(j = 0; j < clulenuser; ++j)
		{
			totclub = totclub + perclub[j];
			for(k = 0; k < clulennon; ++k)
			{
				score = score + check(profile.clubs[j],nonfren.clubs[k]);		
			}
		}
		total = 3 + totclub + totsport;
	}
	else
	{
		perhos = host_hous(a,arr);
		persport = sporty(a,arr);
		perclub = club(a,arr);
		score = score + perhos[0]*checkhos(profile.hosnum,nonfren.hosnum);
		score = score + perhos[1]*check(profile.hosname,nonfren.hosname);
		score = score + perhos[2]*check(profile.house,nonfren.house);

		const sporlenuser = profile.sports.length;
		const sporlennon = nonfren.sports.length;
		for(j = 0; j < sporlenuser; ++j)
		{
			totsport = totsport + persport[j];
			for(k = 0; k < sporlennon; ++k)
			{
				
				score = score + persport[j]*check(profile.sports[j],nonfren.sports[k]);	
			}
		}

		const clulenuser = profile.clubs.length;
		const clulennon = nonfren.clubs.length;
		for(j = 0; j < clulenuser; ++j)
		{
			totclub = totclub + perclub[j];
			for(k = 0; k < clulennon; ++k)
			{
				score = score + perclub[j]*check(profile.clubs[j],nonfren.clubs[k]);		
			}
		}
		total = perhos[0] + perhos[1] + perhos[2] + totclub + totsport;
	}
	score = score/total;
	return score;
}

module.exports = { "scoring": scoring };
