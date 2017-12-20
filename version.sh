#!/bin/bash
VER_HEAD="v 0.1.0 b$(date --date='0 days ago' +%Y%m%d%H)"
rm -f version/version.h
git rev-list HEAD | sort > config.git-hash
LOCALVER=`wc -l config.git-hash | awk '{print $1}'`
if [ $LOCALVER \> 1 ] ; then
    VER=`git rev-list origin/master | sort | join config.git-hash - | wc -l | awk '{print $1}'`
     echo "VER:${VER}"
    if [ $VER != $LOCALVER ] ; then
        VER="$VER+$(($LOCALVER-$VER))"
    fi
    if git status | grep -q "modified:" ; then
        VER="${VER}M"
    fi
    # VER="$VER $(git rev-list HEAD -n 1 | cut -c 1-7)"
    GIT_VERSION=${VER_HEAD}$VER # 版本前缀
    echo "VER:${VER}"
else
    GIT_VERSION=
    VER="x"
fi
rm -f config.git-hash

templ="#ifndef VERSION_H
#define VERSION_H
#define VERSION_NUMBER FULL_VERSION

#endif // VERSION_H"
echo "${templ/FULL_VERSION/${GIT_VERSION}}" > version/version.h
# cat version/version.h.template | sed "s/\$FULL_VERSION/$GIT_VERSION/g" > version/version.h
 
echo "Generated version.h"
