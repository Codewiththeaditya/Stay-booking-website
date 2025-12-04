let express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/expressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");

let validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el)=> el.message.replace(/listing\./g,"")).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

//Index Route :
router.get('/', wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

//New Route :
router.get("/new", wrapAsync(async(req,res)=>{
    res.render("listings/new.ejs");
}));

//Create Route :
router.post("/", validateListing, wrapAsync(async(req,res)=>{
    
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

//Edit Route :
router.get("/:id/edit", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);

    res.render("listings/edit.ejs",{listing});
}));


//Update:
router.put("/:id", validateListing, wrapAsync(async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));


//Delete Route :
router.delete("/:id", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}));


//show Route :
router.get("/:id", wrapAsync(async(req,res)=>{
    let {id} = req.params;

    const listing = await Listing.findById(id).populate("reviews");

    res.render("listings/show.ejs",{listing});
}));


module.exports = router;