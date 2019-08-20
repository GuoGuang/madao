FROM node
MAINTAINER GuoGuang
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /app
COPY . /app
WORKDIR /app
EXPOSE 3000
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
CMD ["npm", "start"]