from django import forms
from django.core.exceptions import ValidationError
from django.core import validators
from django.utils.translation import gettext_lazy as _

class AddRecipeForm(forms.Form):
    name = forms.CharField()
    name.widget.attrs = {'placeholder': "Name"}
    description = forms.CharField(widget=forms.Textarea())
    description.widget.attrs = {'placeholder': "Description"}
    # correct key will be different in prod
    v = validators.RegexValidator(r'1234', "Auth key is invalid", "invalid")
    authkey = forms.CharField(validators=[v])
    authkey.widget.attrs = {'placeholder': 'Confirm the authorization key'}

    def __init__(self, *args, **kwargs):
        extra_ingredients = kwargs.pop('extra_ingredients', 0)
        if not extra_ingredients:
            extra_ingredients = 0
        extra_instructions = kwargs.pop('extra_instructions', 0)
        if not extra_instructions:
            extra_instructions = 0

        super(AddRecipeForm, self).__init__(*args, **kwargs)

        for i in range(int(extra_ingredients)):
            self.fields['ingredient{index}'.format(index=i)] = forms.CharField(required=False)
        for j in range(int(extra_instructions)):
            self.fields['instruction{index}'.format(index=j)] = forms.CharField(required=False)



