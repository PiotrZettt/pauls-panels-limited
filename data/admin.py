from django.contrib import admin
from .models import Customer, Project, Operation, Collection, Delivery, PartInstance

# Register your models here.


class CustomerAdmin(admin.ModelAdmin):
    model = Customer
    list_display = ['name']


class ProjectAdmin(admin.ModelAdmin):
    model = Project
    list_display = [
        'customer',
        'name',
        'fg_code',
        'stock'
    ]


class OperationAdmin(admin.ModelAdmin):
    model = Operation
    list_display = [
        'operator',
        'project',
        'serial_number',
        'completion',
        'comments',
        'date_signed'
    ]


class CollectionAdmin(admin.ModelAdmin):
    model = Collection
    list_display = [
        'project',
        'qty',
    ]


class DeliveryAdmin(admin.ModelAdmin):
    model = Delivery
    list_display = [
        'project',
        'qty',
    ]


class PartInstanceAdmin(admin.ModelAdmin):
    model = PartInstance
    list_display = [
        'project',
        'collection',
        'serial_number'
    ]


admin.site.register(Customer, CustomerAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Operation, OperationAdmin)
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Delivery, DeliveryAdmin)
admin.site.register(PartInstance, PartInstanceAdmin)

