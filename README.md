### 4/10

- User
  - react
    - それぞれの Id に即した post 表示
  - rails react
    - sign_in 時に serializer の情報を取得
  - react rails
    - user 間　 chat(message)の作成
  - react rails
    - post に対して　 comment の作成
  - post をリッチテキスト化して hash タグを抽出,mention を抽出,リンクを抽出
    - react draftjs
- 簡単ログイン
  - model → controller → console → react → rspec,rubocop
- 職務経歴書準備
- rails fog bugfix
- rails rspec bugfix

- rails seraializer で follow,follower の情報を取得 → react console.log で確認

#### 課題

- [x] Docker - Docker docker-compose ファイルの作成
- [x] rails - rails7 での環境構築
- [x] rails - nginx との連携
- [x] rails - devise-token-auth の導入
- [x] rails - rubocop,rspec,rack-cors の導入
- [x] react - npx create-react-app での環境構築
- [x] react - axios の導入
- [x] react - SignUp,SignIn ページの作成
- [x] react rails - axios 及び cors の確認
- [x] terraform - AWS terraform の作成
- [x] terraform - terraform module 化
- [x] AWS 　- 本番環境での spa 確認
- [x] react rails - carrierwave との連携
- [x] react - currentUser のエラー解消（最悪後回し）
- [x] react - carousel の実装 画像の登録表示
- [x] rails - seeds faker での開発環境
- [x] rails - 簡単ログインの導入
- [x] react - React からの Post
- [x] react - eslint
- [ ] react rails - 簡単ログインの Cookies 情報付加
- [ ] react - SignOut の正常化
- [ ] react - CRUD の hotreload 設定
- [x] AWS - 本番環境での SignUp,SignIn,Post(画像以外)
- [ ] AWS - 本番環境での 簡単ログイン
- [ ] AWS - 本番環境での carrierwave(fog の設定)
- [x] rails - Like Model(いいね)の実装
- [x] react - Like（いいね）の実装
- [x] rails - Follow Modle(フォロー)の実装
- [ ] rails - Comment の実装
- [ ] rails - Message の実装
- [ ] githubactions - CI/CD
- [x] AWS - tfstate を S3 から TerraformCloud に移行
- [x] rails - ER 図の作成(gem)

## React, Ruby on Rails で terraform を用い GitHubaction 経由で Deploy する話

### 開発環境は以下のとおりです

- OS
  - macOS BigSur version 11.7.3
- Docker 及び Docker Compose
  - Docker version 20.10.23, build 7155243
  - Docker Compose version v2.15.1
- backend(Ruby on Rails)
  - ruby 3.2.1 (2023-02-08 revision 31819e82c8) [x86_64-linux]
  - Rails 7.0.4.3
- database
  - mysql Ver 8.0.32 for Linux on x86_64 (MySQL Community Server - GPL)
- frontend(React)
  - node v18.15.0
  - yarn 1.22.19
  - react 18.2.0
  - typescript
- terraform
  - tfenv 2.2.0
  - terraform 1.4.0-rc1
  - (terraformcloud)

AWS でアプリを運用します。
Frontend 開発では react typescript を用います
Backend 開発では ruby on rails を用います
Nginx と Ruby on Rails 　は puma で接続しています。
IaC を terraform を導入しています
CI/CD ツールとして GitHubActions を用いています。
最終的な AWS の構成図、ディレクトリ構造及び rails は以下の通りです

```
.
├── .github
│   └── workflows
│       ├── aws_rails.yml
│       └── aws_react.yml
├── backend
│   ├── app等(rails new で自動的に作成されるものは省略)
│   ├── nginx
│   │   ├── Dockerfile
│   │   └── nignx.conf
│   ├── ecs
│   │   ├── Dockerfile
│   │   └── task-definitions.json
│   ├── .env
│   ├── Dockerfile
│   ├── Gemfile
│   └── Gemfile.lock
├── frontend
│   ├── react-app
│   │   └── (後述)
│   └── Dockerfile
├── terraform
│   └── (後述)
└── docker-compose.yml
```

それではまずは rails と　 react の環境構築を docker-compose を用いて作成します。

```sh:terminal
# 各種ディレクトリィ及びファイルの作成
touch docker-compose.yml
mkdir -p frontend backend backend/nginx
touch frontend/Dockerfile
touch backend/{Gemfile,Gemfile.lock,Dockerfile}
touch backend/nginx/{Dockerfile,nginx.conf}
```

ディレクトリィ構造は以下のようになります。

```:ディレクトリ構造
.
├── fronend
│   └── Dockerfile
├── backend
│   ├── nginx
│   │   ├── nginx.conf
│   │   └── Dockerfile
│   ├── Gemfile
│   ├── Gemfile.lock
│   └── Dockerfile
└── docker-compose.yml
```

それぞれのファイルを作成していきます。
docker-compose.yml ファイルです。
(mysql)

<details> <summary>docker-compose.yml</summary>

```yml:./docker-compose.yml
# ./docker-compose.yml

version: '3'
services:
  db:
    image: mysql:8.0.32
    environment:
      MYSQL_ROOT_PASSWORD: password
    ports:
      - '3306:3306'
    command: --default-authentication-plugin=mysql_native_password
    volumes:
      - db-data:/var/lib/mysql
  api:
    build:
      context: ./backend/
      dockerfile: Dockerfile
    command: bundle exec puma -C config/puma.rb
    volumes:
      - ./backend:/sample
      - public-data:/sample/public
      - tmp-data:/sample/tmp
      - log-data:/sample/log
    environment:
      RAILS_ENV: development
    depends_on:
      - db
  nginx:
    build:
      context: ./backend/nginx
      dockerfile: Dockerfile
    volumes:
      - public-data:/sample/public
      - tmp-data:/sample/tmp
    ports:
      - 80:80
    depends_on:
      - api
  web:
    build:
      context: ./frontend/
      dockerfile: Dockerfile
    volumes:
      - ./frontend:/usr/src/app
    command: sh -c "yarn start"
    ports:
      - '3000:3000'
    depends_on:
      - api
volumes:
  public-data:
  tmp-data:
  log-data:
  db-data:
```

</details>

rails の　 Dockerfile です

```Dockerfile:./backend/Dockerfile
# ./backend/Dockerfile
FROM ruby:3.2.1
ENV LANG C.UTF-8

ENV APP_PATH /sample

RUN mkdir $APP_PATH
WORKDIR $APP_PATH

ADD Gemfile $APP_PATH/Gemfile
ADD Gemfile.lock $APP_PATH/Gemfile.lock

RUN gem install bundler
RUN bundle install

ADD . $APP_PATH

RUN mkdir -p tmp/sockets
```

Gemfile です

```ruby:./backend/Gemfile
# ./backend/Gemfile
source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.1"
gem "rails", "~> 7.0.4", ">= 7.0.4.3"
```

Gemfile.lock は空のままにします

```ruby:./backend/Gemfile.lock
# ./backend/Gemfile.lock

```

nginx の　 Dockerfile と nginx.conf です

```Dockerfile:./backend/nginx/Dockerfile
# ./backend/nginx/Dockerfile
FROM nginx:1.23.3

RUN rm -f /etc/nginx/conf.d/*
RUN mkdir -p /sample/tmp/sockets

ADD nginx.conf /etc/nginx/conf.d/sample.conf
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
```

```nginx:./backend/nginx/nginx.conf
# ./backend/nginx/nginx.conf

upstream sample {
  server unix:///sample/tmp/sockets/puma.sock;
}

server {
  listen 80;
  server_name localhost;

  access_log /var/log/nginx/access.log;
  error_log  /var/log/nginx/error.log;

  root /sample/public;

  client_max_body_size 100m;
  error_page 404             /404.html;
  error_page 505 502 503 504 /500.html;
  try_files  $uri/index.html $uri @sample;
  keepalive_timeout 5;

  location @sample {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_pass http://sample;
  }

}

```

frontend(react)側の Dockerfile です

```Dockerfile:./frontend/Dockerfile
# ./frontend/Dockerfile
FROM node:18.15.0

RUN npm install -g npm && \
    mkdir react-app

WORKDIR /usr/src/app/react-app
```

準備ができましたら terminal で以下のコマンドを実行してください

```sh:terminal
docker-compose run --rm api rails new . -f --no-deps --database=mysql --skip-test --api
```

react

```sh:terminal
docker-compose run --rm web npx create-react-app . --template-typescript
```
