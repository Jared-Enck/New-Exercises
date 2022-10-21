import requests
from secrets import mapquest_API_key

res = requests.get('http://www.mapquestapi.com/geocoding/v1/address', 
                   params={'key': mapquest_API_key, 'location': 'Jacksonville FL'})