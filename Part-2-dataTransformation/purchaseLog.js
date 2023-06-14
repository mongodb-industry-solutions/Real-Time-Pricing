exports = async function() {
    const collection = context.services.get("mongodb-atlas").db('ecom_events').collection('cosmetics');
    
    // Retrieving the last purchase event document
    let lastItemArr = [];
    
    try {
      lastItemArr = await collection.find({event_type: 'purchase'}, { product_id: 1 }).sort({ _id: -1 }).limit(1).toArray();
    } 
    catch (error) {
      console.error('An error occurred during find execution:', error);
    }
    console.log(JSON.stringify(lastItemArr));
    
    // Defining the product_id of the last purchase event document 
    var lastProductId = lastItemArr.length > 0 ? lastItemArr[0].product_id : null; 
    console.log(JSON.stringify(lastProductId));
    console.log(typeof lastProductId);
    if (!lastProductId) {
      return null; 
    }
    
    // Filtering the collection to get only the documents that match the same product_id as the last purchase event
    let lastColl = [];
      lastColl = await collection.find({"product_id": lastProductId}).toArray();
    console.log(JSON.stringify(lastColl));
    
    
    // Defining the aggregation pipeline for modeling a purchase log triggered by the purchase events.
    const agg = [
      {
          '$match': {
              'event_type': 'purchase',
              'product_id': lastProductId
          }
      },
      {
          '$group': {
              '_id': {
                  'event_time': {
                      '$dateToString': {
                          'format': '%Y-%m-%d',
                          'date': '$event_time'
                      }
                  },
                  'product_id': '$product_id',
                  'price': '$price',
                  'brand': '$brand',
                  'category_code': '$category_code'
              },
              'total_sales': {
                  '$sum': 1
              }
          }
      },
      {
          '$project': {
              'total_sales': 1,
              'event_time': '$_id.event_time',
              'product_id': '$_id.product_id',
              'price': '$_id.price',
              'brand': '$_id.brand',
              'category_code': '$_id.category_code',
              '_id': 0
          }
      },
      {
          '$group': {
              '_id': '$product_id',
              'sales_history': {
                  '$push': '$$ROOT'
              }
          }
      },
      {
          '$sort': {
              'sales_history': -1
          }
      },
      {
          '$project': {
              'product_id': '$_id',
              'event_time': '$sales_history.event_time',
              'price': '$sales_history.price',
              'brand': '$sales_history.brand',
              'category_code': '$sales_history.category_code',
              'total_sales': '$sales_history.total_sales',
              'revenue': {
                  '$map': {
                      'input': '$sales_history',
                      'as': 'item',
                      'in': {
                          '$multiply': ['$$item.price', '$$item.total_sales']
                      }
                  }
              }
          }
      },
      {
          '$merge': {
              'into': 'purchase_log',
              'on': '_id',
              'whenMatched': 'merge',
              'whenNotMatched': 'insert'
          }
      }
  ];
    
    // Running the aggregation
      const purchaseLog = await collection.aggregate(agg);
      const log = await purchaseLog.toArray();
      return log;
  };