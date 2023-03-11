from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User

# Create your models here.
COMPLETION = (('Whole Part', 'Whole Part'), ('Inner', 'Inner'), ('Outer', 'Outer'), ('Weld Dressing', 'Weld Dressing'))


class Customer(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Project(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    fg_code = models.CharField(max_length=10)
    stock = models.IntegerField(validators=[MinValueValidator(0)])

    def __str__(self):
        return self.name


class Operation(models.Model):
    operator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    serial_number = models.CharField(max_length=12)
    completion = models.CharField(max_length=120, choices=COMPLETION, default='Whole Part')
    comments = models.CharField(max_length=200, null=True)
    date_signed = models.DateTimeField(auto_now_add=True)


class Collection(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    qty = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    date = models.DateField(auto_now_add=True)


class Delivery(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    qty = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    date = models.DateField(auto_now_add=True)


class PartInstance(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, null=True)
    serial_number = models.TextField(max_length=12, null=True)


