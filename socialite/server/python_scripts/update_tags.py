import pymongo
import dns
from bson.objectid import ObjectId
from mongotriggers import MongoTrigger

client = pymongo.MongoClient("mongodb+srv://SRDewan:abcd1234@database.vvxaz.mongodb.net/Data?retryWrites=true&w=majority")
triggers = MongoTrigger(client)
db = client["Data"]
tags = db["Tags"]

def notify():
    print("Updated")
    
triggers.register_update_trigger(notify, 'Data', 'tags')

triggers.tail_oplog()
tags.update_many({}, {'$set':{"weekly": 0}})
triggers.stop_tail()

# try:
#     for insert_change in db.posts.watch([{'$match': {'operationType': 'update']):
#         print(insert_change)

# except pymongo.errors.PyMongoError:
#     # We know it's unrecoverable:
#     print("Error occured")