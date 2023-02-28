from django import forms


class TinyMCEImageForm(forms.Form):
    file = forms.ImageField()

    def clean_file(self):
        if not (image := self.cleaned_data.get("file")):
            raise forms.ValidationError("Couldn't read uploaded image")
        if image.size > 2 * 1024 * 1024:
            raise forms.ValidationError("Image file too large ( > 2MB )")
        return image
