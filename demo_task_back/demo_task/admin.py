from django.contrib import admin
from .models import Request, Position, PositionToRequest, Worker, History, Payment

admin.site.register((Position, Worker))


class PositionToRequestInLine(admin.TabularInline):
    model = PositionToRequest


class PaymentInLine(admin.TabularInline):
    model = Payment


class HistoryInLine(admin.TabularInline):
    model = History
    readonly_fields = ('created', 'status', 'worker', 'resolution')
    ordering = ('-created',)


@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    inlines = [PositionToRequestInLine, PaymentInLine, HistoryInLine]


@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = ('request_id', 'created', 'status', 'worker')
