from django.db import models
import datetime

# Create your models here.

class Recipe(models.Model):
    name = models.CharField(max_length=50)
    creation_date = models.DateField(default=datetime.date.today)
    description = models.TextField(max_length=500)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')

    def __str__(self):
        return self.name


class Recipe_Step(models.Model):
    description = models.CharField(max_length=200)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe_step')

    def __str__(self):
        return self.description

