#!/bin/bash
#
# Installation script for EGI FedCloud client
# installs and configures VOMS for fedcloud.egi.eu and training.egi.eu VOs
# installs occi-cli
#
# usage:
# on Linux systems execute with root privileges, e.g.:
#       sudo ./fedcloud-ui.sh
#
# on OS X, it will use sudo internally (brew does not like to be
#   executed as root):
#       ./fedcloud-ui.sh
#

# Some variables
VOMSES=/etc/vomses
VOMSDIR=/etc/grid-security/vomsdir
SUDO=""
FETCH_CRL=fetch-crl

# VOMS config
VOMS1_SERVER=voms1.grid.cesnet.cz
VOMS1_DN="/DC=org/DC=terena/DC=tcs/C=CZ/ST=Hlavni mesto Praha/L=Praha 6/O=CESNET/CN=voms1.grid.cesnet.cz"
VOMS1_CA="/C=NL/ST=Noord-Holland/L=Amsterdam/O=TERENA/CN=TERENA eScience SSL CA 3"
VOMS2_SERVER=voms2.grid.cesnet.cz
VOMS2_DN="/DC=org/DC=terena/DC=tcs/C=CZ/ST=Hlavni mesto Praha/L=Praha 6/O=CESNET/CN=voms2.grid.cesnet.cz"
VOMS2_CA="/C=NL/ST=Noord-Holland/L=Amsterdam/O=TERENA/CN=TERENA eScience SSL CA 3"

get_root() {
    if [ $(id -u) -ne 0 ] ; then
        echo "This needs to be executed as root, e.g. sudo $0"
        exit 1
    fi
}


install_darwin() {
    which brew 2>&1 > /dev/null
    if [ $? -ne 0 ] ; then
        echo "Please install homebrew first (http://brew.sh/)"
	exit 1
    fi

    echo "*"
    echo "* Installation"
    echo "*"
    echo ""

    echo "Installing fetch-crl and voms"
    # install fetch-crl and voms (v2, should work for most cases)
    brew install fetch-crl voms

    # OCCI client
    echo "Installing OCCI client"
    gem install occi-cli

    # CA Certificates
    echo "Downloading CA certificates"
    sudo mkdir -p /etc/grid-security/certificates
    CA_BUNDLE=https://dist.eugridpma.info/distribution/igtf/current/accredited/igtf-preinstalled-bundle-classic.tar.gz
    curl -s $CA_BUNDLE | sudo tar -xz -C /etc/grid-security/certificates

}

install_debian() {
    echo "*"
    echo "* Package installation"
    echo "*"
    echo ""

    DIST=$1
    PSEUDONAME=$2

    # ensure that we have curl
    apt-get -qq install -y curl

    # get repos configurations
    echo "Configure EUGridPMA repository"
    curl -s https://dist.eugridpma.info/distribution/igtf/current/GPG-KEY-EUGridPMA-RPM-3 | \
         apt-key add -

    echo "deb http://repository.egi.eu/sw/production/cas/1/current egi-igtf core" > \
         /etc/apt/sources.list.d/egi-trustanchors.list

    echo "Configure rOCCI repository"
    curl -s http://repository.egi.eu/community/keys/APPDBCOMM-DEB-PGP-KEY.asc | \
         apt-key add -

    curl -s http://repository.egi.eu/community/software/rocci.cli/4.3.x/releases/repofiles/$DIST-$PSEUDONAME-amd64.list | \
         sed "s/^deb http/deb [arch=amd64] http/" | tee /etc/apt/sources.list.d/rocci.list > /dev/null

    if [ $PSEUDONAME = "xenial" ]; then
        VOMS_PACKAGE="voms-clients"
    else
        VOMS_PACKAGE="voms-clients3"

        echo "Configuring EGI UMD repositories"

        curl -s http://repository.egi.eu/sw/production/umd/UMD-DEB-PGP-KEY | \
             apt-key add -

        curl -s http://repository.egi.eu/sw/production/umd/3/repofiles/debian-squeeze/UMD-3-base.list \
             -o /etc/apt/sources.list.d/UMD-3-base.list

        curl -s http://repository.egi.eu/sw/production/umd/3/repofiles/debian-squeeze/UMD-3-updates.list \
             -o /etc/apt/sources.list.d/UMD-3-updates.list
    fi

    apt-get -qq update
    echo "Installing ca-policy-egi-core, fetch-crl, occi-cli and voms"
    apt-get -y -qq install ca-policy-egi-core fetch-crl occi-cli $VOMS_PACKAGE

    if [ $PSEUDONAME != "xenial" ]; then
        # this is required to make voms-clients3 work
        [ -e /var/lib/voms-clients3/lib/commons-io.jar ] || \
            ln -s /usr/share/java/commons-io.jar /var/lib/voms-clients3/lib/
    fi
}

install_rh6() {
    echo "*"
    echo "* Package installation"
    echo "*"
    echo ""
    # ensure that we have curl
    yum -q -y install curl

    echo "Configuring UMD and OCCI-CLI repositories"
    # get repos for UMD (includes CAs) and rOCCI
    # yum -q localinstall -y http://repository.egi.eu/sw/production/umd/3/sl6/x86_64/updates/umd-release-3.0.1-1.el6.noarch.rpm
    yum -q localinstall -y  http://repository.egi.eu/sw/production/umd/3/sl6/x86_64/updates/umd-release-3.14.4-1.el6.noarch.rpm
    if [ "x$REV" == "x6" ]; then
    curl -s http://repository.egi.eu/community/software/rocci.cli/4.3.x/releases/repofiles/sl-6-x86_64.repo > \
        /etc/yum.repos.d/rocci.repo
    fi
    if [ "x$REV" == "x7" ]; then
    curl -s http://repository.egi.eu/community/software/rocci.cli/4.3.x/releases/repofiles/sl-7-x86_64.repo > \
         /etc/yum.repos.d/rocci.repo
    fi
    # install packages
    echo "Installing ca-policy-egi-core, fetch-crl, voms-clients3 and occi-cli"
    yum -q -y install ca-policy-egi-core fetch-crl occi-cli voms-clients3
}

setup_voms() {
    echo ""
    echo "*"
    echo "* fedcloud.egi.eu and training.egi.eu VOs configuration"
    echo "*"
    echo ""

    $SUDO mkdir -p $VOMSES
    for VO_PORT in "fedcloud.egi.eu:15002" "training.egi.eu:15014" ; do
	VO=`echo $VO_PORT | cut -f1 -d":"`
	PORT=`echo $VO_PORT | cut -f2 -d":"`
        $SUDO mkdir -p $VOMSDIR/$VO
        $SUDO tee $VOMSDIR/$VO/$VOMS1_SERVER.lsc > /dev/null << EOF
$VOMS1_DN
$VOMS1_CA
EOF
        $SUDO tee $VOMSDIR/$VO/$VOMS2_SERVER.lsc > /dev/null << EOF
$VOMS2_DN
$VOMS2_CA
EOF

	echo "\"$VO\" \"$VOMS1_SERVER\" \"$PORT\" \"$VOMS1_DN\" \"$VO\"" | \
             $SUDO tee $VOMSES/$VO.$VOMS1_SERVER > /dev/null
	echo "\"$VO\" \"$VOMS2_SERVER\" \"$PORT\" \"$VOMS2_DN\" \"$VO\"" | \
             $SUDO tee $VOMSES/$VO.$VOMS2_SERVER > /dev/null
    done

    # fetch crls
    $SUDO $FETCH_CRL
}


if [ -z "$OSTYPE" ] ; then
    echo "Unable to determine OS, will not install"
    exit 1
fi

OS=""
case "$OSTYPE" in
    darwin*)
        # OS X voms uses by default this location:
        VOMSES=/usr/local/etc/vomses
        SUDO=sudo
        FETCH_CRL=/usr/local/sbin/fetch-crl
        install_darwin
        ;;
    linux*)
        get_root
        if [ -f /etc/redhat-release ] ; then
            # RH based
            REV=`cat /etc/redhat-release | sed s/.*release\ // | sed s/\ .*// | cut -f1 -d"."`
            if [ "x$REV" == "x6" ] || [ "x$REV" == "x7" ]; then
                install_rh6
            else
                echo "Unsupported RedHat release $REV"
                exit 1
            fi
        elif [ -f /etc/debian_version ] ; then
            DIST=`cat /etc/lsb-release | grep '^DISTRIB_ID' | awk -F=  '{ print $2 }' | tr '[:upper:]' '[:lower:]'`
            PSEUDONAME=`cat /etc/lsb-release | grep '^DISTRIB_CODENAME' | awk -F=  '{ print $2 }'`
            REV=`cat /etc/lsb-release | grep '^DISTRIB_RELEASE' | awk -F=  '{ print $2 }'`
            if [ "x$DIST" == "xdebian" ] ; then
                if [ "x$PSEUDONAME" != "xwheezy" -a "x$PSEUDONAME" != "xsqueeze" ] ; then
                    echo "Unsupported debian release $PSEUDONAME"
                    exit 1
                fi
            elif [ "x$DIST" == "xubuntu" ] ; then
                echo "$PSEUDONAME" | grep -E "^(trusty|precise|xenial)$" > /dev/null
                if [ $? -ne 0 ] ; then
                    echo "Unsupported ubuntu release $PSEUDONAME"
                    exit 1
                fi
            fi
            install_debian $DIST $PSEUDONAME $REV
        else
            echo "Unsupported Linux distribution"
            exit 1
        fi
        ;;
    *)
        echo "Unsupported OS $OSTYPE"
        exit 1
        ;;
esac

setup_voms

cat << EOF
*******************************************************************************
occi is now ready to be used. Copy your certificate and key files to ~/.globus
to create a proxy with:

    voms-proxy-init --voms fedcloud.egi.eu --rfc

set the X509_USER_PROXY variable with

    export X509_USER_PROXY=\`voms-proxy-info -path\`

and start using the occi command:

    occi -e \$ENDPOINT -n x509 -X -x \$X509_USER_PROXY [...]

Check https://wiki.egi.eu/wiki/Federated_Cloud_user_support for more info
*******************************************************************************

EOF

exit 0
