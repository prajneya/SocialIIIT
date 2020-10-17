const User = require("../models/user-model");
const util = require("../controllers/util");

//const empty = require("is-empty");
const ex = require("express");
var count_hostel = 0;
var count_hosname = 0;

var score = [{}];

function check (a,b)
{
	if(a == b)
		return 1;
	else 
		return 0;
}

function host_hous(id)
{
	const cur = util(body);
	hosnum = cur.hosnum;
	hosname = cur.hosname;
	house = cur.house;
	var total = cur.friendsrecom.length;
	for(i = 0; i < cur.friendsrecom.length; ++i)
	{
		count_hostel=count_hostel+check(hosnum,cur.friendsrecom[i].hosnum);
		count_hosname=count_hosname+check(hosname,cur.friendsrecom[i].hosname);
		count_house=count_house+check(house,cur.friendsrecom[i].house);
	}
	return [count_hostel/total*100, count_hosname/total*100, count_house/total*100];
}

function sporty(id)
{
	const cur = util(body);
	var sports = cur.sports;
	var sporlen = cur.sports.length;
	var total = cur.friendsrecom.length;
	var sporarr = Array(sporlen).fill(0);
	for(i = 0; i < cur.friendsrecom.length; ++i)
	{
		var spofre = cur.friendsrecom[i].sports;
		var spofrelen = cur.friendsrecom.sports.length;
		for(j = 0; j < sporlen; ++j)
		{
			for(k = 0; k < spofrelen; ++k)
			{
				sporarr[j]=sporarr[j]+check(sports[j],spofre[k]);	
			}
			sporarr[j]=sporarr[j]/total*100;
		}
	}
	return sporarr;
}

function club(id)
{
	const cur = util(body);
	var clubs = cur.clubs;
	var clulen = cur.clubs.length;
	var total = cur.friendsrecom.length;
	var cluarr = Array(clulen).fill(0);
	for(i = 0; i < cur.friendsrecom.length; ++i)
	{
		var clufre = cur.friendsrecom[i].clubs;
		var clufrelen = cur.friendsrecom.clubs.length;
		for(j = 0; j < clulen; ++j)
		{
			for(k = 0; k < clufrelen; ++k)
			{
				cluarr[j]=cluarr[j]+check(clubs[j],clufre[k]);	
			}
			cluarr[j]=cluarr[j]/total*100;
		}
	}
	return cluarr;
}