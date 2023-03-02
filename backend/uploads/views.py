from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .forms import TinyMCEImageForm
from .models import Image


@csrf_exempt
def upload_image(request):
    if request.method != "POST":
        return JsonResponse({"error": "Wrong request method"})

    # get the file from the request
    file_obj = request.FILES.get("file")
    form = TinyMCEImageForm(request.POST, request.FILES)

    # is all well?
    if not form.is_valid():
        return JsonResponse(form.errors)

    # yes! save the file to model instance
    image = Image(image=file_obj)
    image.save()
    location: str = ""
    if settings.ENVIRONMENT == "production":
        location = image.image.url
    else:
        location = f"{settings.DOMAIN}{image.image.url}"
    return JsonResponse(
        {
            "message": "Image uploaded successfully",
            "location": location,
        }
    )
