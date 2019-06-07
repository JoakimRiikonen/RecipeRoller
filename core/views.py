from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from .models import Recipe, Ingredient, Recipe_Step
from random import randint

# Create your views here.

def index(request):
    if request.method == "POST":
        return redir()
        
    return render(request, 'core/index.html')

def recipe(request, recipe_id):
    if request.method == "POST":
        return redir()

    print(recipe_id)
    r = Recipe.objects.select_related().get(id=int(recipe_id))
    ingredients = list(r.ingredients.values_list('name', flat=True))
    steps = list(r.recipe_step.values_list('description', flat=True))
    context = {
        'name': r.name,
        'description': r.description,
        'ingredients': ingredients,
        'steps': steps,

    }
    return render(request, 'core/recipe.html', context=context)

def redir():
    length = Recipe.objects.all().count()
    recipe = randint(1,length)
    path = '/recipe/' + str(recipe) + "/"
    return redirect(path)

class listrecipes(ListView):
    model = Recipe
    context_object_name = 'recipes'
    template_name = 'core/listrecipes.html'
    