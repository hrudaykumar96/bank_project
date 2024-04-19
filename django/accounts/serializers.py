from rest_framework import serializers
from .models import Accounts
from transactions.serializers import TransactionsSerializer

class AccountsSerializer(serializers.ModelSerializer):
    transactions=TransactionsSerializer(many=True)
    
    class Meta:
        model=Accounts
        fields='__all__'