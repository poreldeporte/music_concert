class Concert < ActiveRecord::Base
	has_many :comments

	validates :artist, presence: true
	validates :date, presence: true
	validates :venue, presence: true
	validates :city, presence: true
	validates :ticket_price, numericality: true

	def self.upcoming(lim)
		return self.order(:date => :asc).limit(lim)
	end
	def self.popular

		return self.all.sort {|small, big| big.comments.length <=> small.comments.length}
	end
	def self.filter_price(price)
		return self.where("ticket_price <= ?", price)
	end
end
