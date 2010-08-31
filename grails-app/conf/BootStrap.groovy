class BootStrap {

    def init = { servletContext ->
    }
    def destroy = {
    }
	
	def dwrconfig = {
		service(name:'hotelService', javascript:'HotelService') {
			param (name:'class') { 
				'fr.nadouani.tutorial.HotelService' 
			}
			exclude('setMetaClass,getMetaClass,setProperty,getProperty')
		}
		convert(converter:'bean',match:'fr.nadouani.tutorial.Hotel', javascript:'Hotel')
	}
}
