package fr.nadouani.tutorial

class HotelService {

    boolean transactional = true

    List<Hotel> getAll(){
		return Hotel.list()
	}
	
	Hotel getHotel(int id){
		return Hotel.get(id)
	}
	
	Hotel save(Hotel hotel){
		hotel.save(flush:true)
		
		return hotel
	}
	
	Hotel delete(Hotel hotel){
		hotel.delete(flush:true)
	}
}
