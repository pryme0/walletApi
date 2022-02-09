FROM node:12.22-alpine
ENV NODE_ENV=development
ENV MONGO_DB_PROD_URL =
ENV JWT_SECRET_KEY=
ENV OPENEXCHANGERATE_API_KEY=
WORKDIR /app
COPY package.json /app
RUN npm install 
COPY . /app
EXPOSE 9000
CMD ["npm", "start"]
