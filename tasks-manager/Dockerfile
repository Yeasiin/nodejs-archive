FROM node:lts-alpine

WORKDIR /app

# copying the only package.json file so docker run npm install only if the there are any change on package file. 
# if i copy the whole project - docker will install package on every file change
COPY package*.json ./

# install only package which are necessary and avoid installing the dev dependancy
RUN npm install --only=production


# .dockerignore skiping the node_modules folder to begin copy
COPY . . 
RUN npm run build --prefix client


# switching from root user to bare minimal user (node has minimal access user)
USER node

CMD ["npm","start","--prefix","server"]

EXPOSE 8000