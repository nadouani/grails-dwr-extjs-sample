Ext.ns('App', 'App.hotel');

App.hotel.Grid = Ext.extend(Ext.grid.EditorGridPanel, {
	renderTo: 'hotel-grid',
	iconCls: 'silk-hotel',
    frame: true,
    title: 'Hotels',
    height: 300,
    width: 800,
    style: 'margin-top: 10px',

    initComponent : function() {

        // typical viewConfig
        this.viewConfig = {
            forceFit: true
        };

        // relay the Store's CRUD events into this grid so these events can be conveniently listened-to in our application-code.
        //this.relayEvents(this.store, ['destroy', 'save', 'update']);

        // build toolbars and buttons.
        this.cm = this.buildColumnModel();
        this.tbar = this.buildTopToolbar();
        this.bbar = this.buildBottomToolbar();

        // super
        App.hotel.Grid.superclass.initComponent.call(this);
    },
    
    buildColumnModel : function(){
    	var defaultEditor = new Ext.form.TextField({
            allowBlank: false
    	});
    	
    	return new Ext.grid.ColumnModel({
	    	defaults: {
	          sortable: true // columns are not sortable by default           
	      	},
	      	columns: [
	      	    { header: '#', readOnly: true, dataIndex: "id", width: 40, hidden: false},
	      	    { header: 'Name', dataIndex: "name", width:150, editor: defaultEditor},
	      	    { header: 'Website', dataIndex: "website", width:150, editor: defaultEditor},
				{ header: 'Phone', dataIndex: "phoneNumber", editor: defaultEditor},
				{ header: 'City', dataIndex: "city", editor: defaultEditor},
				{ header: 'Country', dataIndex: "country", editor: defaultEditor},
				{ header: '# Stars', dataIndex: "stars", width:50, editor: defaultEditor},
				{ header: '# Rooms', dataIndex: "rooms", width:60, editor: defaultEditor},
				{ header: '# Beds', dataIndex: "beds", width:50, editor: defaultEditor},
	        ]
	    })
    },

    buildTopToolbar : function() {
        return [{
            text: 'Add',
            iconCls: 'silk-add',
            handler: this.onAdd,
            scope: this
        }, '-', {
            text: 'Delete',
            iconCls: 'silk-delete',
            handler: this.onDelete,
            scope: this
        }, '-'];
    },

    buildBottomToolbar : function() {
        return [{
            text: 'autoSave',            
            iconCls: 'silk-auto-save',
            enableToggle: true,
            tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
            toggleHandler: function(btn, pressed) {
                this.store.autoSave = pressed;
            },
            scope: this
        }, '-', {
            text: 'batch',
            iconCls: 'silk-batch',
            enableToggle: true,
            tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
            toggleHandler: function(btn, pressed) {
                this.store.batch = pressed;
            },
            scope: this
        }, '-', {
            text: 'writeAllFields',
            iconCls: 'silk-write',
            enableToggle: true,
            tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
            toggleHandler: function(btn, pressed) {
                this.store.writer.writeAllFields = pressed;
            },
            scope: this
        }, '->', {
            text: 'Save',
            iconCls: 'silk-save',
            handler: this.onSave,
            scope: this
        }];
    },

    onSave : function(btn, ev) {
        this.store.save();
    },

    onAdd : function(btn, ev) {
    	/*
        var u = new this.store.recordType({
            first : '',
            last: '',
            email : ''
        });
        this.stopEditing();
        this.store.insert(0, u);
        this.startEditing(0, 1);
        */
    },

    onDelete : function(btn, ev) {
        var index = this.getSelectionModel().getSelectedCell();
        if (!index) {
            return false;
        }
        var rec = this.store.getAt(index[0]);
        this.store.remove(rec);
    }
});


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
    
    
    var hotelGrid = new App.hotel.Grid({
        renderTo: 'hotel-grid',
        store: hotelStore
    });
});
