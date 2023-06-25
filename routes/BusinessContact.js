var express = require('express');
var router = express.Router();

let BusinessContactController = require('../controllers/BusinessContact');

// Helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    
    // ADD YOUR CODE HERE 
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();       

}

/* GET list of items */
router.get('/list', BusinessContactController.BusinessContactList);

// Route for Details
router.get('/details/:id', BusinessContactController.details);

// Routers for edit
router.get('/edit/:id',requireAuth, BusinessContactController.displayEditPage);
router.post('/edit/:id',requireAuth, BusinessContactController.processEditPage);

// Delete
router.get('/delete/:id',requireAuth, BusinessContactController.performDelete);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add',requireAuth, BusinessContactController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add',requireAuth, BusinessContactController.processAddPage);

module.exports = router;