---
layout: post
title: Jekyll Liquid Exception Error
category: posts
image: jekyll/header.png
---

<span class='summary'><strong>tl;dr</strong> If you're running Jekyll on Arch linux and run into a Liquid Exception error, make sure python2 is installed.</span>

---

I created a new virtual machine via [vagrant](http://vagrantpress.org/) to run [Arch](https://www.archlinux.org/) as a dev vm. If I fuck anything up, I can just revert to an old snapshot rather than trouble shooting for hours to get my machine back to the way it was. 

I wanted to add a new post about having just recently moved to San Francisco to work at [Cloudflare](https://www.cloudflare.com/) (side note: it's awesome! I love the city, love all the things there are to do, and love my new job. I have a post in the works about the move from Florida out here which I'll throw up in the next week). 

So after cloning my site repo, installing ruby, and installing jekyll, I tried to build the site.

{% highlight bash %}
❯ jekyll build
Configuration file: /home/vagrant/code/akenn.org/_config.yml
            Source: /home/vagrant/code/akenn.org
       Destination: /home/vagrant/code/akenn.org/_site
      Generating... which: no python2 in (/home/vagrant/.gem/ruby/2.0.0/bin:/home/vagrant/.rubies/ruby-2.0.0-p451/lib/ruby/gems/2.0.0/bin:/home/vagrant/.rubies/ruby-2.0.0-p451/bin:/usr/local/bin:/usr/local/sbin:/usr/local/heroku/bin:/home/vagrant/.dotfiles/bin:/home/vagrant/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/usr/bin/core_perl:/home/vagrant/code/tools/mongodb/bin:/home/vagrant/code/tools/adt/sdk/platform-tools:/usr/local/share/npm/bin/:/usr/local/mysql/bin:/home/vagrant/.cabal/bin)
  Liquid Exception: Failed to get header. in _posts/2013-03-04-upgrading-python.markdown
error: Failed to get header.. Use --trace to view backtrace
{% endhighlight %}

If we look closely we see:

 `which: no python2 in (/home/vagrant/.gem ...` 

I use Arch Linux, which if I remeber correctly installs python3 and not python2 by default. Let's check.

{% highlight bash %}
❯ python --version
Python 3.3.5
{% endhighlight %}

Yep. If we also look at the path jekyll is spitting out in that error message `/usr/bin` is in there, which is where python3 resides. My guess is if we install python2 it'll be put in `/usr/bin` as well. Then if we run jekyll again, it'll check that directory, find python2, and be happy.

Let's install python 2 with:

{% highlight bash %}
❯ sudo pacman -S python2
{% endhighlight %}

Now if we run it...

{% highlight bash %}
❯ jekyll build
Configuration file: /home/vagrant/code/akenn.org/_config.yml
            Source: /home/vagrant/code/akenn.org
       Destination: /home/vagrant/code/akenn.org/_site
      Generating... done.
{% endhighlight %}

Great success!
