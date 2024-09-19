import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

products_df = pd.read_csv("./data/cleaned_myntra_dataset_backend.csv")
print(products_df.shape)


tfidf_vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix_content = tfidf_vectorizer.fit_transform(products_df["tags"])
cosine_similarities_content = cosine_similarity(
    tfidf_matrix_content, tfidf_matrix_content
)


indices = pd.Series(products_df.index, index=products_df["p_id"]).drop_duplicates()


def give_recommendation(p_id):
    idx = indices[p_id]
    cosine_scores = list(enumerate(cosine_similarities_content[idx]))
    cosine_scores = sorted(cosine_scores, key=lambda x: x[1], reverse=True)
    cosine_scores = cosine_scores[1:11]
    print(cosine_scores)
    products_indices = [i[0] for i in cosine_scores]
    return products_df["name"].iloc[products_indices]


top10Products = give_recommendation(16524740)
print(top10Products)
