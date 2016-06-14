If you forgot to add files or directories to .gitignore just remove the cached files and readd to gitignore.

git rm -r --cached node_modules
git commit -m 'Remove the now ignored directory node_modules'
git push origin master
