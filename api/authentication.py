from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework import exceptions


class CustomTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = Token.objects.get(key=key)
            user = token.user
        except Token.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token')

        # Generate a new token for the user each time they log in
        token.delete()
        new_token = Token.objects.create(user=user)
        return user, new_token
