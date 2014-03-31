task :default => :serve

task :serve do
  commands = 'jekyll serve --watch;'
  exec commands
end

task :deploy do
  commands = 'jekyll build && s3_website push;'
  exec commands
end
