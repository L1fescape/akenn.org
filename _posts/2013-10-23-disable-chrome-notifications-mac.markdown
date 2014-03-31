---
layout: post
title: Disable Chrome Notifications
category: posts
image: chrome-notifications/header.png 
---

Recently *Notification Center* was added to Google Chrome. It gives websites and extensions such as Gmail and Google Calendar the ability to show native-like popup notifications. On MacOS, it automatically adds a menu bar icon that looks something like this:

<img class="big" src="/blog/images/chrome-notifications/1.png" />

I'm a bit of a minimalist when it comes to my programming environment, so *Notification Center* had to go. Here are the two methods I've found to remove it.

Method 1 via [Google Support page](https://support.google.com/chrome/answer/3220216?hl=en):

1. Go to *Settings*
2. Click *Show Advanced Options* (at the bottom of the page)
3. In the Privacy section, click *Content settings*
4. In the Notification section, click *Do not allow any site to show desktop notifications* 
5. Restart Chrome

Method 2 via [Jeff Geerling's post](http://www.midwesternmac.com/blogs/jeff-geerling/cant-disable-annoying-chrome):

1. Navigate to `chrome://flags`
2. Scroll down to *Enable Rich Notifications* (just do a search on the page for "rich")
3. Set to *Disabled*
4. Restart Chrome
