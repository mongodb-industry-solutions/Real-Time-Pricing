# Data Transformation
In this part you may find the instructions to orchestrate data transformations and integrations with an intelligence layer (a machine learning model) deployed over a Databricks endpoint to compute the price elasticity of demand for each product that has been recently purchased. 

![image](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/main/media/images/data-transformation.png)

<p align="center">
<sub>
By doing so we orchestrate a fully App-driven analytics solution.
</sub>
</p>

![image](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/main/media/images/app-driven-vs-traditional-analytics.jpg)

<p align="center">
<sub>
Advantages to traditional warehouse analytics solutions.
</sub>
</p>


## Computing the purchase log
Using the powerful MongoDB Atlas Aggregation Pipelines you can shape your data any way it is needed. We will shape the events in an aggregated view that will give us a “purchase log” so we can have historical prices and total quantities sold by product. This way we can feed a linear regression model to get the best possible fit of a line representing the relationship between price and units sold.

### Trigger
Browsing to App Services on your MongoDB Atlas project, you can create a new App and define a Trigger. 

Configure a Database Trigger, according to the parameters you can see in the in the screenshot below.

![image](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/main/media/images/purchase-log-trigger.png)

### Function
The previous Trigger will set off the [purchase_log](Part-2-dataTransformation/purchaseLog.js) function, which will compute the historic purchase log for the last product_id updated into the ingestion collection and will output and upsert of the resulting document into the purchase_log collection.

## POST request to Databricks Endpoint
The goal of this stage is to be able to compute the price elasticity of demand of each product in real time. Using Databricks you can easily start up a Cluster and attach your model building Notebook to it.



### Trigger
Follow the configuration showcased in the below screenshot to set off the "call the pricing model" function.
![image](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/main/media/images/call-pricing-model-trigger.png)

### Function
Using MongoDB Atlas App Services you can finish orchestrating the computation of the price elasticity by using [this function](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/main/Part-2-dataTransformation/call-pricing-model.js#L10) after your model has been deployed in a Databricks endpoint. 
