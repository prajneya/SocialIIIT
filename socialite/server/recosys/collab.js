const data = require("../util/userdata");

const ex = require("express");
const math = require("mathjs");
users = [];
mapping = {};
clusters = [];

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

async function clusupdate()
{
	for(var i = 0; i < users.length; ++i)
		await data.updateProfile(users[i]._id, clusters[mapping[users[i]._id]]);
}

module.exports = async function clusallot(id) {
	var graph = await graphgen();
	e = 2;
	r = 2;
	threshold = 0.01;
	graph = markov(graph, e, r, threshold);
	cluster(graph);
	clusupdate();
	return clusters[mapping[id]];
}
