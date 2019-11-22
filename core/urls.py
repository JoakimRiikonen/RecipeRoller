from django.urls import path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('api/recipes/', views.recipe_list),
    path('api/recipes/<int:pk>', views.recipe_detail),
    path('api/recipes/count', views.recipe_count),
]
