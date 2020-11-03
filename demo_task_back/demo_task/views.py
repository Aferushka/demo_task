from rest_framework import viewsets
from .models import Worker, Request, Position
from .serializers import WorkerSerializer, RequestBaseSerializer, RequestFullSerializer, PositionSerializer


class WorkerViewSet(viewsets.ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


class PositionViewSet(viewsets.ModelViewSet):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


class RequestViewSet(viewsets.ModelViewSet):
    model = Request

    def get_queryset(self):
        queryset = Request.objects.all()

        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def get_serializer_class(self):
        full = self.request.query_params.get('full')
        return RequestFullSerializer if full else RequestBaseSerializer


