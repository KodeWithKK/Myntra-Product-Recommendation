import json

# Load recommendations once at cold start
with open("./data/recommendations.json") as f:
    RECOMMENDATIONS = json.load(f)


def give_recommendation(p_id: int) -> list[int]:
    return RECOMMENDATIONS.get(str(p_id), [])
