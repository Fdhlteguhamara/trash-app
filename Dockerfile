FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

<<<<<<< HEAD
CMD ["node", "backend/app.js"]
=======
CMD ["node", "backend/app.js"]
>>>>>>> 7092c528aa815d1dba05901e79e0e1c805943f74
