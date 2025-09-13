import requests
import time

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

date = time.localtime()

date_month = str(date.tm_mon) if date.tm_mon >= 10 else f"0{date.tm_mon}"

date_day = str(date.tm_mday) if date.tm_mday >= 10 else f"0{date.tm_mday}"

variables = {"name": "Earhart", "date": f"{date.tm_year}-{date_month}-{date_day}"}

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