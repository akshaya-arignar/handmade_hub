import express from "express";
import artCollection from "../models/artCollect_schema.js";

const router = express.Router();


//get all art collection
router.get("/", async (req, res) => {
    try {
        const art = await artCollection.find();
        res.json(art);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//create a new art collection
router.post("/", async(req,res)=>{
    const artist = new artCollection({
        title: req.body.title,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        category: req.body.category,
        available: req.body.available
    })
    try{
        const newArtist = await artist.save()
        res.json(newArtist)
    }
    catch(err){
        res.status(400).json({message: "error creating a word"})
    }
});

// get a art collection by id 
router.get("/:id", async(req,res)=>{
    try{
        const artist = await artCollection.findById(req.params.id)
            if(artist)
            {
                res.json(artist)
            }
            else
            {
                res.status(404).json({ message: "Artist not found" });
            }
    }
    catch(err){
        res.status(500).json({message: "error fecthing artist"})
    }
})

//update a art collection by id 
router.patch("/:id",async(req,res)=>{
    try{
        const artist = await artCollection.findById(req.params.id)
            if(artist)
            {
                if (req.body.title !== undefined) artist.title = req.body.title;
                if (req.body.description !== undefined) artist.description = req.body.description;
                if (req.body.imgUrl !== undefined) artist.imgUrl = req.body.imgUrl;
                if (req.body.price !== undefined) artist.price = req.body.price;
                if (req.body.category !== undefined) artist.category = req.body.category;
                if (req.body.available !== undefined) artist.available = req.body.available;

                const updateArtist = await artist.save()
                res.json(updateArtist)
            }
            else
            {
                res.status(404).json({ message: "Artist not found" });
            }
    }
    catch(err){
        res.status(500).json({message: "error updating artist"})
    }

})

// delete a art collection by id 
router.delete("/:id",async (req, res)=>{
    const artist = artCollection.findById(req.params.id)
    try{
            if(artist)
            {
                await artist.deleteOne()
                res.json({message: "Artist deleted"})
            }
            else
            {
                res.status(404).json({ message: "Artist not found" });
            }
    }
    catch(err){
            res.status(500).json({message: "error deleting artist"})
    }

});

export default router;