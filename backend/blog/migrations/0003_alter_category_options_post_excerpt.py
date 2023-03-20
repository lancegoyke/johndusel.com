# Generated by Django 4.1.6 on 2023-03-14 14:16

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("blog", "0002_category_post_categories"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="category",
            options={"verbose_name": "Category", "verbose_name_plural": "Categories"},
        ),
        migrations.AddField(
            model_name="post",
            name="excerpt",
            field=models.CharField(
                blank=True,
                max_length=160,
                verbose_name="Short summary of the post, used for SEO",
            ),
        ),
    ]