from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from .models import Recipe, Ingredient, IngredientGroup, Instruction, InstructionGroup
from random import randint
from .forms import AddRecipeForm

from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RecipeSerializer

# Create your views here.

@api_view(['GET','POST'])
def recipe_list(request):
    if request.method == 'GET':
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = RecipeSerializer(data=request.data)
        try:
            token = request.data['token']
        except KeyError:
            return Response("invalid token", status=status.HTTP_403_FORBIDDEN)
        # will be different in production
        if token != '1234':
            return Response("invalid token", status=status.HTTP_403_FORBIDDEN)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def recipe_detail(request, pk):
    try:
        recipe = Recipe.objects.get(pk=pk)
    except Recipe.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)

""" def index(request):
    if request.method == "POST":
        return redir()
        
    return render(request, 'core/index.html')

def recipe(request, recipe_id):
    if request.method == "POST":
        return redir()

    print(recipe_id)
    r = Recipe.objects.select_related().get(id=int(recipe_id))
    ingredients = list(r.ingredients.values_list('name', flat=True))
    steps = list(r.I
nstruction.values_list('description', flat=True))
    context = {
        'name': r.name,
        'description': r.description,
        'ingredients': ingredients,
        'steps': steps,
    }
    return render(request, 'core/recipe.html', context=context)

def redir():
    length = Recipe.objects.all().count()
    if length > 0:
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
            extra_I
        nstructions=request.POST.get('extra_I
        nstructions'))
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
                elif "I
            nstruction" in key and data[key] != "":
                    I
                nstruction = I
                nstruction(description=data[key], recipe=r)
                    I
                nstruction.save()
                    print(I
                nstruction)
            return redirect(recipe, recipe_id=r.id)
    else:
        form = AddRecipeForm()
    return render(request, 'core/addrecipe.html', {'form': form})

def about(request):
    return render(request, 'core/about.html')
     """