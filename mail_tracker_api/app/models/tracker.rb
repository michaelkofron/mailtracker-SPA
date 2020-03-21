class Tracker

    def initialize(number)
        @number = number
    end

    def carrier
        page = Nokogiri::HTML(open("http://shipit-api.herokuapp.com/api/guess/#{@number}"))

        JSON.parse(page.text)[0]
    end

    def tracking_info
        page = Nokogiri::HTML(open("http://shipit-api.herokuapp.com/api/carriers/#{carrier}/#{@number}"))

        JSON.parse(page.text)
    end

    def last_location
        tracking_info["activities"].find{|i| i["location"] != ""}
    end 

    def coordinates
        current_location = last_location["location"].gsub!(" ", "+")

        current_geocode_link = "https://maps.googleapis.com/maps/api/geocode/json?address=#{current_location}&key=#{Key.key}"

        current_page = Nokogiri::HTML(open(current_geocode_link))

        current_location = JSON.parse(current_page.text)



        object = {current_coords: current_location["results"][0]["geometry"]["location"]}
    end

end