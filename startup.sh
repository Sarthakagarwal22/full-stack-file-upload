cd client
sudo npm install
cd ..
cd server
sudo npm install
sudo service mongod start
gnome-terminal -e "node server.js"
cd ..
cd client
sudo npm start 

