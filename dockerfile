# build environment
FROM node:lts-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_PATH /app/node_modules/:$NODE_PATH
COPY tsconfig.json ./
COPY package.json ./
COPY package-lock.json ./
COPY remix.env.d.ts ./
COPY remix.config.js ./
COPY .eslintrc.js ./
RUN npm install --silent --save
RUN npm install react-scripts@5.0.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_PATH /app/node_modules/:$NODE_PATH
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules/ ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/remix.env.d.ts ./
COPY --from=build /app/remix.config.js ./
COPY --from=build /app/.eslintrc.js ./
EXPOSE 3000
# ENTRYPOINT npm run start
CMD ["npm", "run", "start"]