const data = require("../util/userdata");
const content = require("./content")

const ex = require("express");
const math = require("mathjs");
users = [];
mapping = {};
clusters = [];

function custom(x) {
	return function(a, b) {
		if (a[x] > b[x]) {
			return 1;
		} else if (a[x] < b[x]) {
			return -1;
		}
		return 0;
	}
}

function cluster(graph)
{
	k = -1;
	clusters = Array(users.length);
	for(i = 0; i < users.length; ++i)
	{
		++k;
		for(j = 0; j < users.length; ++j)
		{
			if(graph[j][i])
				clusters[j] = k;
		}
	}
}

function check(prev, graph, threshold)
{
	for(i = 0; i < users.length; ++i)
	{
		for(j = 0; j < users.length; ++j)
		{
			diff = prev[i][j] - graph[i][j];
			if(diff < -(threshold) || diff > threshold)
				return 0;
		}
	}

	return 1;
}

function inflate(graph, r)
{
	for(i = 0; i < users.length; ++i)
	{
		norm = 0;
		for(j = 0; j < users.length; ++j)
		{
			graph[i][j] = math.pow(graph[i][j], r);
			norm = norm + graph[i][j];
		}

		for(j = 0; j < users.length; ++j)
			graph[i][j] = graph[i][j] / norm;
	}

	return graph;
}

function expand(graph, e)
{	
	res = Array(users.length);
	for(i = 0; i < users.length; ++i)
	{
		res[i] = Array(users.length).fill(0);
		res[i][i] = 1;
	}

	x = graph;
	while(e)
	{
		if(e & 1)
			res = math.multiply(res, x);
		x = math.multiply(x, x);
		e = e >> 1;
	}

	return res;
}

async function graphgen()
{
	users = await data.getProfiles();
	var graph = Array(users.length);
	for(let i = 0; i < users.length; ++i)
	{
		graph[i] = Array(users.length).fill(0);
		graph[i][i] = 1 / (users[i].friends.length + 1);
	}

	for(i = 0; i < users.length; ++i)
		mapping[users[i]._id] = i;

	for(i = 0; i < users.length; ++i)
	{
		for(j = 0; j < users[i].friends.length; ++j)
			graph[i][mapping[users[i].friends[j]]] = 1 / (users[i].friends.length + 1);
	}

	return graph;
}

function markov(graph, e, r, threshold)
{
	prev = graph;
	graph = expand(graph, e);
	graph = inflate(graph, r);
	if(check(prev, graph, threshold))
		return graph;
	return markov(graph, e, r, threshold);
}

async function friendlist(id, flag)
{
	const cur = await data.getProfileById(id);
	send = Array(cur.friends.length);
	for(i = 0; i < cur.friends.length; ++i)
	{
		clusters[mapping[cur.friends[i]]] = -1;
		send[i] = users[mapping[cur.friends[i]]];
	}

	k = -1;
	score = Array(users.length - 1 - cur.friends.length);
	for(i = 0; i < users.length; ++i)
	{
		if(mapping[id] == i || clusters[i] == -1)
			continue;
		email =  await data.getUserEmail(users[i]._id);
		conscore = await content.scoring(cur, users[i], send);
		score[++k] = {"id": users[i]._id, "match": 0.5 * conscore, "email": email};
		if(clusters[mapping[id]] == clusters[i])
			score[k].match += 0.5;
		score[k].match *= 100;
	}

	score.sort(custom("match"));
	return score;
}

module.exports = async function recomain(id) {
	var graph = await graphgen();
	e = 2;
	r = 2;
	threshold = 0.01;
	graph = markov(graph, e, r, threshold);
	cluster(graph)
	ret = await friendlist(id, 0);
	console.log(ret);
	return ret;
}
