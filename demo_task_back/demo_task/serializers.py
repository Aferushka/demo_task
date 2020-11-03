from .models import Worker, Request, PositionToRequest, Position, Payment
from rest_framework.serializers import ModelSerializer, CharField, DateTimeField, StringRelatedField
from django.conf import settings


class PositionSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'


class PositionToRequestSerializer(ModelSerializer):
    position = PositionSerializer()

    class Meta:
        model = PositionToRequest
        exclude = ['request']


class WorkerSerializer(ModelSerializer):
    class Meta:
        model = Worker
        fields = ['FIO', ]


class PaymentSerializer(ModelSerializer):
    created = DateTimeField(format=settings.DATE_TIME_FORMAT)
    position = PositionToRequestSerializer()
    worker = WorkerSerializer()

    class Meta:
        model = Payment
        exclude = ['id', 'request']


class RequestBaseSerializer(ModelSerializer):
    positions = PositionToRequestSerializer(many=True)
    status = CharField(source='get_status_display')
    created = DateTimeField(format=settings.DATE_TIME_FORMAT)
    worker = WorkerSerializer()

    class Meta:
        model = Request
        fields = ['id', 'name', 'created', 'deadline', 'status', 'positions', 'worker', 'resolution']

    def to_internal_value(self, data):

        created = data.get('created') or None
        status = data.get('status') or None
        worker = data.get('worker') or None
        resolution = data.get('resolution') or None

        return {
            'name': data['name'],
            'deadline': data['deadline'],
            'created': created,
            'status': status,
            'worker': worker,
            'resolution': resolution
        }


class RequestFullSerializer(RequestBaseSerializer):
    payments = PaymentSerializer(many=True)

    class Meta:
        model = Request
        fields = ['id', 'name', 'created', 'deadline', 'status', 'positions', 'payments', 'worker', 'resolution']
