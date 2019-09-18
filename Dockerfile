FROM nginx:stable
MAINTAINER Your Name "agatha@alterra.id"

RUN mkdir -p /alterra/www/frontend
RUN mkdir -p /alterra/logs/nginx

COPY default.conf /etc/nginx/conf.d/
COPY . /alterra/www/frontend/

WORKDIR /alterra/www/frontend

