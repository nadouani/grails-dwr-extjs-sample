Ext.onReady(function() {
    Ext.QuickTips.init();

	var reader = new Ext.data.JsonReader({
		idProperty: 'id',
		fields : [
			{name: 'id'},
			{name: 'name', type: 'string'},
			{name: 'website', type: 'string'},
			{name: 'phoneNumber', type: 'string'},
			{name: 'city', type: 'string'},
			{name: 'country', type: 'string'},
			{name: 'stars', type: 'int'},
			{name: 'rooms', type: 'int'},
			{name: 'beds', type: 'int'}
		]
	});

    var writer = new Ext.data.JsonWriter({
  		writeAllFields: true,
  		listful : true
  	});

    var hotelStore = new Ext.data.Store({
        proxy: new Ext.ux.data.DwrProxy({
      	  apiActionToHandlerMap : {
  				read : { dwrFunction : HotelService.getAll },
  				create : { dwrFunction : HotelService.save },
  				update : {
  					dwrFunction : HotelService.save,
  					
  					getDwrArgsFunction: function(request, recordDataArray, oldRecordDataArray) {
                      return [recordDataArray, oldRecordDataArray];
  					}
  				},
  				destroy : {
  					dwrFunction : HotelService.remove
  				}
  			}			
  		}),
  		reader: reader,
  		writer: writer,
  		autoSave: true,
  		sortInfo:{field: 'id', direction: 'ASC'}
    });
    
    hotelStore.load();

    var hotelGrid = new Ext.grid.GridPanel({
    	renderTo: 'hotel-grid',        
        store: hotelStore,
        frame: true,
        title: 'Hotels',
        height: 300,
        width: 800,
        style: 'margin-top: 10px',
        viewConfig : {
            forceFit: true
        },
        // build toolbars and buttons.
        cm : new Ext.grid.ColumnModel({
	    	defaults: {
	          sortable: true // columns are not sortable by default           
	      	},
	      	columns: [
	      	    { header: '#', readOnly: true, dataIndex: "id", width: 40, hidden: false},
	      	    { header: 'Name', dataIndex: "name", width:150},
	      	    { header: 'Website', dataIndex: "website", width:150},
				{ header: 'Phone', dataIndex: "phoneNumber"},
				{ header: 'City', dataIndex: "city"},
				{ header: 'Country', dataIndex: "country"},
				{ header: '# Stars', dataIndex: "stars", width:50},
				{ header: '# Rooms', dataIndex: "rooms", width:60},
				{ header: '# Beds', dataIndex: "beds", width:50},
	        ]
	    })
    });

    
    //hotelGrid.show();
    
    
    /*
    var hotelPanel = new Ext.Panel({
        title: 'My Panel',
        collapsible:true,
        renderTo: 'hotel-form',
        width:400,
        html: 'Hello'
    });
    */
});
