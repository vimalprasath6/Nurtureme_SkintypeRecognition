import re
from django.template import TemplateSyntaxError, Context
from django.template.backends.base import BaseEngine
from django.template.loader import get_template_from_string
from django.template import Template

class TemplateDoesNotExist(Exception):
    pass

class Template:
    def __init__(self, template_string):
        self.template_string = template_string
        self.context = {}

    def render(self, context):
        """
        Render the template with the provided context data.
        """
        context.update(self.context)
        return self.template_string.format(**context)

    def add_to_context(self, context_data):
        """
        Add data to the template's context.
        """
        self.context.update(context_data)

def get_template(template_name):
    """
    Loads the template from the given name. Raises an error if the template doesn't exist.
    """
    try:
        return get_template_from_string(template_name)
    except TemplateDoesNotExist:
        raise TemplateDoesNotExist(f"Template {template_name} does not exist.")

class BaseEngine(BaseEngine):
    def __init__(self, params):
        self.params = params

    def get_template(self, template_name):
        try:
            return get_template(template_name)
        except TemplateDoesNotExist:
            raise TemplateDoesNotExist(f"Could not load template: {template_name}")

    def render(self, template_name, context):
        template = self.get_template(template_name)
        return template.render(context)
