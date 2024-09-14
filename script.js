$(document).ready(function() { 
    let contacts = [];
    let currentEditIndex = null; // If no contact is being edited, global variable is set to null
    let deleteIndex = null; // If no contact is to be deleted, global variable is set to null

    // Display Error Message
    function showError(message) {
        $('#error-message').text(message).removeClass('hidden');
    }

    function hideError() {
        $('#error-message').addClass('hidden').text('');
    }

    // Check for Duplicate Phone Number
    function isDuplicate(phone, excludeIndex) { // excludeIndex ensures current contact being edited is excluded from validation
        return contacts.some((contact, index) => contact.phone === phone && index !== excludeIndex);
    }

    // Validate Form
    function validateForm() {
        let isValid = true;
        $('#contact-form input').each(function () {
            if ($(this).val().trim() === '') { // Checks if field empty
                isValid = false;
                showError('Please fill out all the empty fields.');
                return false;
            }
        });
        const phone = $('#phone').val();
        if (isValid && phone.length !== 11) { // Checks if number is valid
            showError('Please enter a valid 11-digit phone number.');
            isValid = false;
        }
        if (isValid && isDuplicate(phone, currentEditIndex)) { // Checks if number is already on the contact list
            showError('Phone number already exists in address book.');
            isValid = false;
        }
        if (isValid) {
            hideError();
        }
        return isValid;
    }

    // Clear form after adding contact
    function clearForm() {
        $('#contact-form')[0].reset(); // Resets fields
        $('#add-btn').show();
        $('#save-btn').hide();
        currentEditIndex = null;
    }

    // Add Contact
    function addContact() {
        if (!validateForm()) return; // Validate form before adding a contact
        const contact = {
            name: $('#name').val(),
            surname: $('#surname').val(),
            phone: $('#phone').val(),
            address: $('#address').val()
        }
        contacts.push(contact);
        displayContacts();
        clearForm();
    }

    $('#add-btn').click(function(event) {
        event.preventDefault(); // Prevents page from reloading
        addContact();
    });

    // Display Contacts
    function displayContacts() {
        contacts.sort((a, b) => a.name.localeCompare(b.name)); // Sort Contacts by Name
        $('#contact-list').empty();
        contacts.forEach((contact, index) => {
            let actionColumn = '';
            if (currentEditIndex === null || currentEditIndex !== index) {
                actionColumn = `
                    <td> 
                        <button id="edit-btn" data-index="${index}"><i class="fa fa-edit"></i></button>
                        <button id="delete-btn" data-index="${index}"><i class="fa fa-trash"></i></button>
                    </td>
                `;
            }
            $('#contact-list').append(`
                <tr>
                    <td>${contact.name}</td>
                    <td>${contact.surname}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.address}</td>
                    ${actionColumn}
                </tr>
            `);
        });
    }

    // Edit & Save Contact
    $('#contact-list').on('click', '#edit-btn', function() {
        currentEditIndex = $(this).data('index'); // Retrieves index of selected contact
        const contact = contacts[currentEditIndex];
        $('#name').val(contact.name);
        $('#surname').val(contact.surname);
        $('#phone').val(contact.phone);
        $('#address').val(contact.address);
        $('#add-btn').hide();
        $('#save-btn').show();
        $('#contact-form-title').text('Edit Contact'); 
        displayContacts(); // Hide action column to prevent potential conflict during editing
    });

    function saveContact() {
        if (!validateForm()) return; // Validate form before saving the contact
        contacts[currentEditIndex] = {
            name: $('#name').val(),
            surname: $('#surname').val(),
            phone: $('#phone').val(),
            address: $('#address').val()
        };
        currentEditIndex = null;
        $('#contact-form-title').text('Add Contact'); 
        displayContacts();
        clearForm();
    }

    $('#save-btn').click(function(event) {
        event.preventDefault(); // Prevents page from reloading
        saveContact();
    });

    // Show Confirm Delete Message
    function showConfirmDelete() {
        $('#confirm-delete').removeClass('hidden').show();
        $('#contact-form-title').text('Contact Details');
        const contact = contacts[deleteIndex];
        // Populate contact details and set them to read-only
        $('#name').val(contact.name).prop('readonly', true);
        $('#surname').val(contact.surname).prop('readonly', true);
        $('#phone').val(contact.phone).prop('readonly', true);
        $('#address').val(contact.address).prop('readonly', true);
        $('#add-btn').hide();
    }

    // Hide Confirm Delete Message
    function hideConfirmDelete() {
        $('#confirm-delete').addClass('hidden').hide();
        clearForm();
        $('#contact-form-title').text('Add Contact');
        $('#add-btn').show();
        // Remove the read-only attribute when exiting delete confirmation
        $('#name, #surname, #phone, #address').prop('readonly', false);
    }

    // Delete Contact
    $('#contact-list').on('click', '#delete-btn', function () {
        deleteIndex = $(this).data('index'); 
        showConfirmDelete(deleteIndex);
    });

    $('#confirm-yes').click(function () { // Confirm Delete
        contacts.splice(deleteIndex, 1); 
        displayContacts();
        hideConfirmDelete()
    });

    $('#confirm-no').click(function () { // Prevent Deletion
        hideConfirmDelete();
    });

    // Search Contacts
    $('#search-bar').on('input', function () {
        const searchWord = $(this).val().toLowerCase();
        $('#contact-list').children().each(function () {
            const contact = contacts[$(this).find('#edit-btn').data('index')]; 
            const contactString = `${contact.name} ${contact.surname} ${contact.phone} ${contact.address}`.toLowerCase();
            $(this).toggle(contactString.includes(searchWord));
        });
    });
});
