set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/Project-Starry/HR-official.git master:gh-pages

cd -