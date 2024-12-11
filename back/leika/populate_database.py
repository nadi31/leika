import os
import random
from datetime import datetime, timedelta
import django


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "./settings.py")
django.setup()

from your_app.models import MyUser, Giver, Address, Course

def random_date(start, end):
    """Generate a random date between start and end."""
    return start + timedelta(days=random.randint(0, (end - start).days))

def create_givers():
    """Create 4 givers and their associated MyUser entries."""
    givers = []
    for i in range(1, 5):
        # Create MyUser
        user = MyUser.objects.create_user(
            email=f"giver{i}@example.com",
            username=f"giver{i}",
            password="password123",
            user_type1=3  
        )

        # Create Giver
        giver = Giver.objects.create(
            user=user,
            img1=f"/media/img1.jpg",
            description=f"Giver {i} description",
            appelation=f"Giver {i} appellation",
            phone=f"06{random.randint(10000000, 99999999)}",
            email_giver=f"giver{i}@example.com",
        )
        givers.append(giver)
    return givers

def create_addresses(givers):
    """Create addresses for givers."""
    places = [
        "Place du Capitole", "Rue Alsace Lorraine", "Jardin des Plantes",
        "Pont Neuf", "Place Saint-Pierre", "Canal du Midi",
        "Place Wilson", "Saint-Cyprien", "Minimes", "Purpan"
    ]
    addresses = []
    for giver in givers:
        for i in range(3):  # Each giver gets up to 3 addresses
            address = Address.objects.create(
                name=random.choice(places),
                zip_code="31000",
                city="Toulouse",
                country="France",
                lat=43.6 + random.uniform(-0.01, 0.01),
                lng=1.433 + random.uniform(-0.01, 0.01),
                giver=giver,
            )
            addresses.append(address)
    return addresses

def create_courses(givers, addresses):
    """Create 12 courses distributed among givers and addresses."""
    images= [ "http://localhost:8000/media/donut.jpg",
            "http://localhost:8000/media/pain.jpg",
            "http://localhost:8000/media/pilotage.jpg",]
    sub_categories = ["Quad",  "Pâtisserie", "Cours de cuisine"]
    for i in range(1, 13):
        giver = random.choice(givers)
        address = random.choice([addr for addr in addresses if addr.giver == giver])
        #category = random.choice(categories)

        Course.objects.create(
            title=f"Course {i} - {category}",
            accroche=f"Introduction to {category}",
            aSavoir="Bring your motivation and curiosity!",
            content="2 hours of engaging activities and practice.",
            annulation="24 hours prior cancellation allowed",
            date=random_date(datetime(2024, 1, 1), datetime(2024, 12, 31)),
            hour="12:00:00",
            isVerified=random.choice([True, False]),
            price=random.uniform(50.0, 300.0),
            img1=random.choice(images),
            img2=random.choice(images),
            img3=random.choice(images),
            isDiscounted=random.choice([True, False]),
            discount=random.uniform(10.0, 50.0) if random.choice([True, False]) else None,
            isRemote=random.choice([True, False]),
            lieu=address.id,
            seats=random.randint(1, 20),
            needCertificate=random.choice([True, False]),
            dateFin=random_date(datetime(2024, 1, 1), datetime(2024, 12, 31)),
            owner=giver.user.id,
            language="Français",
            category=random.randint(1, 13),  
            sub_category=random.choice(sub_categories),
            age=random.choice(["Adultes", "Enfants", "Tous les âges", "Ados"]),
            isBeginner=random.choice([True, False]),
            isIntermediate=random.choice([True, False]),
            isAdvanced=random.choice([True, False]),
        )

# Main function to populate the database
def populate_database():
    # Clear existing data (optional, for testing)
    MyUser.objects.filter(user_type1=3).delete()  # Delete givers
    Address.objects.all().delete()
    Course.objects.all().delete()

    # Create data
    givers = create_givers()
    addresses = create_addresses(givers)
    create_courses(givers, addresses)
    print("Database populated with sample data!")

# Run the script
if __name__ == "__main__":
    populate_database()
