FROM node:10.15.3
MAINTAINER GuoGuang
# ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /asdfasdf
COPY . /asdfasdf
WORKDIR /asdfasdf
RUN pwd
RUN npm install
RUN npm install sass-loader
RUN npm install node-sass
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
