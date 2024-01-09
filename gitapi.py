import requests

def get_recent_pushes(username, count=5):
    url = f"https://api.github.com/users/Emmanuel-Begati/events"
    response = requests.get(url)

    if response.status_code == 200:
        user_events = response.json()
        push_events = [event for event in user_events if event['type'] == 'PushEvent']
        sorted_pushes = sorted(push_events, key=lambda x: x['created_at'], reverse=True)[:count]
        return sorted_pushes
    else:
        print(f"Failed to fetch events. Status code: {response.status_code}")
        return None

# Replace 'your_username' with your GitHub username
username = 'Emmanuel-Begati'

recent_pushes = get_recent_pushes(username)

if recent_pushes:
    print("Most Recent Push Events:")
    for event in recent_pushes:
        repo_name = event['repo']['name']
        created_at = event['created_at']
        print(f"Repo: {repo_name} - Created At: {created_at}")

else:
    print("Failed to retrieve recent push events.")
