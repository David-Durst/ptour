#Restructured View into Multiple Components#

/client
	/compatability
	/lib
	/stylesheets
	/views
		/lib
		/partials	# smaller template components go here
			home_footer.html
			home_header.html
			tour_body.html
			tour_body.js
			tour_header.html
			tour_overlaysLeft.html
			tour_tableContents.html
			tour_tableContents.js
		about.html
		contact.html
		home.html
		team.html
		tour.html
		tour.js
	layout.html	# renamed old 'general.html' to 'layout.html' and moved up one-level
	router.js   