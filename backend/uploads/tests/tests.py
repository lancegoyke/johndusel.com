from django.conf import settings
from django.test import TestCase

from uploads.models import Image


class ImageUploadTests(TestCase):
    def test_upload_image(self):
        with open("uploads/tests/test-image.jpg", "rb") as f:
            response = self.client.post(
                "/upload/", {"file": f}, HTTP_ACCEPT="application/json"
            )
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            response.content,
            {
                "message": "Image uploaded successfully",
                "location": f"{settings.DOMAIN}/media/images/test-image.jpg",
            },
        )
        self.assertEqual(Image.objects.count(), 1)
        self.assertEqual(str(Image.objects.first()), "images/test-image.jpg")

    def test_upload_image_wrong_method(self):
        response = self.client.get("/upload/")
        self.assertJSONEqual(response.content, {"error": "Wrong request method"})

    def test_uploaded_image_too_big(self):
        with open("uploads/tests/test-5mb.png", "rb") as f:
            response = self.client.post(
                "/upload/", {"file": f}, HTTP_ACCEPT="application/json"
            )
        self.assertJSONEqual(
            response.content, {"file": ["Image file too large ( > 2MB )"]}
        )
