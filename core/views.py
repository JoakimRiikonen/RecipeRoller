from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from .models import Recipe, Ingredient, Recipe_Step
from random import randint
from .forms import AddRecipeForm

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

def addrecipe(request):
    if request.method == "POST":
        form = AddRecipeForm(request.POST,
            extra_ingredients=request.POST.get('extra_ingredients'),
            extra_instructions=request.POST.get('extra_instructions'))
        if form.is_valid():
            # upload the form
            data = form.cleaned_data
            keys = data.keys()
            print(form.cleaned_data)
            r = Recipe(name=data['name'], description=data['description'])
            r.save()
            print(r.id)
            for key in keys:
                if "ingredient" in key and data[key] != "":
                    ingredient = Ingredient(name=data[key], recipe=r)
                    ingredient.save()
                    print(ingredient)
                elif "instruction" in key and data[key] != "":
                    recipe_step = Recipe_Step(description=data[key], recipe=r)
                    recipe_step.save()
                    print(recipe_step)
            return redirect(recipe, recipe_id=r.id)
    else:
        form = AddRecipeForm()
    return render(request, 'core/addrecipe.html', {'form': form})
    