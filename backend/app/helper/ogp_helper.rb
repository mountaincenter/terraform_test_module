module OgpHelper
  require 'open-uri'
  require 'nokogiri'

  def self.fetch_ogp(url)
    charset = nil
    html = URI.open(url) do |f|
      charset = f.charset
      f.read
    end

    doc = Nokogiri::HTML.parse(html, nil, charset)

    ogp_title = doc.css('meta[property="og:title"]').first&.attributes["content"]&.value
    ogp_url = doc.css('meta[property="og:url"]').first&.attributes["content"]&.value
    ogp_image = doc.css('meta[property="og:image"]').first&.attributes["content"]&.value
    ogp_description = doc.css('meta[property="og:description"]').first&.attributes["content"]&.value

    {
      title: ogp_title,
      url: ogp_url,
      image: ogp_image,
      description: ogp_description
    }
  end
end