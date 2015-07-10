module ConcertsHelper
	def color_class(index)
		colors = ["concert-list-purple", "concert-list-white"]
		return colors[index]
	end
	def artist_class(index)
		colors = ["artist-white", "artist-purple"]
		return colors[index]
	end
	def button_class(index)
		colors = ["button-white", "button-purple"]
		return colors[index]
	end
end

