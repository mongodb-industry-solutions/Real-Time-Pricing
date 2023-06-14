# Leveraging Databricks AI/ML
The main goal of the solution is to help us identify which are the elastic vs inelastic products so we can optimize our marketing mix using that KPI as a baseline. 

![image](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/main/media/images/elasti-vs-inelastic.png)


## Notebook embedded cluster
On your Notebook you can take advantage of the MlFlow custom python module library to write your python scripts, as this [one](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/main/Part3-ML/AI/price_elasticity.ipynb) or following the [mlFlow documentation](https://mlflow.org/docs/latest/models.html) to leverage Built-in Model Flavors.

## Registering models and deploying them to an endpoint
After logging a model as an experiment after running this cell in your notebook

```python
#Logging model as a experiment  
my_model = MyModel()
with mlflow.start_run():
    model_info = mlflow.pyfunc.log_model(artifact_path="model", python_model=my_model)
```
You can deploy your experiment as an inference model and then deploy it over a [Databricks](https://docs.databricks.com/machine-learning/model-inference/index.html) endpoint for predictions. 

