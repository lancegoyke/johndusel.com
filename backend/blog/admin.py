from django.contrib import admin
from django.db import models

from .models import Category, Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "author", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")
    search_fields = ("title", "body")
    prepopulated_fields = {"slug": ("title",)}

    class Media:
        js = (
            "tinymce/tinymce.min.js",  # TinyMCE
            "js/tinyInject.js",  # initializes TinyMCE with config
        )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
