import os

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
products_df = pd.read_csv("./data/cleaned_myntra_dataset_backend.csv")

# File path for precomputed similarities
SIM_FILE = "./data/precomputed/cosine_sim_32_compressed.npz"

# Check if precomputed file exists
if os.path.exists(SIM_FILE):
    print("📥 Loading precomputed similarity matrix...")
    cosine_similarities_content = np.load(SIM_FILE)["cosine_sim"]
else:
    print("⚙️ Precomputing similarity matrix...")
    tfidf_vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf_vectorizer.fit_transform(products_df["tags"])

    # Compute similarity and convert to float32 to save memory
    cosine_similarities_content = cosine_similarity(tfidf_matrix).astype(np.float32)

    # Save compressed
    os.makedirs(os.path.dirname(SIM_FILE), exist_ok=True)
    np.savez_compressed(SIM_FILE, cosine_sim=cosine_similarities_content)
    print("✅ Saved compressed similarity matrix.")

# Create reverse mapping of product IDs to DataFrame indices
indices = pd.Series(products_df.index, index=products_df["p_id"]).drop_duplicates()


def give_recommendation(p_id):
    """Returns top 10 recommended product IDs for a given product ID."""
    idx = indices[p_id]
    cosine_scores = list(enumerate(cosine_similarities_content[idx]))
    cosine_scores = sorted(cosine_scores, key=lambda x: x[1], reverse=True)
    cosine_scores = cosine_scores[1:11]  # skip self
    product_indices = [i[0] for i in cosine_scores]
    return products_df["p_id"].iloc[product_indices].tolist()
