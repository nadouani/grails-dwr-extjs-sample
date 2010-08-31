package fr.nadouani.tutorial

class HotelService {

    boolean transactional = true

    List<Hotel> getAll(){
		return Hotel.list()
	}
	
	Hotel get(int id){
		return Hotel.get(id)
	}
	
	Hotel save(Hotel hotel){
		Hotel h = Hotel.get(hotel.id)
		h.properties = hotel.properties
		
		h.save(flush:true)
		
		return h
	}
	
	Hotel remove(Hotel hotel){
		hotel.delete(flush:true)
	}
}
