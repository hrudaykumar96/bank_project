from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self,email,password=None, **extra_fields):
        email=self.normalize_email(email)
        user=self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    

class CustomUser(AbstractBaseUser):
    name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    mobile=models.CharField(max_length=10,unique=True)
    gender=models.CharField(max_length=6)
    dob=models.DateField()
    address=models.TextField()

    objects=CustomUserManager()

    USERNAME_FIELD='email'