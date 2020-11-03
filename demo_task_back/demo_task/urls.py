from django.conf.urls import url
from rest_framework import routers
from .views import WorkerViewSet, RequestViewSet, PositionViewSet


router = routers.SimpleRouter()
router.register(r'workers', WorkerViewSet)
router.register(r'positions', PositionViewSet)
router.register(r'requests', RequestViewSet, basename='request')

urlpatterns = []

urlpatterns += router.urls