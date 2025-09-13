from fastapi import FastAPI
import uvicorn
import requests

# ======== CoRec Information ======== #

app = FastAPI()

@app.get("/gym")
def get_gym_data():
    building_ids = ",".join(map(str, [7]))
    start_date = "8/21/2025"
    end_date = "10/9/2025"

    url= (
        f"https://itap.purdue.edu/apps/emsproxy/api/hours?"
        f"buildingIds={building_ids}&startDate={start_date}&endDate={end_date}"
    )

    headers = {"Accept": "application/json"}

    response = requests.get(url, headers).json()
    return response



# ======== Dining Court Information ======== #

@app.get("/dining_courts")
def get_food_info():
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

    variables = {"name": "Earhart", "date": "2025-09-10"}

    response = requests.post(url, json={
        "operationName": "getLocationMenu",
        "variables": variables,
        "query": query
    }).json()

    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port="8000")