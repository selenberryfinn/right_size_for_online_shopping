import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
import numpy as np
import json


def recommendation(json_user, json_product):

    user_sizes = pd.Series(json_user).astype("int64")
    user_sizes = pd.DataFrame(user_sizes)
    user_sizes = user_sizes.T

    product_sizes = pd.DataFrame(json_product).astype("int64")
    product_sizes = product_sizes.set_index("size")

    user_mask = list({x:y for (x,y) in json_user.items() if y != '0'}.keys())
    product_mask = list({x:y for (x,y) in json_product[0].items() if y != '0'}.keys())
    mask = [x for x in product_mask if x in user_mask]

    user_sizes = user_sizes[mask]
    product_sizes = product_sizes[mask]

    labels = [product_sizes.columns]

    n = len(product_sizes)

    user_data_MSE=[]
    for i in range(n):
        user_data_MSE.append(user_sizes.values.flatten())

    user_data_MSE = pd.DataFrame(user_data_MSE).astype("int64")

    # MSE = (product_sizes.values - user_data_MSE.values)**2 * (1/n)
    # MSE = np.sum(MSE, axis=1)
    # sizes = product_sizes.index
    # MSE = pd.Series(MSE, index = sizes)
    # result_MSE = MSE.sort_values(ascending=True).round(2)
    # result_MSE = result_MSE.to_dict()
    # return result_MSE

    MSE_results = {}
    for i in range(len(product_sizes)):
       MSE_results[product_sizes.index[i]] = [mean_squared_error(product_sizes.iloc[i], user_data_MSE.iloc[i]).round(2)]
    return MSE_results
