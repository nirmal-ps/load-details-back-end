const express = require('express')
const router = express.Router()
const LoanDetailcollection = require('../database/models/loan-details')

router.get('/', (req, res) => {
    const { page, count } = req.query;
    LoanDetailcollection.findByLimit(page, count, (err, data) => {
        if (err) {
            res.status(502).send(err)
        }
        LoanDetailcollection.count((err, count) => {
            res.json({data: data, count: count});
        })
        
    })
    
})

module.exports = router