from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from blog.models import Category, Post, Testimonial


User = get_user_model()


class Command(BaseCommand):
    help = "Seed database with sample data."

    @transaction.atomic
    def handle(self, *args, **options):
        if Post.objects.exists():
            raise CommandError(
                "This command cannot be run when any posts exist, to guard "
                + "against accidental use on production."
            )

        self.stdout.write("Seeding database...")

        create_author_and_posts()

        create_testimonials()

        self.stdout.write("Done.")


def create_author_and_posts():
    def make_posts(author, posts):
        Post.objects.bulk_create(
            [
                Post(author=author, title=title, slug=slug, body=body, excerpt=excerpt)
                for title, slug, body, excerpt in posts
            ]
        )

    def make_categories(categories):
        Category.objects.bulk_create(
            [Category(name=name, slug=slug) for name, slug in categories]
        )

    john = User.objects.create(name="John Smith", username="johnsmith")
    body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    make_posts(
        john,
        [
            ["Driving The Knees Out", "knees-out", body, "Thoughts on the knees."],
            ["The Hips Don't Lie", "hips", body, "Thoughts on the hips."],
            ["King of the Shoulder", "shoulder", body, "Thoughts on the shoulder."],
        ],
    )

    make_categories(
        [
            ["Fitness", "fitness"],
            ["Upper Body", "upper-body"],
            ["Programming", "programming"],
        ]
    )

    Post.objects.filter(slug="knees-out").first().categories.add(
        Category.objects.get(slug="fitness")
    )
    Post.objects.filter(slug="hips").first().categories.add(
        Category.objects.get(slug="fitness")
    )
    Post.objects.filter(slug="shoulder").first().categories.add(
        Category.objects.get(slug="upper-body")
    )


def create_testimonials():
    def make_testimonials(testimonials):
        Testimonial.objects.bulk_create(
            [
                Testimonial(
                    name=name, slug=slug, body=body, title=title, company=company
                )
                for name, slug, body, title, company in testimonials
            ]
        )

    body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    title = "CEO"
    company = "St. Paul Terriers"

    make_testimonials(
        [
            ["John David", "john-david", body, title, company],
            ["John Shawn", "john-shawn", body, title, company],
            ["John Juan", "john-juan", body, title, company],
        ],
    )
