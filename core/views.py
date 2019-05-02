from django.shortcuts import render
from .models import Recipe, Ingredient, Recipe_Step

# Create your views here.

def index(request):
    return render(request, 'core/index.html')

def recipe(request, recipe_id):
    print(recipe_id)
    r = Recipe.objects.get(id=int(recipe_id))
    print(r)
    return render(request, 'core/recipe.html')