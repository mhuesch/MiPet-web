from django import template

register = template.Library()

def modulo(num, mod):
    return num % mod
modulo = register.filter('modulo', modulo)