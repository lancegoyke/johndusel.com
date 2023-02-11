from unittest import mock

from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.test import TestCase
from django.utils import timezone
from django.utils.timezone import datetime

from blog.models import Post
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

    def test_create_post(self) -> None:
        self.assertEqual(self.post.title, "Test Post")
        self.assertEqual(self.post.slug, "test-post")
        self.assertEqual(self.post.body, "Test body")
        self.assertEqual(self.post.author, self.admin_user)
        self.assertEqual(self.post.created_at, self.test_time_now)
        self.assertEqual(self.post.updated_at, self.test_time_now)

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
