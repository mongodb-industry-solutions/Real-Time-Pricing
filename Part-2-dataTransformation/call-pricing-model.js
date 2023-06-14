exports = async function(changeEvent) {
  
    // Defining a variable for the full document of the last purchase log in the collection
    const { fullDocument } = changeEvent; 
    console.log("Received doc: " + fullDocument.product_id);
    
    // Defining the collection to get
    const collection = context.services.get("mongodb-atlas").db("ecom_events").collection("purchase_log");
    console.log("It passed test 1");
    
    // Fail proofing
    if (!fullDocument) {
      throw new Error('Error: could not get fullDocument from context');
    }
    console.log("It passed test 2");
    
    if (!collection) {
      throw new Error('Error: could not get collection from context');
    }
  
    console.log("It passed test 3");
    
    //Defining the connection variables
    const ENDPOINT_URL = "YOUR_ENDPOINT_URL";
    const AUTH_TOKEN = "BASIC";

    
    // Defining data to pass it into Databricks endpoint
    const data = {"inputs": [fullDocument]};
    
    console.log("It passed test 4");
    
    // Fetching data to the endpoint using http.post to get price elasticity of demand
    try {
      const res = await context.http.post({
        "url": ENDPOINT_URL,
        "body": JSON.stringify(data),
        "encodeBodyAsJSON": false,
        "headers": {
          "Authorization": [AUTH_TOKEN],
          "Content-Type": ["application/json"]
        }
        
      });
      
      console.log("It passed test 5");
     
      if (res.statusCode !== 200) {
        throw new Error(`Failed to fetch data. Status code: ${res.statusCode}`);
      }
      
      console.log("It passed test 6");
      
      // Logging response test
      const responseText = await res.body.text();
      console.log("Response body:", responseText);
  
      // Parsing response from endpoint
      const responseBody = JSON.parse(responseText);
      const price_elasticity = responseBody.predictions;
    
      console.log("It passed test 7 with price elasticity: " + price_elasticity);
    
      //Updating price elasticity of demand for specific document on the purchase log collection
    
        await collection.updateOne({"product_id": fullDocument.product_id}, {$set:{"price_elasticity": price_elasticity}}, { upsert: true } );
        console.log("It updated the product_id " + fullDocument.product_id + "successfully, adding price elasticity " + price_elasticity );  
      } 
        
      catch (err) {
      console.error(err);
      throw err;
    }
  };
