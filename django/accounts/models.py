from django.db import models
from users.models import CustomUser
import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver
from decimal import Decimal

def generate_account_number():
    now = datetime.datetime.now()
    account_number = int(
        now.year +
        now.month + 
        now.day +    
        now.hour +   
        now.minute + 
        now.second +
        now.microsecond + 1000000000
    )
    return account_number

class Accounts(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    account_number=models.BigIntegerField(default=generate_account_number, unique=True)
    account_balance=models.CharField(max_length=100,default=0.00)


@receiver(post_save, sender=CustomUser)
def create_accounts(sender, instance, created, **kwargs):
    if created:
        account_number = generate_account_number()
        Accounts.objects.create(user=instance, account_number=account_number)