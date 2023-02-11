from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.test import TestCase
from users.models import CustomUser as UserType


class CustomUserTests(TestCase):
    def test_create_user(self) -> None:
        User = get_user_model()
        user: UserType = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123',
        )
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'testuser@example.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        with self.assertRaises(TypeError):
            User.objects.create_user()  # type: ignore
        with self.assertRaises(TypeError):
            User.objects.create_user(email="")  # type: ignore
        with self.assertRaises(TypeError):
            User.objects.create_user(email="", password="testpass123")  # type: ignore

    def test_create_superuser(self) -> None:
        User = get_user_model()
        admin_user: UserType = User.objects.create_superuser(
            username='superuser',
            email='superuser@example.com',
            password='testpass123',
        )
        self.assertEqual(admin_user.username, 'superuser')
        self.assertEqual(admin_user.email, 'superuser@example.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        with self.assertRaises(TypeError):
            User.objects.create_user()  # type: ignore
        with self.assertRaises(TypeError):
            User.objects.create_user(email="")  # type: ignore
        with self.assertRaises(TypeError):
            User.objects.create_user(email="", password="testpass123")  # type: ignore

    def test_duplicate_username(self) -> None:
        User = get_user_model()
        User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123',
        )
        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                username='testuser',
                email='testuser@example.com',
                password='testpass123',
            )

    def test_str(self) -> None:
        User = get_user_model()
        user: UserType = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123',
            name='Test User',
        )
        self.assertEqual(str(user), '@testuser')

    def test_get_short_name(self) -> None:
        User = get_user_model()
        user: UserType = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123',
            name='Test User',
        )
        self.assertEqual(user.get_short_name(), 'testuser')

    def test_get_full_name(self) -> None:
        User = get_user_model()
        user: UserType = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123',
            name='Test User',
        )
        self.assertEqual(user.get_full_name(), 'Test User')
