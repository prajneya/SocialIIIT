import pymongo
import random
import math
import dns
from scipy.stats import norm
from datetime import datetime, date
from bson.objectid import ObjectId
from mongotriggers import MongoTrigger

client = pymongo.MongoClient("mongodb+srv://SRDewan:abcd1234@database.vvxaz.mongodb.net/Data?retryWrites=true&w=majority")
triggers = MongoTrigger(client)
db = client["Data"]
profiles = db["Profile"]
posts = db["posts"]
users = db["users"]
queue = db["Queue"]
userDets = db["UserDets"]

def rank_answers(upvotes):
    newArray = upvotes.copy()   
    newArray.sort(reverse = True)  
    ranks = {}  
    rank = 1
      
    for index in range(len(newArray)):  
        element = newArray[index];  
     
        if element not in ranks:  
            ranks[element] = rank  
            rank += 1
           
    for index in range(len(upvotes)):  
        element = upvotes[index]  
        upvotes[index] = ranks[upvotes[index]] 

def win_prob(rating_1, rating_2, volatility_1, volatility_2):
    WP = 0.5*(math.erf((rating_1 - rating_2)/(math.sqrt(2*((volatility_1**2) + (volatility_2**2)))))+1)
    return WP

def updateUserRating(user_rating, volatility, times_played, ARank):
    no_of_users = len(user_rating)

    total = sum(user_rating)
    avg_rating = total/no_of_users
    
    volatility_sq = [i**2 for i in volatility]
    volatility_sq_sum = sum(volatility_sq)

    rating_std_sq = [(i-avg_rating)**2 for i in user_rating]
    rating_std_sum = sum(rating_std_sq)

    CF = math.sqrt((volatility_sq_sum/no_of_users) + (rating_std_sum/(no_of_users - 1)))

    win_prob_array = [0 for i in range(no_of_users)]

    for i in range(no_of_users):
        for j in range(no_of_users):
            win_prob_array[i] += win_prob(user_rating[j], user_rating[i], volatility[j], volatility[i])

    ERank = [(0.5 + i) for i in win_prob_array]
    
    EPerf = [(-(norm.ppf((i - 0.5)/no_of_users))) for i in ERank]
    
    APerf = [(-(norm.ppf((i - 0.5)/no_of_users))) for i in ARank]
    
    PerfAs = [(i + CF*(j - k)) for i, j, k in list(zip(user_rating, APerf, EPerf))]

    Weight = [((1/(1 - ((0.42/(i+1)) + 0.18))) - 1) for i in times_played]

    for i in range(no_of_users):
        if user_rating[i] > 2500:
            Weight[i] *= 0.8
        elif user_rating[i] > 2000:
            Weight[i] *= 0.9
        
    Cap = [(150 + (1500/(i+2))) for i in times_played]

    new_rating = [(i+j*k)/(1+j) for i, j, k in list(zip(user_rating, Weight, PerfAs))]

    for i in range(no_of_users):
        if (new_rating[i] - user_rating[i]) > Cap[i]:
            new_rating = user_rating + Cap
    
    first = [(((i - j)**2)/k) for i, j, k in list(zip(new_rating, user_rating, Weight))]
    second = [((i**2)/(j+1)) for i, j in list(zip(volatility, Weight))]

    new_rating = [int(round(i)) for i in new_rating]
    new_volatility = [(math.sqrt(first[i] + second[i])) for i in range(no_of_users)]
    new_times_played = [i+1 for i in times_played]

    return new_rating, new_volatility, new_times_played

for q in queue.find():
    if (datetime.strptime(datetime.strftime(date.today(), "%Y-%m-%d"), "%Y-%m-%d") - datetime.strptime((q['createdAt'])[:10], "%Y-%m-%d")).days >= 7:
        for x in posts.find({"_id": q['_id']}):
            user_rating = []
            volatility = []
            times_answered = []
            answers = []

            print("This post has {} answers".format(len(x['answers'])))
            for y in x['answers']:
                print("This answer was written by {}, has {} upvotes and {} downvotes".format(y['email'], len(y['upvotes']), len(y['downvotes'])))
                answers.append(len(y['upvotes']) - len(y['downvotes']))
                myquery = { "email": y['email'] }
                mydoc = users.find(myquery)
                for z in mydoc:
                    print("This user has {}, {}, {}".format(z['rating'], z['volatility'], z['times_answered']))
                    user_rating.append(z['rating'])
                    volatility.append(z['volatility'])
                    times_answered.append(z['times_answered'])

            print("Before Algo")

            for i in list(zip(user_rating, volatility, times_answered, answers)):
                print(i)

            if(len(answers) != 1):
                rank_answers(answers)
                user_rating, volatility, times_answered = updateUserRating(user_rating, volatility, times_answered, answers)

            print("After Algo")

            for i in list(zip(user_rating, volatility, times_answered, answers)):
                print(i)

            index = 0
            for y in x['answers']:
                myquery = { "email": y['email'] }
                newrating = { "$set": { "rating": user_rating[index] } }
                newvolatility = { "$set": { "volatility": volatility[index] } }
                newtimes_answered = { "$set": { "times_answered": times_answered[index] } }
                users.update_one(myquery, newrating)
                users.update_one(myquery, newvolatility)
                users.update_one(myquery, newtimes_answered)
                index += 1

            print()

        queue.delete_one({"_id": q['_id']})

print("No more documents")

def notify():
    print("Updated")
    
triggers.register_op_trigger(notify, 'Data', 'users')

triggers.tail_oplog()
for i in users.find():
    if not i['verified'] and (datetime.strptime(datetime.strftime(date.today(), "%Y-%m-%d"), "%Y-%m-%d") - datetime.strptime((i['createdAt'])[:10], "%Y-%m-%d")).days >= 1:
        uid = i['_id']
        users.delete_one({"_id": uid})
        profiles.delete_one({"_id": uid})
        userDets.delete_one({"_id": uid})
        print("Deleted user {}".format(uid))
        
triggers.stop_tail()
