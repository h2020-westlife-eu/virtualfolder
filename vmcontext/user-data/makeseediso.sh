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

# create VMDK with user data file
# option 2) bootstrap from cvmfs
rm src/user-data-cloud.sh
cp src/user-data.sh src/user-data-cloud.sh
sed -i "/Do provisioning here/ r src/provision.inc" src/user-data-cloud.sh
base64 -w 0 src/user-data-cloud.sh > src/user-data.sh.encoded
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
genisoimage -J -r -o user-data-cloud.iso iso
# create vmdk image
qemu-img convert -O vmdk user-data-cloud.iso user-data-cloud.vmdk
rm -rf iso
rm user-data-cloud.iso
