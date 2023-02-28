from django.contrib import admin

from .models import Image


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ("alt_text", "image", "created_at")
    list_filter = ("created_at",)
    search_fields = ("alt_text",)
    readonly_fields = (
        "created_at",
        "updated_at",
    )
    ordering = ("-created_at",)
