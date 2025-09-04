import requests

url = "https://api.hfs.purdue.edu/menus/v3/GraphQL"

query = """
query getLocationMenu($name: String!, $date: Date!) {
    diningCourtByName(name: $name) {
        name
        formalName
        dailyMenu(date : $date) {
            meals {
                name
                startTime
                endTime
                stations {
                    name
                    items {
                        item {
                            name
                            traits {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
}
"""

variables = {"name": "Earhart", "date": "2025-09-04"}

response = requests.post(url, json={
    "operationName": "getLocationMenu",
    "variables": variables,
    "query": query
})

data = response.json()
meals = data["data"]["diningCourtByName"]["dailyMenu"]["meals"]

for meal in meals:
    print(f"\n=== {meal['name']} ({meal['startTime']} - {meal['endTime']}) ===")
    for station in meal['stations']:
        print(f" Station: {station['name']}")
        for item in station['items']:
            item_name = item['item']['name']
            print(f"   - {item_name}")

# print(data)