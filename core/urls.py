from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('api/recipes/', views.recipe_list),
    path('api/recipes/<int:pk>', views.recipe_detail),
]

""" path('', views.index, name='index'),
    path('recipe/<recipe_id>/', views.recipe, name='recipe-view'),
    path('recipes/', views.listrecipes.as_view(), name='listrecipes'),
    path('add/', views.addrecipe, name='addrecipe'),
    path('about/', views.about, name='about'),
 """