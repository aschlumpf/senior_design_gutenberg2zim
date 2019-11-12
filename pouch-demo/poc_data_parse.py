import json

# loads poc_data and stores it in a better format for pouchdb

# reads data
with open("poc_data.json", "r") as f:
    data = json.loads(f.read())

formatted = []
top_level_keys = list(data.keys())

# get all existing ids
ids = set()
for key in top_level_keys:
    ids |= set(data[key].keys())

# format the data
for iD in ids:
    # only get books with a title and creator
    if iD not in data["title"] or iD not in data["creator"]:
        continue
    better_data = {}
    better_data["title"] = data["title"][iD]
    better_data["author"] = data["creator"][iD]
    if "author" in better_data["author"]:
        better_data["author"] = better_data["author"]["author"]["agent_name"]
    elif "authors" in better_data["author"]:
        agents = [auth["agent_name"] for auth in better_data["author"]["authors"]]
        better_data["author"] = "|".join(agents)
    elif "editor" in better_data["author"]:
        better_data["author"] = better_data["author"]["editor"]["agent_name"]
    # for key in top_level_keys:
        # better_data[key] = data[key].get(iD, None)
    better_data["_id"] = str(iD)
    formatted.append(better_data)
    
# write data to file
with open("formatted_poc.json", "w") as f:
    f.write(json.dumps(formatted))