from django.test import TestCase
from rest_framework.test import APIClient
from unittest.mock import patch, MagicMock
from courses.models import Course, CourseHour
from authentification.models import MyUser, Giver, Adress
from django.core.cache import cache
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import io
class ResearchCourseListTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api-course/search/'  
        self.user= MyUser.objects.create(username = "test@test.com",email = "test@test.com",user_type1 =3,  password='testpassword')
       # self.img1 = SimpleUploadedFile("test_image.jpg", b"file_content", content_type="image/jpeg")
        image = Image.new('RGB', (100, 100), color='red')
        image_file = io.BytesIO()
        image.save(image_file, format='JPEG')
        image_file.seek(0)  # Reset file pointer to the start

        # Mock the image file
        self.img1 = SimpleUploadedFile(
            "test_image.jpg",  # File name
            image_file.read(),  # File content
            content_type="image/jpeg"  # MIME type
        )

    
        self.giver = Giver.objects.create(user = self.user,img1 = self.img1,description ="", appelation = "Test",siret = "",phone = "")

     
        self.address = Adress.objects.create(id=1,   name = "Place du Capitole",
    zip_code = "31000",
    city = "Toulouse",
    apartment_number ="",
    country = "France",
    add_ons = "",
    giver = self.user,
    lat="43.6044292",
    lng ="1.4412372")
      
        self.course = Course.objects.create(
          
    
   title= "Cours de pilotage",
    accroche= "Apprenez à piloter",
    aSavoir= "Ammener votre sens de l'orientation et vous-meme ! \r\nNous vous menons dans les airs toulousains grâce à un savoir faire de plus de 10 ans.",
    content= "Une heure de préparation et d'explication. \r\nUne heure de pratique. \r\nTotal : deux heures",
    annulation= "24 heures avant possible",
    date= "2024-10-20",
    hour= "12:40:00",
    isVerified= False,
    price= 250.0,
    img1= self.img1,
    img2=  self.img1,
    img3=  self.img1,
    isDiscounted= False,
    discount= None,
    isRemote= False,
    points= None,
    lieu= self.address.id,
    seats= None,
    needCertificate= False,
    dateFin= "2024-10-20",
    hourFin= None,
    thumbnail1= None,
    thumbnail2= None,
    thumbnail3= None,
    isIntermediate= False,
    isBeginner= True,
    isAdvanced= False,
    valOffers= None,
    teamBuildingActivity= False,
    free= False,
    accessible= False,
    duoActivity= False,
    terroirActivity= False,
    birthdayActivity= False,
    language= "Français",
    category= 8,
    sub_category= "Parachutisme",
    age= "Adultes",
    value= 0,
    date_fin= "2024-10-20",
    courseHourIsCreated= False,
    owner= self.giver

   
        )
       

    def test_get_courses_with_city_filter(self):
        with patch('courses.api.views.googlemaps.Client') as mock_gmaps:
            mock_gmaps_instance = mock_gmaps.return_value
            mock_gmaps_instance.distance_matrix.return_value = {
                'rows': [{'elements': [{'distance': {'value': 15000}}]}]
            }

            response = self.client.get(self.url+"?&city=Toulouse, France")

            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.data), 1)
            self.assertEqual(response.data[0]['title'], "Cours de pilotage")

    def test_get_courses_with_date_max_filter(self):
        response = self.client.get(self.url +"?&date_max=2024-10-20")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Cours de pilotage")

    def test_get_courses_with_multiple_filters(self):
        response = self.client.get(self.url+ "?&city=Toulouse, France"
          
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Cours de pilotage")

   

    def test_no_results_found(self):
        response = self.client.get(self.url+"?&city=Toulouse, France")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

  
    def test_get_courses_with_giver_cache(self):
        cache.set('givers', [self.giver], timeout=60 * 60 * 4)
        cached_givers = cache.get('givers')

        self.assertIsNotNone(cached_givers)
        self.assertEqual(len(cached_givers), 1)
        self.assertEqual(cached_givers[0].appelation, "Test")
