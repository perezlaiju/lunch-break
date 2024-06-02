FROM node:22-alpine as BUILD_IMAGE
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# Creating a production image from just the build files. multi stage building. reduces size and wont expose code.
# FROM node:22-alpine as PRODUCTION_IMAGE
# WORKDIR /app

# COPY --from=BUILD_IMAGE /app/dist/ /app/dist/
# EXPOSE 8080

# COPY package.json .
# COPY vite.config.ts .

# RUN npm install typescript
CMD [ "npm", "run", "preview" ]
