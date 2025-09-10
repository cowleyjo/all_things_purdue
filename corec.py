import requests

building_ids = ",".join(map(str, [7]))
start_date = "8/21/2025"
end_date = "10/9/2025"

url= (
    f"https://itap.purdue.edu/apps/emsproxy/api/hours?"
    f"buildingIds={building_ids}&startDate={start_date}&endDate={end_date}"
)

headers = {"Accept": "application/json"}

response = requests.get(url, headers=headers)

data = response.json()

for location in data["locations"]:
    print(f"Location: {location['formalName']}")
    for time in location["hours"]:
        print(time)
