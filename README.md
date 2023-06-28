# Real-Time-Pricing
This repository contains everything needed to showcase how to orchestrate MongoDB Atlas through MongoDB App Services triggers and serverless functions in conjunction with Databricks to create a real time analytics and pricing solution for the retail industry.

## Reference Architecture
![image](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/main/media/images/reference-architecture.jpg)

## Features

### 1. Data Ingestion

The repo contains the [eventsGenerator](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/ec5020c43887a28ca1e2b04eb4a4c0381513760a/Part-1-dataIngestion/eventsGenerator) directory, in which you may find a `generator.py` file. Edit the file with the connection string, database and collection parameters to mimic the purchase events happening on a ecommerce storefront in real time.

### 2. Data Transformations

In this directory you'll find instruction on how to use triggers and functions to:  

* Compute a historic purchase log per product in your collection.
* Send a HTTP POST request to a Databricks deployed endpoint 

### 3. ML/AI

In this folder you may find a test code to run on a Databricks notebook. The code computes a simple calculation of the price elasticity of demand per product, receiving as input the purchase log per product and giving as output the price elasticity.

## Getting started

### Prerequisites

* MongoDB Atlas account and cluster
* Databricks account and cluster
* Installing [pymongo](https://www.mongodb.com/docs/drivers/pymongo/)

### Set Up Instructions


#### [Part 1: Ingestion](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/main/Part-1-dataIngestion)

#### [Part 2: Data transformation](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/blob/main/Part-2-dataTransformation)

#### [Part 3: ML/AI](https://github.com/mongodb-industry-solutions/Real-Time-Pricing/tree/main/Part-3-ML)

