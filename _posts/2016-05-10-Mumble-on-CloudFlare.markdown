---
layout: post
title: Running Mumble through CloudFlare
category: posts
---

If you've ever tried to run a Mumble server on a domain proxied through CloudFlare, you'll notice a timeout when trying to connect to the server. This is because Mumble servers typically run on port `64738` and CloudFlare only allows TCP/UDP connections over [a very specific handful of ports](https://support.cloudflare.com/hc/en-us/articles/200169156-Which-ports-will-CloudFlare-work-with-). When your server times out it's because CloudFlare is rejecting the connection at its edge and the request is never hitting your Mumble server.

There are two ways to work around this:

- Create a DNS record for a subdomain that points to the server where Mumble is running and don't proxy that record through CloudFlare (also known as "grey-clouding" a DNS record)
- Run your Mumble server on a port that CloudFlare allows

### Creating a Grey-Clouded DNS Record

On cloudflare.com, navigate to the DNS Editor and add an A record with a `Name` of the subdomain you'd like to call your Mumble server (in the screenshot below I chose `mumble`) and a `IPv4 address` of your server's IP (note: this can also be an IPv6 address)

<img class="big" src="/blog/images/mumble-cloudflare/1.png" />

When you click "Add Record", this will create a DNS record that is NOT proxied through CloudFlare (aka "grey-clouded").

<img class="big" src="/blog/images/mumble-cloudflare/2.png" />

You can tell a record is not proxied through CloudFlare by the grey cloud in the "Status" column in your DNS records table and by the orange warning icon next to the name of your DNS record. This warning informs you that the IP of your server is exposed. If you'd like to avoid this, keep reading.

### Running Mumble on a Port Proxiable by CloudFlare

This is my preferred method for configuring Mumble with a domain proxied through CloudFlare. Since requests are proxied through CloudFlare, the IP of your Mumble server is never exposed and thus not susceptible to DDoS attacks.

SSH into your mumble server and run the following command to open up a text editor for modifying the mumble server config:

{% highlight bash %}
$ sudo nano /etc/mumble-server.ini
{% endhighlight %}

Change the value of `port` (default is `64738`) to a value from https://support.cloudflare.com/hc/en-us/articles/200169156-Which-ports-will-CloudFlare-work-with-.

Then restart the server:

{% highlight bash %}
$ sudo service mumble-server restart
{% endhighlight %}

Now update the settings in your client to reflect the changes you just made on the server, and connect!
