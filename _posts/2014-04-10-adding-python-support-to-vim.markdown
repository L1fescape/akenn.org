---
layout: post
title: Adding Python Support for Vim
category: posts
---

<span class='summary'>tl;dr ./configure --enable-pythoninterp --with-features=huge</span>

---

I was recently looking into a friend of mine's [clojure project](https://github.com/MarcoPolo/core.emoji). To get up and running I installed [leiningen](https://github.com/technomancy/leiningen) and [vim-fireplace](https://github.com/tpope/vim-fireplace) on my arch dev virtual machine. I used `lein repl` to start a repl (a Clojure interpreter) and opened vim with vim-fireplace installed to take the clojure code I had open and send it off to the repl for evaluation. Unfortunately I ran into an error while opening vim that looked something like this:

`nREPL: unexpected end of bencode data^@`

After looking through the issues for vim-fireplace on GitHub, I came across [this comment](https://github.com/tpope/vim-fireplace/issues/139#issuecomment-38252037) by the plugin's author Tim Pope:

<blockquote>
@ywangd it just occurred to me that if you get the Vim Python interface working (such that `:echo has('python')` returns 1), you could sidestep this whole mess and get a better experience to boot. Make sure you have the right architecture of Python installed (32 bit Python unless `:echo has('win64')` is 1) and in you path.
</blockquote>

I ran `:echo has('python')` in vim which returned 0, meaning no python support.

Inorder to fix this I uninstalled vim, downloaded the latest version, configured it to have python support, and installed it.

{% highlight bash %}
$ sudo pacman -R vim
$ wget ftp://ftp.gr.vim.org/pub/vim/unix/vim-7.4.tar.bz2
$ tar xvf vim-7.4.tar.bz2
$ cd vim74
$ ./configure --enable-pythoninterp --with-features=huge
$ make
$ sudo make install
{% endhighlight %}

Wohoo, python support! Now back to messing around with emojis.
