from django.contrib import admin

from .models import Category, Post, Testimonial


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


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")
    search_fields = ("name", "body")
    prepopulated_fields = {"slug": ("name",)}

    class Media:
        js = (
            "tinymce/tinymce.min.js",  # TinyMCE
            "js/tinyInject.js",  # initializes TinyMCE with config
        )
