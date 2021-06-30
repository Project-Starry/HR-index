set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://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@github.com/Project-Starry-Game/hr-resource.git master:gh-pages

cd -