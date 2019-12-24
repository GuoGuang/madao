FROM node:10.15.3
MAINTAINER GuoGuang
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /app
COPY . /app
RUN pwd
WORKDIR /app
EXPOSE 3000
RUN npm install
RUN npm run build
CMD ["npm", "start"]
