const express = require("express");

const router = express.Router()

const { protect } = require("../middelwares/authmiddleware");


const {getContacts, createContact, getContact, updateContact, deleteContact} = require ("../controllers/contactcontroller");



router.use(protect)
router.route("/").get(getContacts).post(createContact)

router.route("/:id").put(updateContact).delete(deleteContact).get(getContact)

module.exports = router