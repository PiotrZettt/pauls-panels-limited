from django.contrib import admin
from rest_framework import routers, serializers, viewsets
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path, include
from data.models import *
from .views import *

router = routers.DefaultRouter()
router.register(r'Users', UserViewSet)
router.register(r'Customer', CustomerViewSet)
router.register(r'Project', ProjectViewSet)
router.register(r'Operation', OperationViewSet)
router.register(r'Collection', CollectionViewSet)
router.register(r'Delivery', DeliveryViewSet)
router.register(r'PartInstance', PartInstanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login', ObtainAuthToken.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('user/', get_current_user, name='user')
]


