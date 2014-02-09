---
layout: post
title: Disable Dashboard in OSX 10.9 Mavericks
category: posts
---

In 10.9, Apple added this checkbox to "Mission Control" in "System Preferences":

<img class="big" src="/blog/images/mavericks-dashboard/1.png" />

I've wanted that feature for a hella long time.

In the past, you threw this into terminal to remove the Dashboard:

{% highlight bash linenos=table %}
defaults write com.apple.dashboard mcx-disabled -boolean YES
killall Dock
{% endhighlight %}

However this code doesn't work in 10.9. Not knowing about the checkbox in "Mission Control" in 10.9, I ran the above code and noticed it did nothing. So I googled around and finally disscovered the checkbox ... which also didn't do anything. Apple why would you make something that doesn't work? More googling led to nothing. Then I had an idea. Maybe setting the <code>mcx-disabled</code> property of the dashboard to true disabled the checkbox's control over the dashboard. So I ran the following:

{% highlight bash linenos=table %}
defaults write com.apple.dashboard mcx-disabled -boolean NO
killall Dock
{% endhighlight %}

Bam, the checkbox works! Goodbye dashboard.
