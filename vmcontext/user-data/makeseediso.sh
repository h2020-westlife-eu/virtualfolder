#!/bin/bash
# clean iso directory
rm -rf iso
mkdir -p iso
# encode script
fromdos src/*.sh
fromdos iso/*.sh
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

#create dl proxy version
base64 -w 0 src/user-data-dl.sh > src/user-data.sh.encoded
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
genisoimage -J -r -o user-data-dl.iso iso
# create vmdk image
qemu-img convert -O vmdk user-data-dl.iso user-data-dl.vmdk
rm -rf iso
rm user-data-dl.iso
mkdir -p iso

#create cloud version
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
