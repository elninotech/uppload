#!/bin/sh

setup_git() {
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
}

add_build() {
    git checkout master
    git add .
    git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

push() {
    git remote add origin https://anandchowdhary:${GH_TOKEN}@github.com/elninotech/uppload.git
    git push origin master
}

setup_git
add_build
push