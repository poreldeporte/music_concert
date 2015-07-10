class CommentsController < ApplicationController
	def create
		@concert = Concert.find(params[:concert_id])
		@comments = @concert.comments.new(comment_params)

		if @comments.save
			redirect_to(concert_path(params[:concert_id]))
		else
			render(concert_path(params[:concert_id]))
		end
	end
	private
	def comment_params
		return params.require(:comment).permit(:content)
	end
end
