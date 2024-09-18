import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel

products_df = pd.read_csv("./data/Fashion Dataset.csv")


tvf = TfidfVectorizer(
    min_df=5,
    max_features=None,
    strip_accents="unicode",
    analyzer="word",
    token_pattern=r"\w{1,}",
    ngram_range=(1, 3),
    stop_words="english",
)

# filling NaN with empty string
products_df["description"] = products_df["description"].fillna("")

tfv_matrix = tvf.fit_transform(products_df["description"])
sig = sigmoid_kernel(tfv_matrix, tfv_matrix)
indices = pd.Series(products_df.index, index=products_df["name"]).drop_duplicates()


def give_recommendation(name, sig=sig):
    idx = indices[name]  # Get the index corresponding to the original name
    sig_scores = list(enumerate(sig[idx]))  # get the pairwise similarity scores
    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
    sig_scores = sig_scores[1:11]  # score of the top 10 most similar products
    products_indices = [i[0] for i in sig_scores]  # products indices
    print(products_indices)
    return products_df["name"].iloc[products_indices]  # top 10 most similar products


top10Products = give_recommendation("AHIKA Women Black & Green Printed Straight Kurta")
print(top10Products)
