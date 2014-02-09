---
layout: post
title: Upgrading Python
category: posts
---

<span class='summary'>TL;DR Don’t replace the default version of python on your machine.</span>

---

I recently took [vagrant](http://www.vagrantup.com/) out for a spin. Downloaded a machine, got it up and running, ended up with a Ubuntu 32bit lucid box. Sweet!

I like [powerline](https://github.com/Lokaltog/powerline). It's a Vim plugin that provides a status line at the bottom of vim with info about what branch you're on, the file that's open, what mode you're in, etc. It does all this in a very pretty and aesthetically-pleasing fashion (although now I think it's more than just a Vim plugin. <strong>Update 09-23-13:</strong> check out [Airline](https://github.com/bling/vim-airline)). It looks like this:

<img class="big" src="/blog/images/upgrading-python/1.png" />

But when I try to run it with python2.6.5 (the default lucid version of python) installed:

<img class="big" src="/blog/images/upgrading-python/2.png" />

Not so cool. Time to upgrade python!

<strong>Disclaimer:</strong> Do not follow this "tutorial". It's here to help explain why that first thought that jumped into your head when you decided you needed to upgrade python is wrong (and so you can laugh at me and all my failures [:(](http://xkcd.com/541/)).

Alright, let's give this a shot!

{% highlight python linenos=table %}
sudo apt-get install python2.7
{% endhighlight %}

The result:

<img class='normal' src="/blog/images/upgrading-python/3.png" />

Dangit. Fail.

So apparently Lucid doesn't have support for Python 2.7. After a few Google searches, I [stumbled across a ppa containing a lot of newer and older versions of python](https://launchpad.net/~fkrull/+archive/deadsnakes). 2.7 is in there. Prefect!

Let's add the ppa to our sources list so we can install it through <code>apt-get</code>.

{% highlight bash linenos=table %}
add ppa  https://launchpad.net/~fkrull/+archive/deadsnakes
vim /etc/apt/sources.list
deb http://ppa.launchpad.net/fkrull/deadsnakes/ubuntu lucid main 
deb-src http://ppa.launchpad.net/fkrull/deadsnakes/ubuntu lucid main
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys DB82666C
sudo apt-get install python2.7
{% endhighlight %}

Ok remember at the beginning of this post when I said not to do any of what I'm describing to you now? Well if for whatever reason you decided to ignore that, please PLEASE do not do this:

{% highlight bash linenos=table %}
sudo unlink /usr/bin/python
sudo ln -s /usr/bin/python2.7 /usr/bin/python
{% endhighlight %}

Because seemingly, it works.

<img class='normal' src="/blog/images/upgrading-python/4.png" />

But after reboot, shit starts breaking...

<img src="/blog/images/upgrading-python/5.png" />

Let's remedy the situation by making 2.6 the default again.

{% highlight bash linenos=table %}
$ sudo unlink /usr/bin/python
$ sudo ln -s /usr/bin/python2.6 usr/bin/python
$ python -V
Python 2.6.6
{% endhighlight %}

After another reboot...sweet, no errors!


Up until this point, we've installed python 2.7 and made it our default python version. This broke some things. The only way to fix what we broke was to set the default version of python back to 2.6. We didn't uninstall 2.7, just re-linked 2.6. So we're back to where we started, just with 2.7 also installed.

Let's take a moment and rethink the approach. We need a newer version of Python for Powerline to work. Maybe we can tell Powerline to look for version 2.7 which we just installed. So where does Powerline look for which python to use?

After reading through the [docs](https://powerline.readthedocs.org/en/latest/overview.html#requirements):

> Vim plugin requirements <br />
> The vim plugin requires a vim version with Python support compiled in. You can check if your vim supports Python by running vim --version | grep+python.

...oh. So it looks like whatever version vim has been compiled with is the version Powerline will use.

Time to re-compile vim!

First, download [vim](http://www.vim.org/sources.php). Then install python dev tools (as per this [post](http://vim.1045645.n5.nabble.com/Trouble-compiling-vim-python-td1181629.html). It turns out you don’t need <code>--with-python-config-dir</code>, just need python dev tools installed).

Ok, fingers crossed!

{% highlight bash linenos=table %}
wget ftp://ftp.vim.org/pub/vim/unix/vim-7.4.tar.bz2
tar xjvf vim-7.4.tar.bz2
cd vim74
./configure --enable-pythoninterp --with-features=huge
make
make install
{% endhighlight %}

YES

Vim has python, and powerline works beautifully.

http://www.youtube.com/watch?v=30dXrUm3o6g

So to recap, I installed python 2.7 and set it as my default python (very hackily), which broke other packages that I had installed (the reason you don’t replace default python). The way we fixed it was by resetting the symlink for /bin/python back to python2.6. From there, we deduced that the only thing that actually needed fixing was vim. So vim was recompiled with python 2.7 support, and powerline worked!

One of the best things I learned about from my experience of breaking python super hard was virtualenv. virtualenv allows you to create isolated Python environments, which is really handy when you're working on two projects that require different versions of python packages or different versions of python itself.

If you get a chance, [check it out!](http://simononsoftware.com/virtualenv-tutorial/)
