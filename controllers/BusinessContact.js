// create a reference to the model
let BusinessContact = require('../models/BusinessContact');

// Gets all cars from the Database and renders the page to list them all.
module.exports.BusinessContactList = async function(req, res, next) {  

    try {
        let BusinessContactList = await BusinessContact.find({});

        res.render('BusinessContact/list', {
            title: 'Business Contact List', 
            BusinessContactList: BusinessContactList,
            userName: req.user ? req.user.username : ''
        })  
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// Gets a car by id and renders the details page.
module.exports.details = async (req, res, next) => {

    try {
        let id = req.params.id;

        let BusinessContactToShow = await BusinessContact.findById(id);

        res.render('BusinessContact/details', {
            title: 'Business Contact Details', 
            BusinessContact: BusinessContactToShow
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    let blankBusinessContact = BusinessContact();

    res.render('BusinessContact/add_edit',
        {
            title: 'Add a new Contact',
            BusinessContact: blankBusinessContact,
            userName: req.user ? req.user.username : ''
        });


}

// Processes the data submitted from the Add form to create a new car
module.exports.processAddPage = async (req, res, next) => {

    try {

        let newBusinessContact = BusinessContact({
            _id: req.body.id,
            name: req.body.name,
            number: req.body.number,
            email: req.body.email
        });

        let result = await BusinessContact.create(newBusinessContact)

        // refresh the book list
        console.log(result);
        res.redirect('/BusinessContact/list');

    } catch (error) {
        console.log(error);
        next(error);
    }

}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = async (req, res, next) => {
    
    try {
        let id = req.params.id;

        let BusinessContactToEdit = await BusinessContact.findById(id);

        res.render('BusinessContact/add_edit',
            {
                title: 'Edit a new Item',
                BusinessContact: BusinessContactToEdit,
                userName: req.user ? req.user.username : ''
            });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

// Processes the data submitted from the Edit form to update a car
module.exports.processEditPage = async (req, res, next) => {

    try {

        let id = req.params.id

        // Builds updatedProduct from the values of the body of the request.
        let updatedBusinessContact = BusinessContact({
            _id: req.body.id,
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
        });

        // Submits updatedProduct to the DB and waits for a result.
        let result = await BusinessContact.updateOne({ _id: id }, updatedBusinessContact);
        console.log(result);

        // If the product is updated redirects to the list
        if (result.modifiedCount > 0) {
            res.redirect('/BusinessContact/list');
        }
        else {
            // Express will catch this on its own.
            throw new Error('Item not updated. Are you sure it exists?') 
        }

    } catch (error) {
        next(error)
    }
    
}

// Deletes a car based on its id.
module.exports.performDelete = async (req, res, next) => {
    
    
    try {

        let id = req.params.id;

        let result = await BusinessContact.deleteOne({ _id: id });

        console.log("====> Result: ", result);
        if (result.deletedCount > 0) {
            // refresh the book list
            res.redirect('/BusinessContact/list');
        }
        else {
            // Express will catch this on its own.
            throw new Error('Item not deleted. Are you sure it exists?') 
        }

    } catch (error) {
        console.log(error);
        next(error);
    }

}