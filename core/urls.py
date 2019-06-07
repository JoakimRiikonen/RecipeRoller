from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('recipe/<recipe_id>/', views.recipe, name='recipe-view'),
    path('recipes/', views.listrecipes.as_view(), name='listrecipes'),
]