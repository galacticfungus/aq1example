from rest_framework import serializers
from aq1manage.models import DataSample

class ExampleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataSample
        fields = ('id', 'recorded', 'moving_average', 'server_name')