rm *.box
vagrant package --base westlife1cernvm --output westlife-cernvm4.box --vagrantfile Vagrantfile

vagrant package --output westlife-cernvm4dl.box --vagrantfile Vagrantfile --base westlife1cernvmDL


vagrant package --base westlife1cernvmcloud --output westlife-cernvm4cloud.box --vagrantfile Vagrantfile
