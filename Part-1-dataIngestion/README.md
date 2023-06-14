# Data Ingestion
The solution is aimed to mimic an event driven architecture ecommerce dataset.

## Baseline Dataset
As a Baseline Solution we are using data from [this Kaggle](https://www.kaggle.com/datasets/mkechinov/ecommerce-events-history-in-cosmetics-shop?select=2019-Nov.csv) dataset. 

Many thanks to [REES46 Marketing Platform](https://rees46.com/) for this dataset.

### File structure
|Property |	Description|
|:---------:|:----------:|
|event_time|	Time when event happened at (in UTC).|
|event_type	|Only one kind of event: purchase.|
|product_id	|ID of a product|
|category_id	|Product's category ID|
|category_code	|Product's category taxonomy (code name) if it was possible to make it. Usually present for meaningful categories and skipped for different kinds of accessories.|
|brand	|Downcased string of brand name. Can be missed.|
|price	|Float price of a product. Present.|
|user_id	|Permanent user ID.|
|*user_session*|	Temporary user's session ID. Same for each user's session. Is changed every time user come back to online store from a long pause.|

### Event types

*Events can be:*

+ `view` - a user viewed a product
+ `cart` - a user added a product to shopping cart
+ `remove_from_cart` - a user removed a product from shopping cart⋅⋅
+ `purchase` - a user purchased a product⋅⋅

### Documents in MongoDB Atlas
After uploading the baseline dataset you'll get a collection of +4 million documents.

### Mimicking new purchase events
Running the `generator.py` file in the eventsGenerator directory should insert new purchase events in the raw collection you decide over your connection string. 

Make sure to change the connection string and database and collection parameters to make it fit your own. 

A sample document looks like:

```javascript
doc = {
  "event_time": datetime.now(),
  "event_type": "purchase",
  "product_id": 5809912,
  "brand": "grattol",
  "price": 4.24,
  "user_id": "frankie",
  "user_session": "123456789fB" 
  }
  ```