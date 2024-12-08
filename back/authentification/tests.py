from django.test import TestCase
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
from authentification.models import MyUser
from rest_framework.authtoken.models import Token
from django.conf import settings

class UserOublieViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/user/oublie/' 
        self.user = MyUser.objects.create_user(email='test@example.com',username='test@example.com', password='testpassword' ,user_type1 =2)

    def test_post_missing_email(self):
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


    def test_post_non_existent_user(self):
        response = self.client.post(self.url, {'email': 'nonexistent@example.com'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
      


    @patch('authentification.views.UserPwdResetSerializer')
    def test_post_invalid_serializer(self, mock_serializer):
        mock_serializer_instance = MagicMock()
        mock_serializer.return_value = mock_serializer_instance
        mock_serializer_instance.is_valid.return_value = False
        mock_serializer_instance.errors = {'email': ['Invalid email address']}

        response = self.client.post(self.url, {'email': self.user.email})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
      #  self.assertEqual(response.data, {'email': ['Invalid email address']})
       