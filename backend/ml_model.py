import numpy as np

_cosine_sim = None
_product_ids = None


def give_recommendation(p_id):
    global _cosine_sim, _product_ids

    if _cosine_sim is None or _product_ids is None:
        data = np.load("./data/precomputed/cosine_sim.npz", allow_pickle=True)
        _cosine_sim = data["cosine_sim"]
        _product_ids = data["product_ids"]

    idx = int(np.where(_product_ids == p_id)[0][0])
    cosine_scores = list(enumerate(_cosine_sim[idx]))
    cosine_scores = sorted(cosine_scores, key=lambda x: x[1], reverse=True)
    recommended = [int(_product_ids[i[0]]) for i in cosine_scores[1:11]]
    return recommended
