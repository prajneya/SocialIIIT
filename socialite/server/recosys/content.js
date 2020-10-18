const User = require("../models/user-model");
const util = require("../controllers/util");

//const empty = require("is-empty");
const ex = require("express");

function check (a,b)
{
	if(a == b)
		return 1;
	else 
		return 0;
}

function host_hous(id)
{
	const cur = util.getUserById(id);
	var hosnum = cur.hosnum;
	var hosname = cur.hosname;
	var house = cur.house;
	var count_hostel = 0;
	var count_hosname = 0;
	var count_house = 0;
	const total = cur.friends.length;
	for(i = 0; i < cur.friends.length; ++i)
	{
		var fren = util.getUserById(cur.friends[i]);
		count_hostel = count_hostel+check(hosnum,fren.hosnum);
		count_hosname = count_hosname+check(hosname,fren.hosname);
		count_house = count_house+check(house,fren.house);
	}
	count_hostel = count_hostel/total;
	count_hosname = count_hosname/total;
	count_house = count_house/total;
	return [count_hostel, count_hosname, count_house];
}

function sporty(id)
{
	const cur = util.getUserById(id);
	var sports = cur.sports;
	const sporlen = cur.sports.length;
	const total = cur.friends.length;
	var sporarr = Array(sporlen).fill(0);
	for(i = 0; i < cur.friends.length; ++i)
	{
		var fren = util.getUserById(cur.friends[i]);
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

function club(id)
{
	const cur = util.getUserById(id);
	var clubs = cur.clubs;
	const clulen = cur.clubs.length;
	const total = cur.friends.length;
	var cluarr = Array(clulen).fill(0);
	for(i = 0; i < cur.friends.length; ++i)
	{
		var fren = util.getUserById(cur.friends[i]);
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

function percen(id)
{
	const cur = util.getUserById(id);
	var perhos = host_hous(id);
	var persport = sporty(id);
	var perclub = club(id);
	const sporlen = cur.sports.length;
	var totsport;
	var totclub;
	for(j = 0; j < sporlen; ++j)
	{
		totsport = totsport + persport[j];
	}
	const clulen = cur.clubs.length;
	for(j = 0; j < clulen; ++j)
	{
		totclub = totclub + perclub[j];
	}
	total = perhos[0] + perhos[1] + perhos[2] + totclub + totsport;
	return total; 
}

function scoring(a,b)
{
	const cur = util.getUserById(a);
	const nonfren = util.getUserById(b);
	var total = percen(a);
	var perhos = host_hous(a);
	var persport = sporty(a);
	var perclub = club(a);
	var score = 0;
	score = score + perhos[0]*check(cur.hosnum,nonfren.hosnum);
	score = score + perhos[1]*check(cur.hosname,nonfren.hosname);
	score = score + perhos[2]*check(cur.house,nonfren.house);

	const sporlenuser = cur.sports.length;
	const sporlennon = nonfren.sports.length;
	for(j = 0; j < sporlenuser; ++j)
	{
		for(k = 0; k < sporlennon; ++k)
		{
			score = score + persport[j]*check(cur.sports[j],nonfren.sports[k]);	
		}
	}
	const clulenuser = cur.clubs.length;
	const clulennon = nonfren.clubs.length;
	for(j = 0; j < clulenuser; ++j)
	{
		for(k = 0; k < clulennon; ++k)
		{
			score = score + perclub[j]*check(cur.clubs[j],nonfren.clubs[k]);		
		}
	}
	return score;
}