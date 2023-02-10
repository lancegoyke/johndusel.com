from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser):
    """User model."""

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, max_length=255)

    def __str__(self):
        return f"@{self.username}"

    def get_short_name(self):
        return self.username

    def get_full_name(self):
        return self.name
