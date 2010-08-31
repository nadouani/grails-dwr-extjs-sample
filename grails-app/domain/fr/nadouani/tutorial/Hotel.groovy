package fr.nadouani.tutorial

class Hotel {
	String name
	String website
	String phoneNumber
	
	String city
	String country
	
	Integer stars
	Integer rooms
	Integer beds	
	
    static constraints = {
		name()
		website(url:true)
		phoneNumber()
		city()
		country()
		stars(min:1)
		rooms(min:1)
		beds(min:1)
    }
	
	String toString(){
		name + " " + stars.times{"*"} 
	}
}
