set -ev

cd $TRAVIS_BUILD_DIR


if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  exit 0
fi

if [ "$TRAVIS_BRANCH" == "master" ]; then
  ember deploy production
fi
