const User = require("../models/User");
const util = require("../controllers/util");
const content = require("./content")

//const empty = require("is-empty");
const ex = require("express");
const math = require("mathjs");
var users;
ctr = 0;
var score = [];
var mapping = {};
var clusters = [];

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
		clusters[i] = ++k;
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
			graph[i][j] = norm * graph[i][j];
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
			res = res * x;
		x = x * x;
		e = e >> 1;
	}

	return res;
}

function graphgen()
{
	users = util.getUsers();
	var graph = Array(users.length);
	for(let i = 0; i < users.length; ++i)
		graph[i] = Array(users.length).fill(0);

	for(i = 0; i < users.length; ++i)
		mapping[users[i]._id] = i;

	for(i = 0; i < users.length; ++i)
	{
		for(j = 0; j < users[i].friends.length; ++j)
			graph[i][mapping[users.friends[j]]] = 1 / users[i].friends.length;
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

function friendlist(id, flag)
{
	const cur = util.getUserById(id);
	for(i = 0; i < cur.friends.length; ++i)
		clusters[mapping[cur.friends[i]]] = -1;

	k = -1;
	for(i = 0; i < users.length; ++i)
	{
		if(mapping[id] == i || clusters[i] == -1)
			continue;
		score[++k] = {"id": users[i]._id, "val": 0.5 * content.scoring(id, users[i]._id)};
		if(clusters[mapping[id]] == clusters[i])
			score[k].users._id += 0.5;
	}

	score.sort(custom("val"));
	return score;
}

main = async(req, res) => {
	const body = req.body;

	var graph = graphgen();
	graph = markov(graph, e, r, threshold);
	cluster(graph)
	return friendlist(body.Id, 0);
	//User x = await util(body);
}

module.exports = {
	main
};
