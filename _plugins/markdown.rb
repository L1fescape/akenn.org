module Jekyll
  class MarkdownBlock < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
    end
    require "redcarpet"
    def render(context)
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true)
      content = super
      "#{markdown.render(content)}"
    end
  end
end
Liquid::Template.register_tag('markdown', Jekyll::MarkdownBlock)
