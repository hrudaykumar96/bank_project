from django.urls import path
from .views import *

urlpatterns = [
    path('register/',UserRegistrationAPIView.as_view() ),
    path('login/',LoginUserAPIView.as_view() ),
    path('reset/',PasswordChange.as_view() ),
    path('data/',UserData.as_view() ),
    path('fetchdata/<int:account_number>/',FetchByAccount.as_view() ),
    path('update/<int:id>/',UpdateUserData.as_view() ),
    path('userdata/',GetAllUserdata.as_view() ),
]