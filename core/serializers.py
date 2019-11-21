from .models import Recipe, Instruction, InstructionGroup, Ingredient, IngredientGroup
from rest_framework import serializers

class IngredientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Ingredient
    fields = ['name']

class IngredientGroupSerializer(serializers.ModelSerializer):
  ingredients = IngredientSerializer(many=True)
  class Meta:
    model = IngredientGroup
    fields = ['title', 'ingredients']


class InstructionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Instruction
    fields = ['description']


class InstructionGroupSerializer(serializers.ModelSerializer):
  instructions = InstructionSerializer(many=True)

  class Meta:
    model = InstructionGroup
    fields = ['title', 'instructions']


class RecipeSerializer(serializers.ModelSerializer):
  ingredient_groups = IngredientGroupSerializer(many=True)
  instruction_groups = InstructionGroupSerializer(many=True)

  class Meta:
    model = Recipe
    fields = ['name', 'creation_date', 'description', 'ingredient_groups', 'instruction_groups']

  # al dente
  def create(self, validated_data):
    instruction_groups_data = validated_data.pop('instruction_groups')
    ingredient_groups_data = validated_data.pop('ingredient_groups')
    recipe = Recipe.objects.create(**validated_data)
    for instruction_group_data in instruction_groups_data:
      instruction_group = InstructionGroup.objects.create(recipe=recipe, title=instruction_group_data.pop('title'))
      instructions_data = instruction_group_data.pop('instructions')
      for instruction_data in instructions_data:
        Instruction.objects.create(instructiongroup=instruction_group, **instruction_data)
    for ingredient_group_data in ingredient_groups_data:
      ingredient_group = IngredientGroup.objects.create(recipe=recipe, title=ingredient_group_data.pop('title'))
      ingredients_data = ingredient_group_data.pop('ingredients')
      for ingredient_data in ingredients_data:
        Ingredient.objects.create(ingredientgroup=ingredient_group, **ingredient_data)
    return recipe

