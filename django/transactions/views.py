from rest_framework.authtoken.views import APIView
from .serializers import TransactionsSerializer
from .models import Accounts
from rest_framework.response import Response
from .models import Transactions
from decimal import Decimal
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class DepositAPIView(APIView):
    def post(self,request):
        serializer=TransactionsSerializer(data=request.data)
        serializer.is_valid()
        amount=Decimal(request.data.get("amount"))
        account_number=request.data.get("account_number")
        try:
            account=Accounts.objects.get(account_number=account_number)
            number=Decimal(account.account_balance)
            number+=amount
            account.account_balance=str(number)
            account.save()
            transaction=Transactions.objects.create(transaction_id=account,transaction_amount=amount, transaction_type="deposit")
            transaction.save()
            return Response("deposited successfully")
        except Accounts.DoesNotExist:
            return Response("data not found")
        

class WithdrawAPIView(APIView):
    def post(self,request):
        serializer=TransactionsSerializer(data=request.data)
        serializer.is_valid()
        amount=Decimal(request.data.get("amount"))
        account_number=request.data.get("account_number")
        try:
            account=Accounts.objects.get(account_number=account_number)
            number=Decimal(account.account_balance)
            if number >= amount:
                number-=amount
                account.account_balance=str(number)
                account.save()
                transaction=Transactions.objects.create(transaction_id=account,transaction_amount=amount, transaction_type="withdraw")
                transaction.save()
                return Response("withdraw successfully")
            return Response("insufficient funds")
        except Accounts.DoesNotExist:
            return Response("data not found")
        

class MoneyTransferAPIView(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self,request):
        serializer=TransactionsSerializer(data=request.data)
        serializer.is_valid()
        from_account_number=request.data.get("from_account_number")
        to_account_number=request.data.get("to_account_number")
        amount=Decimal(request.data.get("amount"))
        try:
            to_account=Accounts.objects.get(account_number=to_account_number)
            from_account=Accounts.objects.get(account_number=from_account_number)
            from_number=Decimal(from_account.account_balance)
            to_number=Decimal(to_account.account_balance)
            if to_account==from_account:
                return Response("cannot transfer to own account")
            if from_number >= amount:
                from_number-=amount
                from_account.account_balance=str(from_number)
                from_account.save()
                to_number+=amount
                to_account.account_balance=str(to_number)
                to_account.save()
                transaction1=Transactions.objects.create(transaction_id=from_account,transaction_amount=amount, transaction_type=f"Money transferred to {to_account.account_number}")
                transaction1.save()
                transaction2=Transactions.objects.create(transaction_id=to_account,transaction_amount=amount, transaction_type=f"Money received from {from_account.account_number}")
                transaction2.save()
                return Response("money transfered successfully")
            return Response("insufficient funds")
        except Accounts.DoesNotExist:
            return Response("invalid account number")
        except Exception as e:
            if 'from_account' in locals() and from_account:
                from_account.account_balance += amount
                from_account.save()
            return Response("transaction failed")