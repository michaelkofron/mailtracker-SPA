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
        tracking_info["activities"][0]
    end 

end