var ThingCategory = {
	INVALID : -1,
	PERCEPTION : 0,
	AGENCY : 1,
	MODEL : 2
};

var ThingEventType = {
	NONE : 0,
	ADDED : 1,
	REMOVED : 2,
	STATE : 4,
	IMPORTANCE : 8
};

function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

function GUID() {
	var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
	return guid;
}

var Thing = function() {
	this.thingType = "IThing";
	this.category = ThingCategory.PERCEPTION;
	this.guid = GUID();
	this.importance = 1.0;
	this.state = "ADDED";
	this.create_time = new Date().getTime() / 1000;
	this.life_span = 3600.0;
	this.body = {};
	this.data_type = "";
	this.data = {};
	this.parentId = "";
}

Thing.prototype = {

	constructor: Thing,

	setThingType : function(value) {
		this.thingType = value;
	},
	setCategory : function(value) {
		this.category = value;
	},
	setGUID : function(value) {
		this.guid = value;
	},
	setImportance : function(value) {
		this.importance = value;
	},
	setState : function(value) {
		this.state = value;
	},
	setCreateTime : function(value) {
		this.create_time = value;
	},
	setLifeSpan : function(value) {
		this.life_span = value;
	},
	setBody : function(value) {
		this.body = value;
	},
	setDataType : function(value) {
		this.data_type = value
	},
	setData : function(value) {
		this.data = value
	},
	setParentId : function(value) {
		this.parentId = value;
	},

	deserialize : function(payload) {
		var json = JSON.parse(payload);
		this.body = payload;
		this.type = json["Type_"];
		this.category = json["m_eCategory"];
		this.guid = json["m_GUID"];
		this.state = json["m_State"];
		if(json.hasOwnProperty('m_fImportance')) {
			this.importance = json["m_fImportance"];
		}
		if(json.hasOwnProperty('m_CreateTime')) {
			this.create_time = json["m_CreateTime"];
		}
		if(json.hasOwnProperty('m_fLifeSpan')) {
			this.life_span = json["m_fLifeSpan"];
		}
		if(json.hasOwnProperty('m_DataType')) {
			this.data_type = json["m_DataType"];
		}
		if(json.hasOwnProperty('m_Data')) {
			this.data = json["m_Data"];
		}
	},

	getThingType : function() {
		return this.thingType;
	},
	getCategory : function() {
		return this.category;
	},
	getGUID : function() {
		return this.guid;
	},
	getImportance : function() {
		return this.importance;
	},
	getState : function() {
		return this.state;
	},
	getCreateTime : function() {
		return this.create_time;
	},
	getLifeSpan : function() {
		return this.life_span;
	},
	getBody : function() {
		return this.body;
	},
	getDataType : function() {
		return this.data_type;
	},
	getData : function() {
		return this.data;
	},
	getParentId : function() {
		return this.parentId;
	},

	serialize : function() {

		var msg = {};

		for(var key in this.body) {
			var value = this.body[key];
			msg[key] = value;
		}

		msg["Type_"] = this.thingType;
		msg["m_eCategory"] = this.category;
		msg["m_GUID"] = this.guid;
		msg["m_fImportance"] = this.importance;
		msg["m_State"] = this.state;
		msg["m_fLifeSpan"] = this.life_span;

		if(this.data_type != "") {
			msg["m_DataType"] = this.data_type;
			msg["m_Data"] = this.data;
		}

		return msg;
	}
}

var ThingEvent = function() {
	this.thingEvent = "";
	this.eventType = "";
	this.thing = "";
}

ThingEvent.prototype = {
	constructor: ThingEvent,

	getEventType : function() {
		return this.eventType;
	},
	getThingEvent : function() {
		return this.thingEvent;
	},
	getThing : function() {
		return this.thing;
	},

	setEventType : function(value) {
		this.eventType = value;
	},
	setThingEvent : function(value) {
		this.thingEvent = value;
	},
	setThing : function(value) {
		this.thing = value;
	}

}