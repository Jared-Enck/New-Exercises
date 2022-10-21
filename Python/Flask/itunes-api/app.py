import requests

term = 'Star Wars'

res = requests.get('https://itunes.apple.com/search', params={'term': term, 'limit': 5})

data = res.json()

for result in data['results']:
    print(result['trackName'])