import json
import os

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Paths
DATASET_PATH = "./data/cleaned_myntra_dataset_backend.csv"
OUTPUT_DIR = "./data"
OUTPUT_JSON = os.path.join(OUTPUT_DIR, "recommendations.json")

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load dataset
print("📦 Loading product dataset...")
products_df = pd.read_csv(DATASET_PATH)
product_ids = [int(p) for p in products_df["p_id"]]

# Compute TF-IDF matrix
print("🧠 Computing TF-IDF matrix...")
tfidf_vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf_vectorizer.fit_transform(products_df["tags"])

# Compute cosine similarity
print("🔗 Computing cosine similarity...")
cosine_sim_matrix = cosine_similarity(tfidf_matrix)

# Generate top 10 recommendations
print("📊 Generating top 10 recommendations...")
recommendations = {}

for idx, p_id in enumerate(product_ids):
    sim_scores = list(enumerate(cosine_sim_matrix[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    top_indices = [i for i, _ in sim_scores[1:11]]
    recommended_ids = [product_ids[i] for i in top_indices]
    recommendations[str(int(p_id))] = [int(rid) for rid in recommended_ids]

# Save to JSON
print(f"💾 Saving recommendations to {OUTPUT_JSON} ...")
with open(OUTPUT_JSON, "w") as f:
    json.dump(recommendations, f)

print("✅ Precomputation complete!")
