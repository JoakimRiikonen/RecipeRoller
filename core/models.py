from django.db import models
import datetime

# Create your models here.

class Recipe(models.Model):
    name = models.CharField(max_length=50)
    creation_date = models.DateField(default=datetime.date.today)
    description = models.TextField(max_length=500)

    def __str__(self):
        return self.name


class IngredientGroup(models.Model):
    title = models.CharField(max_length=50)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredient_groups')
    orderindex = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    ingredientgroup = models.ForeignKey(IngredientGroup, on_delete=models.CASCADE, related_name='ingredients')
    orderindex = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class InstructionGroup(models.Model):
    title = models.CharField(max_length=50)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='instruction_groups')
    orderindex = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Instruction(models.Model):
    description = models.CharField(max_length=200)
    instructiongroup = models.ForeignKey(InstructionGroup, on_delete=models.CASCADE, related_name='instructions')
    orderindex = models.IntegerField(default=0)

    def __str__(self):
        return self.description

