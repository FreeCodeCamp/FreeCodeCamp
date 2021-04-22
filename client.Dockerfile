FROM node:14.16.1-buster AS builder

# this is a bit clunky, perhaps there's a more concise way of passing in build
# arguments
ARG FREECODECAMP_NODE_ENV
ARG HOME_LOCATION
ARG API_LOCATION
ARG FORUM_LOCATION
ARG NEWS_LOCATION
ARG CLIENT_LOCALE
ARG CURRICULUM_LOCALE
ARG STRIPE_PUBLIC_KEY
ARG ALGOLIA_APP_ID
ARG ALGOLIA_API_KEY
ARG PAYPAL_CLIENT_ID
ARG DEPLOYMENT_ENV
ARG SHOW_UPCOMING_CHANGES

# node images create a non-root user that we can use
USER node
WORKDIR /home/node/build
COPY --chown=node:node . .
RUN npm ci
# we don't need to separately run ensure-env, since it gets called as part of
# build:client
RUN npm run build:client

WORKDIR /home/node/config
RUN git clone https://github.com/freeCodeCamp/client-config.git client

FROM node:14.16.1-alpine
RUN npm i -g serve
USER node
WORKDIR /home/node
COPY --from=builder /home/node/build/client/public/ client/public
COPY --from=builder /home/node/config/client/serve.json client
COPY --from=builder /home/node/config/client/www/ client

ENTRYPOINT ["serve", "-c", "../serve.json", "client/public"]
CMD ["-l", "8000"]
