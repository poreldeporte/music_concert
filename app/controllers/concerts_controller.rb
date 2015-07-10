class ConcertsController < ApplicationController
	def index
		@concert = Concert.all
		render('index')
	end
	def new
		@concert = Concert.new
		render('new')
	end
	def create
		@concert = Concert.new(concert_params)
		if @concert.save 
			redirect_to(concerts_path)
		else
			render('new')
		end
	end
	def show
		@concert = Concert.find(params[:id])
		@comments = Comment.new
		@post = @concert.comments

		
		render('show')
	end
	def upcoming
		@concert = Concert.upcoming(10)
		@price = params[:ticket_price]
		@filter = Concert.filter_price(@price)

		render('upcoming')
	end
	def popular
		
		@concert = Concert.popular

		render('popular')
	end
	def edit
	end
	def update
	end
	def destroy
	end
	private
	def concert_params
		return params.require(:concert).permit(:artist, :date, :venue, :city, :ticket_price, :description)
	end
end
