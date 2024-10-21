import sys
import os
from faker import Faker
import random

# Add the project root directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import User, Pet, Breed, PetType, AdoptionRequest, Favorite

# Initialize Faker
fake = Faker()

# Create the Flask app context
app = create_app()

# Define a list of image URLs for different pets (20 images for 20 pets)
pet_data = [
    {"image": "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Golden Retriever", "description": "A friendly and intelligent dog breed."},
    {"image": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Cat", "breed": "Persian Cat", "description": "A fluffy breed known for its quiet and gentle nature."},
    {"image": "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Cat", "breed": "Siamese Cat", "description": "An elegant breed with striking blue eyes."},
    {"image": "https://images.pexels.com/photos/991831/pexels-photo-991831.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Rabbit", "breed": "Holland Lop", "description": "A small and friendly breed with floppy ears."},
    {"image": "https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Fish", "breed": "Goldfish", "description": "A popular pet fish known for its vibrant colors."},
    {"image": "https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Labrador", "description": "A loyal and outgoing dog breed."},
    {"image": "https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Beagle", "description": "A small hound known for its keen sense of smell."},
    {"image": "https://images.pexels.com/photos/16622787/pexels-photo-16622787/free-photo-of-portrait-of-dog.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Poodle", "description": "A highly intelligent and trainable dog."},
    {"image": "https://images.pexels.com/photos/8520729/pexels-photo-8520729.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Bulldog", "description": "A gentle and affectionate breed."},
    {"image": "https://images.pexels.com/photos/16609298/pexels-photo-16609298/free-photo-of-black-cat-on-black-background.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Cat", "breed": "Ragdoll", "description": "Known for its soft fur and relaxed demeanor."},
    {"image": "https://images.pexels.com/photos/162123/dog-cavalier-king-charles-spaniel-funny-pet-162123.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Cavalier King Charles Spaniel", "description": "A small and playful dog known for its affectionate nature."},
    {"image": "https://images.pexels.com/photos/16615003/pexels-photo-16615003/free-photo-of-a-dog-on-a-leash-outdoors.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Shih Tzu", "description": "A toy breed known for its long flowing coat."},
    {"image": "https://images.pexels.com/photos/8616808/pexels-photo-8616808.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Chihuahua", "description": "A tiny breed with a big personality."},
    {"image": "https://images.pexels.com/photos/10529037/pexels-photo-10529037.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Boxer", "description": "A playful and energetic breed."},
    {"image": "https://images.pexels.com/photos/16623456/pexels-photo-16623456/free-photo-of-portrait-of-a-terrier-wearing-a-collar.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Terrier", "description": "Known for their feisty personality and intelligence."},
    {"image": "https://images.pexels.com/photos/16457880/pexels-photo-16457880/free-photo-of-close-up-of-pit-bull.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Pit Bull", "description": "A strong and loving breed."},
    {"image": "https://images.pexels.com/photos/28443969/pexels-photo-28443969/free-photo-of-adorable-calico-kitten-portrait-on-soft-background.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Cat", "breed": "Calico Cat", "description": "A cat with a beautiful and colorful coat."},
    {"image": "https://images.pexels.com/photos/5345962/pexels-photo-5345962.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Dachshund", "description": "A small breed known for its long body and short legs."},
    {"image": "https://images.pexels.com/photos/8628173/pexels-photo-8628173.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Great Dane", "description": "A giant breed known for its gentle demeanor."},
    {"image": "https://images.pexels.com/photos/11565293/pexels-photo-11565293.jpeg?auto=compress&cs=tinysrgb&w=300", "type": "Dog", "breed": "Australian Shepherd", "description": "An intelligent and energetic herding breed."},
]

with app.app_context():
    # Drop all tables and recreate them (optional)
    db.drop_all()
    db.create_all()

    # Seed PetTypes
    pet_types = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish']
    pet_type_objs = []

    for pet_type in pet_types:
        new_pet_type = PetType(name=pet_type)
        db.session.add(new_pet_type)
        pet_type_objs.append(new_pet_type)

    db.session.commit()

    # Seed Breeds
    breeds = set()
    for pet in pet_data:
        breeds.add(pet["breed"])
    
    breed_objs = []

    for breed in breeds:
        new_breed = Breed(name=breed)
        db.session.add(new_breed)
        breed_objs.append(new_breed)

    db.session.commit()

    # Seed Users
    users = []
    for _ in range(10):  # Create 10 users
        user = User(
            name=fake.name(),
            email=fake.unique.email(),  # Ensure unique emails
        )
        user.set_password(fake.password())  # Set password using the method defined in the User model
        db.session.add(user)
        users.append(user)

    db.session.commit()

    # Seed Pets with corresponding image URLs
    pets = []
    for pet_info in pet_data:  # Use the pet_data list to create pets
        pet = Pet(
            name=fake.first_name(),
            age=random.randint(1, 15),  # Age between 1 and 15
            description=pet_info["description"],
            pet_type_id=[pt.id for pt in pet_type_objs if pt.name == pet_info["type"]][0],
            owner_id=random.choice(users).id,
            image_url=pet_info["image"]  # Assign specific image URL
        )
        db.session.add(pet)
        pets.append(pet)

    db.session.commit()

    # Seed Adoption Requests
    for _ in range(30):  # Create 30 adoption requests
        adoption_request = AdoptionRequest(
            message=fake.text(max_nb_chars=200),  # Ensure this matches your model
            user_id=random.choice(users).id,
            pet_id=random.choice(pets).id,
            status=random.choice(['pending', 'approved', 'declined'])
        )
        db.session.add(adoption_request)

    db.session.commit()

    print("Database seeded successfully!")
