# Import all the possible settings classes so they are in globals() and apply_settings can see them
from .dev import SettingsDev
from .jenkins import SettingsJenkins
from .local_sqlite import SettingsLocalSqlite
from .staging import SettingsStaging
from .westlife_prod import SettingsWestLifeProd

from luna_django_commons.settings import apply_settings

apply_settings(globals())

#
# Post-settings actions
#
#    SECRET_KEY="89ce66615c1573aa492bc0764cee3edbcba04571b473a5ddf705e1ecdd7de022e1ecfaa0"

# adding VF specific user - vagrant:vagrant
from django.contrib.auth.models import User
if not (User.objects.filter(username='vagrant').exists()):
    try:
        user = User.objects.create_user('vagrant', 'vagrant@vagrant', 'vagrant')
    except:
        print "user created, warning some error", sys.exc_info()[0]
