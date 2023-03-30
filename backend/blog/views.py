from rest_framework import generics

from .models import Post, Category, Testimonial
from .serializers import (
    PostSerializer, CategorySerializer, TestimonialSerializer
)


class PostListLatestAPIView(generics.ListAPIView):
    queryset = (
        Post.objects.select_related("author")
        .prefetch_related("categories")
        .order_by("-created_at")[:3]
    )
    serializer_class = PostSerializer


class PostListAPIView(generics.ListAPIView):
    queryset = (
        Post.objects.select_related("author")
        .prefetch_related("categories")
        .order_by("-created_at")
    )
    serializer_class = PostSerializer


class PostListByCategoryAPIView(generics.ListAPIView):
    queryset = (
        Post.objects.select_related("author")
        .prefetch_related("categories")
        .order_by("-created_at")
    )
    serializer_class = PostSerializer

    def get_queryset(self):
        category_slug = self.kwargs["category_slug"]
        return self.queryset.filter(categories__slug=category_slug)


class PostDetailAPIView(generics.RetrieveAPIView):
    queryset = Post.objects.select_related("author")
    serializer_class = PostSerializer
    lookup_field = "slug"


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"


class TestimonialListAPIView(generics.ListAPIView):
    queryset = Testimonial.objects.order_by("-created_at")[:3]
    serializer_class = TestimonialSerializer


class TestimonialDetailAPIView(generics.RetrieveAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    lookup_field = "slug"
