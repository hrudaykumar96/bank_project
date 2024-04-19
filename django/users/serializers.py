from rest_framework import serializers
from .models import CustomUser
from accounts.serializers import AccountsSerializer
from accounts.models import Accounts

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields='__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }


class GetUserSerializer(serializers.ModelSerializer):
    accounts=AccountsSerializer(read_only=True)
    class Meta:
        model=CustomUser
        fields='__all__'


class FetchUserSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model=Accounts
        fields='__all__'


class UpdateUserSerializers(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=["name","email","mobile","gender","dob","address"]


class GetUserSerializers(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=["name","email","mobile","gender","dob","address", "id"]