# Akenn.org

Backups of my personal blog/website.

## Install

Run this:

`gem install jekyll jekyll-s3`

Then create a file called `_jekyll_s3.yml` with the following contents:

```
s3_id: YOUR_AWS_S3_ACCESS_KEY_ID
s3_secret: YOUR_AWS_S3_SECRET_ACCESS_KEY
s3_bucket: your.blog.bucket.com
```

## Run

* `jekyll serve`

## Deploy

* `jekyll build && jekyll-s3`
