FROM node:14.21.3
MAINTAINER GuoGuang
# ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /madao-blog
COPY . /madao-blog
WORKDIR /madao-blog
RUN pwd
#RUN npm install babel-core babel-loader --save-dev
RUN npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
RUN npm install --save-dev  --unsafe-perm node-sass
RUN npm --registry=https://registry.npm.taobao.org install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
