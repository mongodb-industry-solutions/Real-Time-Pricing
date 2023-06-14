from pymongo import MongoClient
from datetime import datetime
import time
import pprint

# Set up MongoDB client and connect to database
client = MongoClient("mongodb+srv://[user_name]:[password]@your.cluster.mongodb.net/")
db = client["your_database"]
collection = db["your_collection"]

# Generate a new document every 2 seconds and insert it into the collection
while True:
    doc = {
  "event_time": datetime.now(),
  "event_type": "purchase",
  "product_id": 5809912,
  "brand": "grattol",
  "price": 4.24,
  "user_id": "test",
  "user_session": "123456789fB" 
  }

    collection.insert_one(doc)
    print(pprint.pprint(doc))

    time.sleep(2)