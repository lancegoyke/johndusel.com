from rest_framework import serializers

from .models import Post, Category, Testimonial
from users.serializers import UserSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "slug"]


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    categories = CategorySerializer(many=True)

    class Meta:
        model = Post
        fields = "__all__"


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__"
