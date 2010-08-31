package fr.nadouani.tutorial

class HotelController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index = {
    }

    def list = {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [hotelInstanceList: Hotel.list(params), hotelInstanceTotal: Hotel.count()]
    }

    def create = {
        def hotelInstance = new Hotel()
        hotelInstance.properties = params
        return [hotelInstance: hotelInstance]
    }

    def save = {
        def hotelInstance = new Hotel(params)
        if (hotelInstance.save(flush: true)) {
            flash.message = "${message(code: 'default.created.message', args: [message(code: 'hotel.label', default: 'Hotel'), hotelInstance.id])}"
            redirect(action: "show", id: hotelInstance.id)
        }
        else {
            render(view: "create", model: [hotelInstance: hotelInstance])
        }
    }

    def show = {
        def hotelInstance = Hotel.get(params.id)
        if (!hotelInstance) {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'hotel.label', default: 'Hotel'), params.id])}"
            redirect(action: "list")
        }
        else {
            [hotelInstance: hotelInstance]
        }
    }

    def edit = {
        def hotelInstance = Hotel.get(params.id)
        if (!hotelInstance) {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'hotel.label', default: 'Hotel'), params.id])}"
            redirect(action: "list")
        }
        else {
            return [hotelInstance: hotelInstance]
        }
    }

    def update = {
        def hotelInstance = Hotel.get(params.id)
        if (hotelInstance) {
            if (params.version) {
                def version = params.version.toLong()
                if (hotelInstance.version > version) {
                    
                    hotelInstance.errors.rejectValue("version", "default.optimistic.locking.failure", [message(code: 'hotel.label', default: 'Hotel')] as Object[], "Another user has updated this Hotel while you were editing")
                    render(view: "edit", model: [hotelInstance: hotelInstance])
                    return
                }
            }
            hotelInstance.properties = params
            if (!hotelInstance.hasErrors() && hotelInstance.save(flush: true)) {
                flash.message = "${message(code: 'default.updated.message', args: [message(code: 'hotel.label', default: 'Hotel'), hotelInstance.id])}"
                redirect(action: "show", id: hotelInstance.id)
            }
            else {
                render(view: "edit", model: [hotelInstance: hotelInstance])
            }
        }
        else {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'hotel.label', default: 'Hotel'), params.id])}"
            redirect(action: "list")
        }
    }

    def delete = {
        def hotelInstance = Hotel.get(params.id)
        if (hotelInstance) {
            try {
                hotelInstance.delete(flush: true)
                flash.message = "${message(code: 'default.deleted.message', args: [message(code: 'hotel.label', default: 'Hotel'), params.id])}"
                redirect(action: "list")
            }
            catch (org.springframework.dao.DataIntegrityViolationException e) {
                flash.message = "${message(code: 'default.not.deleted.message', args: [message(code: 'hotel.label', default: 'Hotel'), params.id])}"
                redirect(action: "show", id: params.id)
            }
        }
        else {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'hotel.label', default: 'Hotel'), params.id])}"
            redirect(action: "list")
        }
    }
}
