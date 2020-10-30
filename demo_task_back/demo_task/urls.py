from django.conf.urls import url
from rest_framework import routers
from .views import WorkerViewSet, RequestViewSet


router = routers.SimpleRouter()
router.register(r'workers', WorkerViewSet)
router.register(r'requests', RequestViewSet, basename='request')

urlpatterns = []

urlpatterns += router.urls