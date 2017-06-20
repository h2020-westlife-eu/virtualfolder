from django.contrib.auth.models import User
user=User.objects.create_user('vagrant',password='vagrant')
user.save()
