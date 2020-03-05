FROM node:10.15.3
MAINTAINER GuoGuang
# ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /codeif-blog
COPY . /codeif-blog
WORKDIR /codeif-blog
RUN pwd
RUN npm install
RUN npm install --save-dev  --unsafe-perm node-sass
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
