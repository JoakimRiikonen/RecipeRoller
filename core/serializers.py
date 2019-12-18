from .models import Recipe, Instruction, InstructionGroup, Ingredient, IngredientGroup, Tag
from rest_framework import serializers

class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = ['name'] 

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
  tags = TagSerializer(many=True)
  ingredient_groups = IngredientGroupSerializer(many=True)
  instruction_groups = InstructionGroupSerializer(many=True)

  class Meta:
    model = Recipe
    fields = ['name', 'tags', 'creation_date', 'description', 'image_url', 'ingredient_groups', 'instruction_groups']

  # al dente
  def create(self, validated_data):
    # get instruction and ingredient group data
    instruction_groups_data = validated_data.pop('instruction_groups')
    ingredient_groups_data = validated_data.pop('ingredient_groups')
    tags_data = validated_data.pop('tags')
    # create the recipe with the rest of the data
    recipe = Recipe.objects.create(**validated_data)
    # go through data
    for instruction_group_data in instruction_groups_data:
      # create group
      instruction_group = InstructionGroup.objects.create(recipe=recipe, title=instruction_group_data.pop('title'))
      # get instructions
      instructions_data = instruction_group_data.pop('instructions')
      # go through instructions
      for instruction_data in instructions_data:
        # create instruction
        Instruction.objects.create(instructiongroup=instruction_group, **instruction_data)
    for ingredient_group_data in ingredient_groups_data:
      ingredient_group = IngredientGroup.objects.create(recipe=recipe, title=ingredient_group_data.pop('title'))
      ingredients_data = ingredient_group_data.pop('ingredients')
      for ingredient_data in ingredients_data:
        Ingredient.objects.create(ingredientgroup=ingredient_group, **ingredient_data)
    for tag_data in tags_data:
      tag = Tag.objects.create(recipe=recipe, **tag_data)
    return recipe

