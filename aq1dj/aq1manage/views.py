from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from random import uniform
import requests
import json
# Create your views here.
from django.http import HttpResponse, JsonResponse    
# A list of dictionaries
serverList = list()

@api_view(['POST'])
def add_server(request):
    try: 
        data = JSONParser().parse(request)
        port = data['port']
        url = 'http://localhost:'+str(port)+'/api/servername'
        response = requests.get(url)
        parsedData = response.json()
        # Why does this return an array
        serverName = parsedData['name'][0]
        print("Recieved server name: ", serverName)
        serverList.append({'name': serverName, 'port': port})
        print("Server List: ", serverList)
        return JsonResponse({"status": "ok", "data": {'serverName': serverName, "port": port}})
    except requests.exceptions.ConnectionError as e:
        print('Error was', e)
        print('Connection Error')
        return JsonResponse({'status': 'noserver'})
    except Exception as e:
        print('Unknown Error was', e)
        return JsonResponse({'status': 'failed'})

@api_view(['GET'])
def server_list(request):
    # Shoudlverify that each server is up before sending this list
    # Wrap the list in a dict to avoid security flaws
    response = {'list': json.dumps(serverList)}
    print("Server List: ", response)
    return JsonResponse(response)

@api_view(['GET'])
def server_data(request, server_name):
    # request contains the server name
    print("Parameter was ", server_name)
    port = 0
    for server in serverList:
        print("Server data is ", server)
        if server['name'] == server_name:
            port = server['port']
    if port == 0:
        # there was no server with that name
        return JsonResponse({'status': 'noserver'})
    print("Using port: ", port)
    # lookup server name in serverList
    # make request for current average
    try: 
        url = 'http://localhost:'+str(port)+'/api/mva'
        print("Getting average from: ", url)
        response = requests.get(url)
        parsedData = response.json()
        data = parsedData['data']
        average = data['average']
        movement = data['movement']
        print("Data was: ", parsedData)
        # data: feed.getRecentAvg()
        #average = parsedData['data']
        return JsonResponse({"status": "ok", "data": {"average": average, "movement": movement}})
    except requests.exceptions.ConnectionError as e:
        print('Error was', e)
        print('Connection Error')
        return JsonResponse({'status': 'noserver'})
    except Exception as e:
        print('Unknown Error was', e)
        return JsonResponse({'status': 'failed'})