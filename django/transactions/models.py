from django.db import models
from django.utils import timezone
from accounts.models import Accounts

class Transactions(models.Model):
    transaction_date = models.DateField(default=timezone.now)
    transaction_amount = models.CharField(max_length=100)
    transaction_type = models.CharField(max_length=100)
    transaction_id=models.ForeignKey(Accounts,related_name='transactions',on_delete=models.CASCADE)
    class Meta:
        ordering = ['-id']