FROM registry.okd.local/node:16.14

RUN apt update && apt install fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils -y

WORKDIR /app

RUN curl -fsSL https://gitlab.setic.ro.gov.br/publico/ca-trust/-/raw/master/openshift_ca.crt -o /usr/local/share/ca-certificates/openshift_ca.crt
RUN curl -fsSL https://gitlab.setic.ro.gov.br/publico/ca-trust/-/raw/master/portainer_ca.crt -o /usr/local/share/ca-certificates/portainer_ca.crt
RUN update-ca-certificates

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
