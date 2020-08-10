from django.db import models
from datetime import datetime
import base64
from io import BytesIO
from easy_thumbnails.fields import ThumbnailerImageField
from easy_thumbnails.files import get_thumbnailer
from django.db.models.signals import post_save
from django.dispatch import receiver



    


class Course(models.Model):
    title = models.CharField(max_length=300)
    content = models.TextField()
    # If a field has blank=True, form validation will allow entry of an empty value. null is purely database-related
    date = models.DateTimeField(null=True, blank=True)
    isVerified = models.BooleanField(default=False)
    price = models.FloatField(null=True, blank=True)
    img = models.ImageField(upload_to="gallery",
                            default='../media/sewing.png')
    isDiscounted = models.BooleanField(default=False)
    discount = models.FloatField(null=True, blank=True)
    isRemote = models.BooleanField(default=False)
    points = models.IntegerField(null=True, blank=True)
    seats = models.IntegerField(null=True, blank=True)
    needCertificate = models.BooleanField(default=False)
    dateFin = models.DateTimeField(null=True, blank=True)
    imgName = models.URLField(max_length=200, blank=True, null=True)
    thumbnail = ThumbnailerImageField(
        upload_to='gallery', null=True, blank=True)
    isIntermediate = models.BooleanField(default=False)
    isBeginner = models.BooleanField(default=False)
    isAdvanced = models.BooleanField(default=False)

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


@receiver(post_save, sender=Course, dispatch_uid="makeThumbnail_update")
def makeThumbnail(sender, instance, **kwargs):

    #prev_name = instance.img.url
    prev_name = str(instance.img.url).split('/media/gallery')
    name = '../media/gallery' + prev_name[1]
    #name = '/Users/nadielmehdi/leika/backend/src'+prev_name
    print("ATTENTION")
    print(name)
    options = {'size': (200, 200), 'crop': True}
    thumb = get_thumbnailer(name).get_thumbnail(options)
    Course.objects.filter(id=instance.id).update(thumbnail=thumb)
