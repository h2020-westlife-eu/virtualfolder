#!/bin/bash
# create VMDK with user data file
# option 1) bootstrap from github

rm -rf iso
mkdir -p iso
fromdos src/*.sh
fromdos iso/*.sh
# encode script
base64 -w 0 src/user-data.sh > src/user-data.sh.encoded
cp src/context.sh.prefix iso/context.sh
# echo without new line
echo -n EC2_USER_DATA= >> iso/context.sh
# attach encoded script
cat src/user-data.sh.encoded >> iso/context.sh
# echo new line
echo "" >> iso/context.sh
# copy cloud-init script
cp src/user-data iso/user-data
# create iso with joliet and rationalized rock ridge directory information
genisoimage -J -r -o user-data.iso iso
# create vmdk image
qemu-img convert -O vmdk user-data.iso user-data.vmdk
#genisoimage -output user-data.iso -volid cidata -joliet -rock src/user-data src/meta-data
#clean temporary files
rm -rf iso
rm user-data.iso
mkdir -p iso
rm src/user-data.sh.encoded

# create VMDK with user data file
# option 2) bootstrap from cvmfs
cp src/user-data.sh src/user-data-provision.sh
sed -i "/Do provisioning here/ r src/provision.inc" src/user-data-provision.sh
base64 -w 0 src/user-data-provision.sh > src/user-data.sh.encoded
cp src/context.sh.prefix iso/context.sh
# echo without new line
echo -n EC2_USER_DATA= >> iso/context.sh
# attach encoded script
cat src/user-data.sh.encoded >> iso/context.sh
# echo new line
echo "" >> iso/context.sh
# copy cloud-init script
cp src/user-data iso/user-data
# create iso with joliet and rationalized rock ridge directory information
genisoimage -J -r -o user-data-provision.iso iso
# create vmdk image
qemu-img convert -O vmdk user-data-provision.iso user-data-provision.vmdk
rm src/user-data.sh.encoded

cp src/user-data.sh src/user-data-gui.sh
sed -i "/start gui here/ a screenRes=1024x768\nstartXDM=on\nauto_login=on" src/user-data-gui.sh
base64 -w 0 src/user-data-gui.sh > src/user-data.sh.encoded
cp src/context.sh.prefix iso/context.sh
# echo without new line
echo -n EC2_USER_DATA= >> iso/context.sh
# attach encoded script
cat src/user-data.sh.encoded >> iso/context.sh
# echo new line
echo "" >> iso/context.sh
# copy cloud-init script
cp src/user-data iso/user-data
# create iso with joliet and rationalized rock ridge directory information
genisoimage -J -r -o user-data-gui.iso iso
# create vmdk image
qemu-img convert -O vmdk user-data-gui.iso user-data-gui.vmdk
rm src/user-data.sh.encoded

cp src/user-data.sh src/user-data-provgui.sh
sed -i "/uncomment for gui/ a screenRes=1024x768\nstartXDM=on\nauto_login=on" src/user-data-provgui.sh
sed -i "/Do provisioning here/ r src/provision.inc" src/user-data-provgui.sh
base64 -w 0 src/user-data-provgui.sh > src/user-data.sh.encoded
cp src/context.sh.prefix iso/context.sh
# echo without new line
echo -n EC2_USER_DATA= >> iso/context.sh
# attach encoded script
cat src/user-data.sh.encoded >> iso/context.sh
# echo new line
echo "" >> iso/context.sh
# copy cloud-init script
cp src/user-data iso/user-data
# create iso with joliet and rationalized rock ridge directory information
genisoimage -J -r -o user-data-provgui.iso iso
# create vmdk image
qemu-img convert -O vmdk user-data-provgui.iso user-data-provgui.vmdk
rm src/user-data.sh.encoded


rm -rf iso
rm *.iso
#rm src/user-data-provision.sh
#rm src/user-data-gui.sh
#rm src/user-data-provgui.sh
