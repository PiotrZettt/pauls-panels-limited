from django.http import JsonResponse
from rest_framework import viewsets, parsers, renderers
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.views import APIView

from .serializers import *
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import exceptions
from rest_framework.response import Response

# Create your views here.


def get_current_user(request):
    user = request.user
    return JsonResponse({"user": user.id})


class CustomObtainAuthToken(ObtainAuthToken):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)

    def post(self, request):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        Token.objects.filter(user=user).delete()
        token, created = Token.objects.create(user=user)

        return Response({'token': token.key})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.order_by('id')
    serializer_class = UserSerializer



class CustomerViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Customer.objects.order_by('id')
    serializer_class = CustomerSerializer
    ordering_fields = ['id']


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Project.objects.order_by('id')
    serializer_class = ProjectSerializer
    ordering_fields = ['id']


class OperationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Operation.objects.order_by('id')
    serializer_class = OperationSerializer
    ordering_fields = ['id']


class CollectionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Collection.objects.order_by('id')
    serializer_class = CollectionSerializer
    ordering_fields = ['id']


class DeliveryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Delivery.objects.order_by('id')
    serializer_class = DeliverySerializer
    ordering_fields = ['id']


class PartInstanceViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = PartInstance.objects.order_by('id')
    serializer_class = PartInstanceSerializer
    ordering_fields = ['id']

