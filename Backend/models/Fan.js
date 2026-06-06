import mongoose, { mongo } from "mongoose";

const fanSchema = new mongoose.Schema({
    fanId: { type: String, required: true, unique: true, },
    name: { type: String, required: true },
    email: { type: String },
    nationality: { type: String },
    matchTicketd: [{
        matchId: String,
        stadium: String,
        matchDate: Date,
        seat: String,
    }],
    itinerary:{
        flight:{
            from : String,
            to: String,
            date: Date,
            status:{type: String, default: "pending"},
            confirmationId : String,
        },
        hotel:{
            name: String,
            location: String,
            checkIn: Date,
            checkOut: Date,
            status: {type: String, default: "pending"},
        },
        taxi:{
            pickup: String,
            dropoff: String,
            scheduledTime: Date,
            driverName: String,
            status: {type: String, default: "pending"},
            confirmationId: String,
        }
    },
    

}, {timestamps: true})

const crowdSchema = new mongoose.Schema({
    stadiumName: {type: String, required: true},
    matchId: {type: String},
    currentCapacity: {type : Number, default:0},
    maxCapacity: {type: Number},
    crowdLevel:{
        type: String,
        enum:["low", "moderate", "high", "critical"],
        default: 'low'
    },
    congestionZones :[{zone: String, level: String}],
    alerts:[{message: String, triggeredAt: Date}],
    updatedAt: {type: Date, default: Date.now}
})

const transitSchema= new mongoose.Schema({
    routeId: {type: String, required: true, unique : true},
    stadium: {type: String, required: true},
    transportType: {
        type: String,
        enum:["bus", "metro", "shuttle", "taxi"],
    },
    origin: {type: String},
    destination: {type: String},
    status:{
        type: String,
        enym:["active", "delayed", "cancelled", 'rerouted'], default: "active"
    },
    estimatedArrival: {type: Date},
    delayMinutes: {type: Number, default: 0},
    rerouted:{type:Boolean, default: false},
    reroutedReason:{type: String},
    affectedFans:[{type: String}],
    updatedAt:{type: Date, default: Date.now}
})

//MEDICAL EMERGENCY SCHEMA

const medicalSchema = new mongoose.Schema({
    emergencyId: {type: String, required: true, unique: true},
    stadiumName:{type: String, required: true},
    location: {
        zone: String,
        gate: String,
        coordinates: {lat:Number, lng: Number}
    },
    severity:{
        type: String,
        enum:['low', 'medium', 'high', 'critical'],
        required: true
    },
    patientCount : {type: Number, default:1},
    incidentType: {
        type: String,
        enum:['injury', 'cardiac', 'heartstroke', 'stampede', 'other'],

    },
    status:{
        type: String,
        enum: ['reported', 'responding', 'resolved'],
        default: 'reported'
    },
    responders:[{
        name: String,
        unit: String,
        eta: Number,
    }],
    hospitalName: {type: String},
    hospitalEta: {type: Number},
    resolvedAt: {type: Date},
    createdAt :{type: Date, default: Date.now},
})

// Business schema

const businessSchema = new mongoose.Schema({
    venueId: {type: String, required: true},
    bussinessName: {type: String, required: true},
    type:{
        type: String,
        enum:['food', 'merchandise', 'transport', 'hotel', 'medical']
    },
    stadium:{type: String},
    demandLevel:{
        type: String,
        enum:['low', 'moderate', 'high', 'surge'],
        default: 'low'
    },
    currentStock: {type:Number},
    staffCount: {type:Number},
    recommendedStaff :{type: Number},
    surgeAlert: {type: Boolean, default: false},
    alerts:[{message:String, createdAt: Date}],
    updatedAt:{type: Date, default: Date.now}

})

const executionLogSchema = new mongoose.Schema({
    agentName: {
        type: String,
        enum:['fanAgent', 'crowdAgent',"transitAgent", 'medicalAgent', "businessAgent", "orchestrator" ],
        required: true
    },
    toolUsed: {type: String},
    action:{type:String, required: true},
    input: {type: mongoose.Schema.Types.Mixed},
    output:{type: mongoose.Schema.Types.Mixed},
    status:{
        type: String,
        enum:['success', 'failed', 'pending'],
        default:'success'
    },
    reason: {type: String},
    executionTime: {type: Number},
    createdAt: {type: Date, default: Date.now}
})

export const Fan = mongoose.model('Fan', fanSchema)
export const Crowd = mongoose.model('Crowd', crowdSchema)
export const Transit = mongoose.model('Transit', transitSchema)
export const Medical = mongoose.model('Medical', medicalSchema)
export const Business = mongoose.model('Business', businessSchema)
export const ExecutionLog = mongoose.model("ExecutionLog", executionLogSchema)