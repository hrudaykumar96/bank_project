from django.urls import path
from .views import *

urlpatterns = [
    path("deposit/",DepositAPIView.as_view()),
    path("withdraw/",WithdrawAPIView.as_view()),
    path("transfer/",MoneyTransferAPIView.as_view()),
]