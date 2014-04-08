# Akenn.org

Backups of my personal blog/website.

## Install

- Install [Bundler](http://bundler.io/):

```
gem install bundle
```

- Install required gems via bundler

```
bundle install
```

- Create a file called `s3_website.yml` with the following contents:

```
s3_id: <%= ENV['S3_ID'] %>
s3_secret: <%= ENV['S3_SECRET'] %>
s3_bucket: blog.example.com
```

## Run

```
rake
```

## Deploy

```
rake deploy
```
