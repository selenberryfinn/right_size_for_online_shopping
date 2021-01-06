import pandas as pd
import re
import requests
from bs4 import BeautifulSoup
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from sklearn.feature_extraction.text import TfidfVectorizer
import spacy
from sklearn.linear_model import LinearRegression
import pylab as plt
##translator -- paul
from sklearn.preprocessing import MinMaxScaler
from matplotlib import pyplot as plt
%matplotlib inline
import seaborn as sns
import numpy as np
from sklearn.linear_model import LinearRegression
import json
#from textblob import TextBlob


#df = pd.read_json()
df = pd.read_html(f"https://www.net-a-porter.com/intl/pssizechart.nap?productID=1205738", attrs = {'class': 'sizetable'}, index_col = [0], header = [0])
df

type(df[0])
df[0]
#size_chart = df
size_chart = df[0]
#sizes = ["0", "2", "4", "6", "8", "10", "12", "14"]
sizes = size_chart.index
sizes
sizes = pd.DataFrame(sizes)
sizes

#labels = ["Bust", "Waist", "Hip"]
labels = [size_chart.columns]
labels
labels = pd.DataFrame(data=labels, index=None, columns=None)
labels
#columns = ['Size', 'Length', 'Bust', 'Waist', 'Hip']
#columns = [labels][0]
#columns
#mapee = {y:x for (x,y) in zip(columns, size_chart.columns)}

#size_chart = df.rename(mapee,axis=1)
#size_chart.columns[0]
#y_data = size_chart.columns[0]
#size_chart = size_chart[labels]


#def user_input():
#Length =
#Inside Legs =
#Length =
#Bust = 84
#Waist = 63
#Hip =
#Shoulders =
#Sleeve =

# making a df from the size input:
n = len(size_chart.index)
#user_data = (f'{Bust}':[73], '{Waist}':[82] , '{Hip}':[93], '{Length}':[93], '{Inside Legs}':[93], '{Hip}':[93], '{Shoulders}':[93], '{Sleeve}':[93])
user_data_t = {'Bust':[73] * n, 'Waist':[82] * n, 'Hip':[93] * n}
user_data_MSE = pd.DataFrame(user_data_t)
user_input = pd.DataFrame(user_data_MSE.iloc[0]).T
user_input.dropna()
#user_input = user_data


#user_input_t.drop(axis = 0)


##MSE
#n = len(size_chart.index)

MSE = (size_chart - user_data_MSE)**2 * (1/n)
MSE.columns.dropna()
MSE['sum'] = MSE['Bust'] + MSE['Waist'] + MSE['Hip']
MSE = pd.DataFrame(MSE, index= None)
MSE


scaler = MinMaxScaler(copy=True, feature_range=(0, 1))
size_chart.shape
scaler_chart = scaler.fit_transform(size_chart)
size_chart = scaler_chart
size_chart


size_chart = pd.DataFrame(size_chart, columns = labels)
size_chart

user_input.shape
scaler_user = scaler.transform(user_input)
user_input = scaler_user
user_input

MSE['sum']

co = cosine_similarity(user_input, size_chart)
co
df_co = pd.DataFrame(data = co, index = None, columns = sizes)
df_co

ascending = df_co.iloc[0].sort_values(ascending = True)
ascending = pd.DataFrame(ascending, index = sizes)
ascending

ascending.plot.barh(color='black')


plt.scatter(MSE['sum'], co)

#sort your results first then pass them into the below

#json_results = dict(zip(sizes, MSE['sum'], co))
list_results = list(zip(MSE['sum'], co))
list_results

a = pd.DataFrame(MSE['sum'], co)
a

## label the axes
## put on sizes

top = df.values.argsort().max() +1
top

top_size

#df[0].to_json()



#print(f"We suggest ..")
product_sizes_droped():
    if i in user_sizes(mask):
        product_sizes.drop(i)
        return product_sizes_droped()




    #label =["size", "length", "bust", "shoulder", "sleeve", "waist", "inside_leg"]
    #df_label = []

    #for i in label:
        #df_label.append(f'{label}')

    #df_label = pd.DataFrame(df_label)
    #df_label
