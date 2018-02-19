# Developer's guide

In order to have complete development environment follow either \[Development installation\]. Or just get source codes from [https://github.com/h2020-westlife-eu/west-life-wp6](https://github.com/h2020-westlife-eu/west-life-wp6)

## Git secrets

Within the public git repository, there are secrets to be used for demonstration purposes, these are encrypted using git-secret module.

Git-secret is installed within \[wp6-vm/rep-standalone-src-sl7\]. To manually install git-secret in different environment, launch

```shell
# git-secret require git version 2.0
yum -y install http://opensource.wandisco.com/centos/6/git/x86_64/wandisco-git-release-6-1.noarch.rpm
yum -y install git 
# install git-secret
wget https://bintray.com/sobolevn/rpm/rpm -O bintray-sobolevn-rpm.repo
mv bintray-sobolevn-rpm.repo /etc/yum.repos.d/
yum -y install git-secret
```

Further details see [http://git-secret.io/](http://git-secret.io/)

New user:

```
#user needs a new gpg key pair, create
gpg2 --gen-key

#within his copy of git, replaces [mygpg@email.com] with your key alias
git secret tell [mygpg@email.com]

# git commit & git push
```

Trusted user:

```
# git pull
# reveal all secret file
git secret reveal
# encrypt with all keys including the new one
git secret hide
# git commit & git push
```

New user:

```
# git pull
# now reveal all secrets
git secret reveal
```

Cheat sheet:

```shell
# make sure you have gpg key pairs - to generate new
gpg2 --gen-key

# initialize - usually done once in git repository
git secret init

# add user among trusted users
git secret tell -m
# or
git secret tell mygpg@email.comg

# add file to the secrets
echo 'myfile.txt' >>.gitignore
git secret add myfile

# encrypt all secreted file
git secret hide

# decrypt all secreted file using trusted user's key
git secret reveal
```

## Remove unwanted commits from git tree

Use it when accidental commit was done and to remove all sensitive files.

[https://help.github.com/articles/removing-sensitive-data-from-a-repository/](https://help.github.com/articles/removing-sensitive-data-from-a-repository/)

