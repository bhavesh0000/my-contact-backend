const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")


//@desc Get all contacts
//@route Get /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res)=>{
    const contacts = await Contact.find({ user_id: req.user._id})
    res.status(200).json(contacts)
})
//@desc create new contact
//@route Post /api/contacts
//@access private

const createContact = asyncHandler(async (req, res)=>{
    console.log("The request body is:", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user._id,
    })

    res.status(201).json(contact)
})
//@desc Get all contact
//@route Get /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    if (contact.user_id.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error("You are not authorised to access this contact.")
    }
    res.status(200).json(contact)
})
//@desc update  contact
//@route put /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    if (contact.user_id.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error("You are not authorised to update this contact.")
    }
const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true}
)
    res.status(200).json(updatedContact)
})
//@desc delete contact
//@route delet /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    if (contact.user_id.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You are not authorized to delete this contact");
      }
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(contact)
})
module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}  