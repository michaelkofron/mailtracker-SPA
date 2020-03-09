class LinksController < ApplicationController

    def new
        words = CleanWords::Random.new
        new_string = words.fetch(nil, 3).join()
        render plain: new_string
        #possibly create a record of these strings to prevent reuse
    end
end