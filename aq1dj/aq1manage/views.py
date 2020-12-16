from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from random import uniform
import numpy as np
import requests
import json
# Create your views here.
from django.http import HttpResponse, JsonResponse    
# A list of dictionaries

@api_view(["POST"])
def compute(request):
    
    data = JSONParser().parse(request)
    print("Data: ", data)
    x = data['matrix1']
    y = data['matrix2']
    ans = np.dot(x,y)
    print(ans)
    return JsonResponse({"solution": ans.tolist()})