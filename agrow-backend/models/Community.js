const mongoose = require("mongoose")
const communitySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    rules : {
        type : String,
    },
    members : {
        type : [String],
        required : true 
    },
    content : {
        type : [String]
    },
    state : {
        type : String,
        required : true
    },
    district : {
        type : String,
        required : true
    },
    taluka : {
        type : String,
    },
    village : {
        type : String,
    },
    searchTags : {
        type : [String],
        required : true
    }
})

const Community = mongoose.model("Communities", communitySchema)

module.exports = Community;


// Community.insertMany([
// {
// "name":"Cotton Farmers - Pune Haveli",
// "description":"Community for cotton growers to discuss pests, fertilizers and yield improvement.",
// "rules":"Be respectful. Share only farming related content. No spam.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Pune",
// "taluka":"Haveli",
// "village":"Wagholi",
// "searchTags":["cotton","pest control","fertilizer"]
// },
// {
// "name":"Sugarcane Growers - Kolhapur",
// "description":"Discussion space for sugarcane farming techniques and irrigation methods.",
// "rules":"No unrelated business promotion. Help fellow farmers.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Kolhapur",
// "taluka":"Karveer",
// "village":"Ujalaiwadi",
// "searchTags":["sugarcane","irrigation","harvest"]
// },
// {
// "name":"Rice Cultivation - Raigad",
// "description":"Rice farmers sharing seasonal practices and disease prevention tips.",
// "rules":"Post only verified or experienced advice.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Raigad",
// "taluka":"Alibag",
// "village":"Nagaon",
// "searchTags":["rice","water management","disease"]
// },
// {
// "name":"Wheat Farmers - Nashik",
// "description":"Wheat crop planning, sowing and harvesting discussion group.",
// "rules":"Respect everyone and avoid political posts.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Nashik",
// "taluka":"Niphad",
// "village":"Pimpalgaon",
// "searchTags":["wheat","sowing","harvesting"]
// },
// {
// "name":"Vegetable Growers - Satara",
// "description":"Community for vegetable farmers to exchange best practices.",
// "rules":"No selling outside service section.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Satara",
// "taluka":"Phaltan",
// "village":"Barad",
// "searchTags":["vegetables","organic","market"]
// },
// {
// "name":"Organic Farming - Ahmednagar",
// "description":"Farmers practicing organic and natural farming methods.",
// "rules":"Share practical experiences only.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Ahmednagar",
// "taluka":"Rahata",
// "village":"Shirdi",
// "searchTags":["organic","natural farming","soil health"]
// },
// {
// "name":"Onion Farmers - Lasalgaon",
// "description":"Tips and price discussions for onion farmers.",
// "rules":"No fake price rumors.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Nashik",
// "taluka":"Niphad",
// "village":"Lasalgaon",
// "searchTags":["onion","market price","storage"]
// },
// {
// "name":"Grape Growers - Sangli",
// "description":"Grape cultivation and export quality guidance.",
// "rules":"Avoid misinformation.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Sangli",
// "taluka":"Miraj",
// "village":"Kupwad",
// "searchTags":["grapes","export","spraying"]
// },
// {
// "name":"Pomegranate Farmers - Solapur",
// "description":"Pomegranate disease management community.",
// "rules":"Post only agriculture content.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Solapur",
// "taluka":"Pandharpur",
// "village":"Kasegaon",
// "searchTags":["pomegranate","disease","fruit cracking"]
// },
// {
// "name":"Dairy Farmers - Baramati",
// "description":"Milk production and cattle health discussions.",
// "rules":"Be supportive and respectful.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Pune",
// "taluka":"Baramati",
// "village":"Malegaon",
// "searchTags":["dairy","cattle","fodder"]
// },
// {
// "name":"Tur Dal Farmers - Latur",
// "description":"Pulse farming support community.",
// "rules":"No non-farming posts.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Latur",
// "taluka":"Udgir",
// "village":"Handarguli",
// "searchTags":["tur","dal","rainfed"]
// },
// {
// "name":"Groundnut Farmers - Gujarat",
// "description":"Groundnut cultivation techniques and pest solutions.",
// "rules":"Share real experiences only.",
// "members":[],
// "content":[],
// "state":"Gujarat",
// "district":"Junagadh",
// "taluka":"Keshod",
// "village":"Mendarda",
// "searchTags":["groundnut","soil","yield"]
// },
// {
// "name":"Cotton Growers - Gujarat",
// "description":"Cotton pest management and irrigation.",
// "rules":"No chemical misuse advice.",
// "members":[],
// "content":[],
// "state":"Gujarat",
// "district":"Rajkot",
// "taluka":"Gondal",
// "village":"Bhojrajpara",
// "searchTags":["cotton","bollworm","spray"]
// },
// {
// "name":"Rice Farmers - Punjab",
// "description":"High yield rice cultivation methods.",
// "rules":"Helpful posts only.",
// "members":[],
// "content":[],
// "state":"Punjab",
// "district":"Ludhiana",
// "taluka":"Jagraon",
// "village":"Sidhwan",
// "searchTags":["rice","yield","water"]
// },
// {
// "name":"Wheat Growers - Haryana",
// "description":"Modern wheat farming practices.",
// "rules":"No spam posts.",
// "members":[],
// "content":[],
// "state":"Haryana",
// "district":"Karnal",
// "taluka":"Nilokheri",
// "village":"Tarawadi",
// "searchTags":["wheat","fertilizer","irrigation"]
// },
// {
// "name":"Tea Farmers - Assam",
// "description":"Tea plantation community.",
// "rules":"Respect plantation workers.",
// "members":[],
// "content":[],
// "state":"Assam",
// "district":"Dibrugarh",
// "taluka":"Naharkatia",
// "village":"Bogibeel",
// "searchTags":["tea","plantation","leaf"]
// },
// {
// "name":"Spice Farmers - Kerala",
// "description":"Pepper and cardamom farming tips.",
// "rules":"No advertising products.",
// "members":[],
// "content":[],
// "state":"Kerala",
// "district":"Idukki",
// "taluka":"Udumbanchola",
// "village":"Vandanmedu",
// "searchTags":["spices","pepper","cardamom"]
// },
// {
// "name":"Banana Farmers - Jalgaon",
// "description":"Banana tissue culture and disease management.",
// "rules":"Share only useful information.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Jalgaon",
// "taluka":"Raver",
// "village":"Savda",
// "searchTags":["banana","tissue culture","disease"]
// },
// {
// "name":"Maize Farmers - MP",
// "description":"Maize hybrid crop discussions.",
// "rules":"Be helpful.",
// "members":[],
// "content":[],
// "state":"Madhya Pradesh",
// "district":"Indore",
// "taluka":"Sanwer",
// "village":"Hatod",
// "searchTags":["maize","hybrid","nutrition"]
// },
// {
// "name":"Soybean Farmers - MP",
// "description":"Soybean seasonal crop management.",
// "rules":"Avoid rumors.",
// "members":[],
// "content":[],
// "state":"Madhya Pradesh",
// "district":"Ujjain",
// "taluka":"Badnagar",
// "village":"Runija",
// "searchTags":["soybean","rainfed","crop"]
// },
// {
// "name":"Chilli Growers - Andhra",
// "description":"Red chilli cultivation and drying methods.",
// "rules":"Post relevant content only.",
// "members":[],
// "content":[],
// "state":"Andhra Pradesh",
// "district":"Guntur",
// "taluka":"Tenali",
// "village":"Kollipara",
// "searchTags":["chilli","drying","market"]
// },
// {
// "name":"Fish Farming - West Bengal",
// "description":"Aquaculture and pond management.",
// "rules":"Respectful discussion.",
// "members":[],
// "content":[],
// "state":"West Bengal",
// "district":"Howrah",
// "taluka":"Uluberia",
// "village":"Bagnan",
// "searchTags":["fish","pond","aquaculture"]
// },
// {
// "name":"Mango Farmers - Ratnagiri",
// "description":"Alphonso mango orchard management.",
// "rules":"No misinformation.",
// "members":[],
// "content":[],
// "state":"Maharashtra",
// "district":"Ratnagiri",
// "taluka":"Dapoli",
// "village":"Harnai",
// "searchTags":["mango","alphonso","orchard"]
// },
// {
// "name":"Millet Farmers - Karnataka",
// "description":"Ragi and millet cultivation practices.",
// "rules":"Share practical tips.",
// "members":[],
// "content":[],
// "state":"Karnataka",
// "district":"Mandya",
// "taluka":"Maddur",
// "village":"Koppa",
// "searchTags":["millet","ragi","nutrition"]
// },
// {
// "name":"Mixed Crop Farmers - Rajasthan",
// "description":"Dryland farming and water conservation.",
// "rules":"Be constructive.",
// "members":[],
// "content":[],
// "state":"Rajasthan",
// "district":"Ajmer",
// "taluka":"Kishangarh",
// "village":"Bandarsindri",
// "searchTags":["dryland","water","crop"]
// }
// ])