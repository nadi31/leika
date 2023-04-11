
from django.db import models
from datetime import datetime
import calendar
import base64
from django.utils import timezone
import uuid
from shortuuid.django_fields import ShortUUIDField
from shortuuid.django_fields import ShortUUIDField
from io import BytesIO
from easy_thumbnails.fields import ThumbnailerImageField
from easy_thumbnails.files import get_thumbnailer
from django.db.models.signals import post_save
from django.dispatch import receiver
from authentification.models import MyUser, Cub, Giver
from datetime import datetime, timedelta


class Course(models.Model):

    title = models.CharField(max_length=300, null=True, blank=True)
    accroche = models.TextField(null=True, blank=True)
    aSavoir = models.TextField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    annulation = models.TextField(null=True, blank=True)
    # If a field has blank=True, form validation will allow entry of an empty value. null is purely database-related
    date = models.DateField(null=True, blank=True)
    hour = models.TimeField(null=True, blank=True)
    isVerified = models.BooleanField(default=False)
    price = models.FloatField(null=True, blank=True)
    img1 = models.ImageField(null=True, blank=True,
                             upload_to="gallery", default='../media/sewing.png')
    img2 = models.ImageField(null=True, blank=True,
                             upload_to="gallery", default='../media/sewing.png')
    img3 = models.ImageField(null=True, blank=True,
                             upload_to="gallery", default='../media/sewing.png')
    isDiscounted = models.BooleanField(default=False)
    discount = models.FloatField(null=True, blank=True)
    isRemote = models.BooleanField(default=False)
    points = models.IntegerField(null=True, blank=True)

    lieu = models.IntegerField(null=True, blank=True)
    seats = models.IntegerField(null=True, blank=True)
    needCertificate = models.BooleanField(default=False)
    dateFin = models.DateField(null=True, blank=True)
    hourFin = models.TimeField(null=True, blank=True)
  #  imgName = models.URLField(max_length=200, blank=True, null=True)
    thumbnail1 = ThumbnailerImageField(
        upload_to='gallery', null=True, blank=True)
    thumbnail2 = ThumbnailerImageField(
        upload_to='gallery', null=True, blank=True)
    thumbnail3 = ThumbnailerImageField(
        upload_to='gallery', null=True, blank=True)
    isIntermediate = models.BooleanField(default=False)
    isBeginner = models.BooleanField(default=False)
    isAdvanced = models.BooleanField(default=False)
    valOffers = models.IntegerField(null=True, blank=True)
    teamBuildingActivity = models.BooleanField(default=False)
    free = models.BooleanField(default=False)
    accessible = models.BooleanField(default=False)
    duoActivity = models.BooleanField(default=False)
    terroirActivity = models.BooleanField(default=False)
    language = models.CharField(max_length=30, null=True, blank=True)

    CATEGORY_CHOICES = (
        (1, 'arts_plastiques'),
        (2, 'arts_de_scene'),
        (3, 'loisirs_creatifs'),
        (4, 'professionnel'),
        (5, 'culinaire'),
        (6, 'culture'),
        (7, 'linguistique'),
        (8, 'sport'),
        (9, 'jeux'),
        (10, 'beaute_bien_etre'),
        (11, 'tours_circuits'),
    )

    category = models.PositiveSmallIntegerField(
        choices=CATEGORY_CHOICES, blank=True, null=True)

    sub_category = models.CharField(max_length=200, null=True, blank=True)
    age = models.CharField(max_length=100, null=True, blank=True)
    owner = models.ForeignKey(
        'authentification.Giver', related_name='courses', on_delete=models.CASCADE)
    # value= valeur de la répétition: 1x/mois, 1x/semaine, 1x/jour
    value = models.IntegerField(null=True, blank=True)
    date_fin = models.DateField(null=True, blank=True)
    courseHourIsCreated = models.BooleanField(default=False)
    # adress = models.ForeignKey(
    #  'authentification.Adress', related_name='courses', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

  #  def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
  #      prev_name = str(self.img.url).split('/media/')
  #      name = '../media/gallery/' + prev_name[1]
  #      print("ATTENTION")
  #      print(name)
  #      options = {'size': (200, 200), 'crop': True}
  #      self.thumbnail = get_thumbnailer(name).get_thumbnail(options)
  #      super(Course, self).save(force_insert,
  #                               force_update, using, update_fields)


class CourseHour(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField(default=None, blank=False, null=False)
    hour = models.TimeField(null=True, blank=True)
    dateFin = models.DateField(default=None, blank=False, null=False)
    hourFin = models.TimeField(null=True, blank=True)
    seats = models.IntegerField(null=True, blank=True)


class Offers(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    seatsFirst = models.IntegerField(null=True, blank=True)
    seatsLast = models.IntegerField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)


# @ receiver(post_save, sender=Course, dispatch_uid="makeThumbnail_update")
def makeThumbnail(sender, instance, **kwargs):

    # prev_name = instance.img.url
    prev_name1 = str(instance.img1.url).split('/media/gallery')
    name1 = '../media/gallery' + prev_name1[0]
    # name = '/Users/nadielmehdi/leika/backend/src'+prev_name
    print("ATTENTION")
    print(name1)
    options = {'size': (200, 200), 'crop': True}
    thumb1 = get_thumbnailer(name1).get_thumbnail(options)
    Course.objects.filter(id=instance.id).update(thumbnail1=thumb1)

    prev_name2 = str(instance.img2.url).split('/media/gallery')
    name2 = '../media/gallery' + prev_name2[1]
    # name = '/Users/nadielmehdi/leika/backend/src'+prev_name
    print("ATTENTION")
    print(name2)
    options = {'size': (200, 200), 'crop': True}
    thumb2 = get_thumbnailer(name2).get_thumbnail(options)
    Course.objects.filter(id=instance.id).update(thumbnail2=thumb2)

    prev_name3 = str(instance.img3.url).split('/media/gallery')
    name3 = '../media/gallery' + prev_name3[1]
    # name = '/Users/nadielmehdi/leika/backend/src'+prev_name
    print("ATTENTION")
    print(name3)
    options = {'size': (200, 200), 'crop': True}
    thumb3 = get_thumbnailer(name3).get_thumbnail(options)
    Course.objects.filter(id=instance.id).update(thumbnail3=thumb3)


def add_months(sourcedate, months):
    month = sourcedate.month - 1 + months
    year = sourcedate.year + month // 12
    month = month % 12 + 1
    day = min(sourcedate.day, calendar.monthrange(year, month)[1])
    return datetime(year, month, day)


@ receiver(post_save, sender=Course, dispatch_uid="createCourseHour")
def createCourseHour(sender, instance, **kwargs):
    if instance.courseHourIsCreated != True:
        print("AJOUTER COURSEHOUR")

        # date= date de début
        # dateFIn= petite fin => intervalle de fin
        # date_fin=> date de fin finale// de fin de périodicité
        CourseHour.objects.filter(course=instance).delete()
        if instance.value == 0 and instance.courseHourIsCreated == False:
            # pas de périodicité
            courseHour = CourseHour(course=instance)
            courseHour.date = instance.date
            courseHour.dateFin = instance.dateFin
            courseHour.hour = instance.hour
            courseHour.hourFin = instance.hourFin
            courseHour.save()
        if instance.value > 0 and instance.courseHourIsCreated == False:
            if instance.value == 1:
                # périodicité par jour
                nb_jours = (instance.date_fin-instance.date).days
            # instance.date+timedelta(nb_jours)
                for iteration in range(0, nb_jours):
                    courseHour = CourseHour(course=instance)
                    courseHour.date = instance.date+timedelta(iteration)
                    courseHour.dateFin = instance.dateFin+timedelta(iteration)
                    courseHour.hour = instance.hour
                    courseHour.hourFin = instance.hourFin
                    courseHour.save()
            if instance.value == 2:
                # périodicité par semaines
                nb_semaines = (instance.date_fin-instance.date).days//7
                for iteration in range(0, nb_semaines):
                    courseHour = CourseHour(course=instance)
                    courseHour.date = instance.date+timedelta(iteration*7)
                    courseHour.dateFin = instance.dateFin + \
                        timedelta(iteration*7)
                    courseHour.hour = instance.hour
                    courseHour.hourFin = instance.hourFin
                    courseHour.save()
            if instance.value == 3:
                # pariodicité par mois
                nb_mois = (instance.date_fin.month - instance.date.month)
                print("BN MONTHS", nb_mois)
                #nb_mois = (instance.date_fin-instance.date).days//30
                for iteration in range(0, nb_mois+1):
                    courseHour = CourseHour(course=instance)
                    courseHour.date = add_months(instance.date, iteration)
                    print("COURSEHOURSE.DATE ", courseHour.date)
                    courseHour.dateFin = add_months(
                        instance.dateFin, iteration)
                    courseHour.hour = instance.hour
                    courseHour.hourFin = instance.hourFin
                    courseHour.save()


class Booking(models.Model):
    #single_bookings = models.ManyToManyField(SingleBooking)
    cub = models.ForeignKey(Cub, on_delete=models.CASCADE)
    dateHour = models.DateTimeField(default=timezone.now)
    ref = ShortUUIDField(length=11, max_length=11)


class SingleBooking(models.Model):
    courseHour = models.ForeignKey(CourseHour, on_delete=models.CASCADE)
    seats = models.IntegerField(null=True, blank=True)
    courses = models.ForeignKey(Course, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    isCommented = models.BooleanField(default=False, null=True, blank=True)


class Wishlist(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    cub = models.ForeignKey(Cub, on_delete=models.CASCADE)


# class ShoppingCart(models.Model):
 #   courses = models.ManyToManyField(Course, blank=True)
  #  cub = models.ForeignKey(Cub, on_delete=models.CASCADE)


class Review(models.Model):
    cub = models.ForeignKey(Cub, on_delete=models.CASCADE)
    booking = models.ForeignKey(
        SingleBooking, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    note = models.FloatField(null=True, blank=True)
    commentOn = models.BooleanField(null=True, blank=True)
    comment_cub = models.TextField(
        max_length=1000, null=True, blank=True)
    dateHour = models.DateTimeField(default=timezone.now)
    initiale = models.CharField(max_length=2, null=True, blank=True)
    titre = models.CharField(max_length=50, null=True, blank=True)
    prenom = models.CharField(max_length=20, null=True, blank=True)
