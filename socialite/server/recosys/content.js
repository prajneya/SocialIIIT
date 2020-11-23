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

function isEmpty(val){
  return !!val;
}

function isCheckhostel(a,b)
{
	if((typeof a !== 'undefined') && (typeof b !== 'undefined') && a != -1 && b != -1)
        return 1;
	else
		return 0;
}

function isCheck(a,b)
{
	if((typeof a !== 'undefined') && (typeof b !== 'undefined') && a != "" && b != "")
        return 1;
	else
		return 0;
}

function isRatio(a,num)
{
	if(!isEmpty(a))
		return 0.5*(1/num);
	else
		return a;
}

async function resetratio(profile,arr)
{
	var hosnum = profile.hosnum;
	var hosname = profile.hosname;
	var house = profile.house;
	var batch = profile.batch;
	var stream = profile.stream;
	var count_hostel = 0;
	var count_hosname = 0;
	var count_house = 0;
	var count_batch = 0;
	var count_stream = 0;

	var sports = profile.sports;
	const sporlen = profile.sports.length;
	var sporarr = Array(sporlen).fill(0);
	
	var clubs = profile.clubs;
	const clulen = profile.clubs.length;
	var cluarr = Array(clulen).fill(0);

	const total = arr.length;
	for(i = 0; i < total; ++i)
	{
		var fren = await data.getProfileById(arr[i]);
		if(isCheckhostel(hosnum,fren.hosnum))
		{
			count_hostel = count_hostel+checkhos(hosnum,fren.hosnum);
		}
		if(isCheck(hosname,fren.hosname))
		{
			count_hosname = count_hosname+check(hosname,fren.hosname);
		}
		if(isCheck(house,fren.house))
		{
			count_house = count_house+check(house,fren.house);
		}
		if(isCheck(batch,fren.batch))
		{
			count_batch = count_batch+check(batch,fren.batch);
		}
		if(isCheck(stream,fren.stream))
		{
			count_stream = count_stream+check(stream,fren.stream);
		}

		var spofre = fren.sports;
		//console.log(arr[i]);
		//console.log(spofre);
		var spofrelen = fren.sports.length;
		for(j = 0; j < sporlen; ++j)
		{
			for(k = 0; k < spofrelen; ++k)
			{
				if(isCheck(sports[j],spofre[k]))
				{
					sporarr[j]=sporarr[j]+check(sports[j],spofre[k]);				
				}
			}
		}

		var clufre = fren.clubs;
		var clufrelen = fren.clubs.length;
		for(j = 0; j < clulen; ++j)
		{
			for(k = 0; k < clufrelen; ++k)
			{
				if(isCheck(clubs[j],clufre[k]))
				{
					cluarr[j]=cluarr[j]+check(clubs[j],clufre[k]);									
				}
			}
		}
	}
	count_hostel = count_hostel/total;
	count_hosname = count_hosname/total;
	count_house = count_house/total;
	//console.log(sporarr);
	for(j = 0; j < sporlen; ++j)
	{
			sporarr[j]=sporarr[j]/total;
	}
	for(j = 0; j < clulen; ++j)
	{
			cluarr[j]=cluarr[j]/total;
	}
	var arra = [count_hostel, count_hosname, count_house, sporarr, cluarr, count_batch, count_stream ];
	return arra;
}

function scoring(a,b,cur,arr)
{
	profile = a;
	const nonfren = b;
	var total = 0;
	var score = 0;
	var totsport = 0;
	var totclub = 0;

	if(arr.length == 0) // for new user
	{
		// console.log("adfshaurna");	
		totsport = profile.sports.length;
		totclub = profile.clubs.length;
		if(isCheckhostel(profile.hosnum,nonfren.hosnum))
		{
			// console.log("adfsa");
			score = score + checkhos(profile.hosnum,nonfren.hosnum);
		}
		if(isCheck(profile.hosname,nonfren.hosname))
		{
			score = score + check(profile.hosname,nonfren.hosname);
			
		}
		if(isCheck(profile.house,nonfren.house))
		{
			score = score + check(profile.house,nonfren.house);
		}
		if(isCheck(profile.batch,nonfren.batch))
		{
			score = score + check(profile.batch,nonfren.batch);
		}
		if(isCheck(profile.stream,nonfren.stream))
		{
			score = score + check(profile.stream,nonfren.stream);
		}
		const sporlenuser = profile.sports.length;
		const sporlennon = nonfren.sports.length;
		for(j = 0; j < sporlenuser; ++j)
		{
			for(k = 0; k < sporlennon; ++k)
			{
				if(isCheck(profile.sports[j],nonfren.sports[k]))
				{
					score = score + check(profile.sports[j],nonfren.sports[k]);					
				}	
			}
		}

		const clulenuser = profile.clubs.length;
		const clulennon = nonfren.clubs.length;
		for(j = 0; j < clulenuser; ++j)
		{
			for(k = 0; k < clulennon; ++k)
			{
				if(isCheck(profile.clubs[j],nonfren.clubs[k]))
				{
					score = score + check(profile.clubs[j],nonfren.clubs[k]);					
				}		
			}
		}
		total = 5 + clulenuser + sporlenuser;
	}
	else
	{
		numFren = arr.length;
		// console.log("adaytivafsa");
		if(isCheckhostel(profile.hosnum,nonfren.hosnum))
		{
			//console.log("adebafsa");
			cur.hosnum = isRatio(cur.hosnum, numFren);
			score = score + cur.hosnum*checkhos(profile.hosnum,nonfren.hosnum);
		}
		//console.log(score)
		if(isCheck(profile.hosname,nonfren.hosname))
		{
			cur.hosname = isRatio(cur.hosname, numFren);
			score = score + cur.hosname*check(profile.hosname,nonfren.hosname);		
		}
		//console.log(score)
		if(isCheck(profile.house,nonfren.house))
		{
			cur.house = isRatio(cur.house, numFren);
			score = score + cur.house*check(profile.house,nonfren.house);
		}
		//console.log(score)
		if(isCheck(profile.batch,nonfren.batch))
		{
			// console.log("ayanfsa");

			cur.batch = isRatio(cur.batch, numFren);
			score = score + cur.batch*check(profile.batch,nonfren.batch);
		}
		//console.log(score)
		if(isCheck(profile.stream,nonfren.stream))
		{
			cur.stream = isRatio(cur.stream, numFren);
			score = score + cur.stream*check(profile.stream,nonfren.stream);
			// console.log(score);
			// console.log(check(profile.stream,nonfren.stream));

		}
		//console.log(score)
		const sporlenuser = profile.sports.length;
		const sporlennon = nonfren.sports.length;
		for(j = 0; j < sporlenuser; ++j)
		{
			for(k = 0; k < sporlennon; ++k)
			{
				if(isCheck(profile.sports[j],nonfren.sports[k]))
				{
					// console.log("adfdsfdfsa");
					cur.sports[j]=isRatio(cur.sports[j], numFren);
					score = score + cur.sports[j]*check(profile.sports[j],nonfren.sports[k]);	
					totsport = totsport + cur.sports[j]
				}
			}
		}
		//console.log(score)

		const clulenuser = profile.clubs.length;
		const clulennon = nonfren.clubs.length;
		for(j = 0; j < clulenuser; ++j)
		{
			for(k = 0; k < clulennon; ++k)
			{		
				if(isCheck(profile.clubs[j],nonfren.clubs[k]))
				{
					cur.clubs[j] = isRatio(cur.clubs[j], numFren);
					score = score + cur.clubs[j]*check(profile.clubs[j],nonfren.clubs[k]);											
					totclub = totclub + cur.clubs[j];
				}
			}
		}
		//console.log(score)
		total = cur.hosnum + cur.hosname + cur.house + totclub + totsport + cur.batch + cur.stream;
		//console.log(total)
	}
	score = score/total;
	//console.log(score)
	// console.log(score);
	return score;
}
// first argument is of profile which we want to see and second argument is of user whose account we are using
function common(profile, user, friends, email, curdets)  
{											
	var hostel = 0;
	var hosname = 0;
	var house = 0;
	var batch = 0;
	var stream = 0;
	if(isCheckhostel(profile.hosnum, user.hosnum))
	{
		hostel = checkhos(profile.hosnum, user.hosnum);	
	}
	if(isCheck(profile.hosname, user.hosname))
	{
		hosname = check(profile.hosname, user.hosname);
	}
	if(isCheck(profile.house, user.house))
	{
		house = check(profile.house, user.house);	
	}
	if(isCheck(profile.batch, user.batch))
	{
		batch = check(profile.batch, user.batch);	
	}
	if(isCheck(profile.stream, user.stream))
	{
		stream = check(profile.stream, user.stream);	
	}
	var sports = profile.sports;
	const sporlen = profile.sports.length;
	var sporarr = Array(sporlen).fill(0);
	var spouser = user.sports;
	var spouserlen = user.sports.length;
	for(j = 0; j < sporlen; ++j)
	{
		for(k = 0; k < spouserlen; ++k)
		{
			if(isCheck(sports[j],spouser[k]))
			{
				sporarr[j]=check(sports[j],spouser[k]);	
				if(sporarr[j])
					break;	
			}
		}
	}

	var clubs = profile.clubs;
	const clulen = profile.clubs.length;
	var cluarr = Array(clulen).fill(0);
	var cluuser = user.clubs;
	var cluuserlen = user.clubs.length;
	for(j = 0; j < clulen; ++j)
	{
		for(k = 0; k < cluuserlen; ++k)
		{
			if(isCheck(clubs[j],cluuser[k]))
			{
				cluarr[j]=check(clubs[j],cluuser[k]);	
				if(cluarr[j])
					break;	
			}
		}
	}

	var sval = 0.5 * scoring(profile, user, curdets, friends);
	if(profile.cluster_no == user.cluster_no)
		sval += 0.5;

	sval *= 100;
	return {
		hosnum: {val: user.hosnum, flag: hostel},
		hosname: {val: user.hosname, flag: hosname},
		house: {val: user.house, flag: house},
		sports: {val: user.sports, flag: sporarr},
		clubs: {val: user.clubs, flag: cluarr},
		batch: {val: user.batch, flag: batch },
		stream: {val: user.stream, flag: stream},
		match: sval,
		email: email
	};
}

module.exports = { "scoring": scoring, "common": common, "resetratio": resetratio };
