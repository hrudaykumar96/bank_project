from .models import CustomUser
from .serializers import UserSerializer, GetUserSerializer, FetchUserSerializer, UpdateUserSerializers, GetUserSerializers
from rest_framework.response import Response
from rest_framework.authtoken.views import APIView
from rest_framework.authtoken.views import Token
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from accounts.models import Accounts
from django.db.models import Q

class UserRegistrationAPIView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        if CustomUser.objects.filter(email=request.data.get("email")):
            return Response("email already registered")
        elif CustomUser.objects.filter(mobile=request.data.get("mobile")):
            return Response("mobile number already registered")
        else:
            if serializer.is_valid():
                name=serializer.validated_data.get("name")
                email=serializer.validated_data.get("email")
                mobile=serializer.validated_data.get("mobile")
                gender=serializer.validated_data.get("gender")
                dob=serializer.validated_data.get("dob")
                address=serializer.validated_data.get("address")
                password=serializer.validated_data.get("password")
                user=CustomUser.objects.create_user(name=name,email=email,mobile=mobile,gender=gender,dob=dob,address=address)
                user.set_password(password)
                user.save()
                Token.objects.create(user=user)
                return Response("user created successfully")
            else:
                return Response(serializer.errors)
            

class LoginUserAPIView(APIView):
    def post(self,request):
        email=request.data.get("email")
        password=request.data.get("password")
        if CustomUser.objects.filter(email=email):
            user=authenticate(email=email, password=password)
            if user is None:
                return Response("incorrect password")
            else:
                token=Token.objects.get(user=user)
                serializer=UserSerializer(user)
                return Response(token.key)
        else:
            return Response("email not registered")
        

class PasswordChange(APIView):
    def put(self,request):
        email=request.data.get("email")
        password=request.data.get("password")
        try:
            user=CustomUser.objects.get(email=email)
            user.set_password(password)
            user.save()
            return Response("password changed successfully")
        except CustomUser.DoesNotExist:
            return Response("email not registered")
        

class UserData(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        serializer=GetUserSerializer(request.user)
        return Response(serializer.data)
    

class FetchByAccount(APIView):
    def get(self,request,account_number):
        try:
            queryset=Accounts.objects.get(account_number=account_number)
            serializer=FetchUserSerializer(queryset)
            return Response(serializer.data)
        except Accounts.DoesNotExist:
            return Response("data not found")
        

class UpdateUserData(APIView):
    def put(self,request,id):
        try:
            instance = CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return Response("user not found")
        serializer=UpdateUserSerializers(instance=instance,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("updated successfully")
        return Response(serializer.errors)
    

class GetAllUserdata(APIView):
    def get(self,request):
        queryset=CustomUser.objects.all()
        serializer=GetUserSerializers(queryset, many=True)
        return Response(serializer.data)