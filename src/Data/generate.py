import time
import random
import json

def generate_line_chart_data(seconds=60, filename="line_chart_data.json"):
    now = int(time.time() * 1000)
    timestamps = [now - i * 1000 for i in range(seconds - 1, -1, -1)]

    data = {
        "currentData": [{"time": t, "value": round(random.uniform(5, 15), 2)} for t in timestamps],
        "temperatureData": [{"time": t, "value": round(random.uniform(20, 35), 2)} for t in timestamps],
        "vibrationData": [{"time": t, "value": round(random.uniform(0, 2), 3)} for t in timestamps],
    }

    with open(filename, "w") as f:
        json.dump(data, f, indent=2)

    print(f"✅ Data saved to {filename}")

if __name__ == "__main__":
    generate_line_chart_data(60)
