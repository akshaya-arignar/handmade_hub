import express from "express";
import Customer from "../models/customer_schema.js";

const router = express.Router();

// get all customers 
router.get("/", async (req, res)=>{
    try{
        const customers = await Customer.find()
        res.json(customers)
    }
    catch{
        res.status(500).json({message: "error fecthing customers"})
    }
});

//create a customer
router.post("/", async (req, res)=>{
    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        orders: req.body.orders
    })
    try{
        const newCustomer = await customer.save()
        res.json(newCustomer)
    }
    catch{
        res.status(500).json({message: "error creating customer"})
    }
})

//get a customer by id 
router.get("/:id", async (req, res)=>{
    try{
        const customer = await Customer.findById(req.params.id)
            if(customer)
            {
                res.send(customer)
            }
            else
            {
                res.status(404).json({ message: "Customer not found" });
            }
    }
    catch{
        res.status(500).json({message: "error fecthing customer"})
    }
})

//update a customer by id 
router.patch("/:id",async(req,res)=>{
    try{
        const customer = await Customer.findById(req.params.id)
            if(customer)
            {
                if (req.body.name !== undefined) customer.name = req.body.name;
                if (req.body.phone !== undefined) customer.phone = req.body.phone;
                if (req.body.email !== undefined) customer.email = req.body.email;
                if(req.body.password !== undefined) customer.password = req.body.password;
                        
                const updateCustomer = await customer.save()
                res.json(updateCustomer)
            }
            else
            {
                        res.status(404).json({ message: "Customer not found" });
            }
    }
    catch(err){
        res.status(500).json({message: "error updating customer"})
    }
})

//delete a customer by id
router.delete("/:id",async (req, res)=>{
    try{
        const customer = Customer.findById(req.params.id)
            if(customer)
            {
                await customer.deleteOne()
                res.json({message: "Customer deleted"})
            }
            else
            {
                res.status(404).json({ message: "Customer not found" });
            }
    }
    catch(err){
            res.status(500).json({message: "error deleting customer"})
    }
})


export default router;