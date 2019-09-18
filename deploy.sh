sudo docker stop frontend
sudo docker rm frontend
sudo docker rmi agatharach/frontend-project
sudo docker run -d --name frontend -p 4000:80 agatharach/frontend-project:latest



