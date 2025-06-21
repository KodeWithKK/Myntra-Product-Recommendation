import os

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Paths
DATASET_PATH = "./data/cleaned_myntra_dataset_backend.csv"
OUTPUT_DIR = "./data/precomputed"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "cosine_sim.npz")

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load dataset
print("📦 Loading product dataset...")
products_df = pd.read_csv(DATASET_PATH)

# Compute TF-IDF matrix
print("🧠 Computing TF-IDF matrix...")
tfidf_vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf_vectorizer.fit_transform(products_df["tags"])

# Compute cosine similarity (convert to float32 to reduce size)
print("🔗 Computing cosine similarity...")
cosine_sim_matrix = cosine_similarity(tfidf_matrix).astype(np.float16)

# Save compressed .npz file
print(f"💾 Saving similarity matrix to {OUTPUT_FILE} ...")
np.savez_compressed(OUTPUT_FILE, cosine_sim=cosine_sim_matrix)

print("✅ Precomputation complete!")
