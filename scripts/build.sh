cd frontend
yarn build
cd ..
cat public/dist/index.html app/views/app/index.html.erb.template >> app/views/app/index.html.erb
