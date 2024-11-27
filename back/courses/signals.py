from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Course, Address, Giver


def clear_related_caches():
    """
    Clears all related caches.
    """
    cache.delete('courses')  # Cache key for Course queryset
    cache.delete('addresses')  # Cache key for Address queryset
    cache.delete('givers')  # Cache key for Giver queryset
    cache.delete('multi_queryset_data')  # Combined data cache (if exists)


@receiver(post_save, sender=Course)
@receiver(post_save, sender=Address)
@receiver(post_save, sender=Giver)
def refresh_cache_on_save(sender, instance, **kwargs):
    """
    Clears cache when an instance is saved.
    """
    clear_related_caches()


@receiver(post_delete, sender=Course)
@receiver(post_delete, sender=Address)
@receiver(post_delete, sender=Giver)
def refresh_cache_on_delete(sender, instance, **kwargs):
    """
    Clears cache when an instance is deleted.
    """
    clear_related_caches()


@receiver(post_save, sender=Course)
@receiver(post_delete, sender=Course)
def invalidate_course_cache(sender, instance, **kwargs):
    """
    Clears view-level cache for CourseListView.
    """
    cache.clear()  # Clears all view-level cache (better than hardcoding keys)
