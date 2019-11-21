from django.contrib import admin

# Register your models here.

from .models import Recipe, Ingredient, IngredientGroup, Instruction, InstructionGroup

admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(IngredientGroup)
admin.site.register(Instruction)
admin.site.register(InstructionGroup)