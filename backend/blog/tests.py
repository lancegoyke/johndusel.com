from unittest import mock

from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from django.utils.timezone import datetime

from blog.models import Category, Post
from users.models import CustomUser as UserType


class PostTests(TestCase):
    test_time_now: datetime = timezone.now()
    admin_user: UserType
    post: Post

    @classmethod
    @mock.patch("django.utils.timezone.now", mock.Mock(return_value=test_time_now))
    def setUpTestData(cls) -> None:
        User = get_user_model()
        cls.admin_user = User.objects.create_superuser(
            username="adminuser",
            email="adminuser@example.com",
            password="testpass123",
            name="Admin User",
        )
        cls.post = Post.objects.create(
            title="Test Post",
            slug="test-post",
            body="Test body",
            author=cls.admin_user,
        )
        cls.category = Category.objects.create(name="Testing", slug="testing")
        cls.post_with_category = Post.objects.create(
            title="Test Post with a Category",
            slug="test-post-with-a-category",
            body="This testpost contains info about testing.",
            author=cls.admin_user,
        )
        cls.post_with_category.categories.add(cls.category)

    def test_create_post(self) -> None:
        self.assertEqual(self.post.title, "Test Post")
        self.assertEqual(self.post.slug, "test-post")
        self.assertEqual(self.post.body, "Test body")
        self.assertEqual(self.post.author, self.admin_user)
        self.assertEqual(self.post.created_at, self.test_time_now)
        self.assertEqual(self.post.updated_at, self.test_time_now)

    def test_post_get_categories(self) -> None:
        self.assertEqual(self.post_with_category.get_categories, "Testing")

    def test_post_get_categories_with_multiple(self) -> None:
        new_category = Category.objects.create(name="Design", slug="design")
        self.post_with_category.categories.add(new_category)
        self.assertIn("Testing", self.post_with_category.get_categories)
        self.assertIn("Design", self.post_with_category.get_categories)

    def test_duplicate_slug(self) -> None:
        with self.assertRaises(IntegrityError):
            Post.objects.create(
                title="Test Post",
                slug="test-post",
                body="Test body",
                author=self.admin_user,
            )

    def test_str(self) -> None:
        self.assertEqual(str(self.post), "Test Post")


class PostListAPIViewTests(TestCase):
    test_time_now: datetime = timezone.now()
    admin_user: UserType
    post: Post

    @classmethod
    @mock.patch("django.utils.timezone.now", mock.Mock(return_value=test_time_now))
    def setUpTestData(cls) -> None:
        User = get_user_model()
        cls.admin_user = User.objects.create_superuser(
            username="adminuser",
            email="adminuser@example.com",
            password="testpass123",
            name="Admin User",
        )
        cls.category = Category.objects.create(name="Testing", slug="testing")
        cls.post = Post.objects.create(
            title="Test Post",
            slug="test-post",
            body="Test body",
            author=cls.admin_user,
        )
        cls.post_with_category = Post.objects.create(
            title="Test Post with a Category",
            slug="test-post-with-a-category",
            body="This testpost contains info about testing.",
            author=cls.admin_user,
        )
        cls.post_with_category.categories.add(cls.category)

    def test_get(self) -> None:
        response = self.client.get("/api/posts/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["title"], "Test Post")
        self.assertEqual(response.data[0]["slug"], "test-post")
        self.assertEqual(response.data[0]["body"], "Test body")
        self.assertEqual(response.data[0]["author"]["id"], self.admin_user.id)
        self.assertEqual(
            response.data[0]["author"]["username"], self.admin_user.username
        )
        self.assertEqual(response.data[0]["author"]["email"], self.admin_user.email)
        self.assertEqual(response.data[0]["author"]["name"], self.admin_user.name)
        self.assertEqual(
            response.data[0]["created_at"], f"{self.test_time_now.isoformat()[:-6]}Z"
        )
        self.assertEqual(
            response.data[0]["updated_at"], f"{self.test_time_now.isoformat()[:-6]}Z"
        )

    def test_post_list_by_category_API_get(self) -> None:
        response = self.client.get(
            reverse("posts_by_category", kwargs={"category_slug": "testing"})
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.category.name)
