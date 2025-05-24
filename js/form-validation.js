$(document).ready(function() {

    // Function to validate a generic form field
    function validateField($field, $errorElement, errorMessage) {
        if ($field.val().trim() === '') {
            $errorElement.text(errorMessage).removeClass('hidden');
            $field.addClass('border-red-500');
            return false;
        } else {
            $errorElement.addClass('hidden');
            $field.removeClass('border-red-500');
            return true;
        }
    }

    // Function to validate a field against a pattern
    function validateFieldWithPattern($field, $errorElement, defaultMessage) {
        const pattern = new RegExp($field.attr('pattern'));
        if ($field.val().trim() === '') {
            $errorElement.text(defaultMessage || 'This field is required.').removeClass('hidden');
            $field.addClass('border-red-500');
            return false;
        } else if (!pattern.test($field.val())) {
            // Error message for pattern is typically in the HTML, so just reveal it
            $errorElement.removeClass('hidden');
            $field.addClass('border-red-500');
            return false;
        } else {
            $errorElement.addClass('hidden');
            $field.removeClass('border-red-500');
            return true;
        }
    }

    // --- Registration Form Validation ---
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Clear previous errors for this form
        $(this).find('.text-red-500').addClass('hidden');
        $(this).find('input, select').removeClass('border-red-500');

        // Full Name Validation
        const $fullName = $('#fullName');
        if (!validateField($fullName, $('#fullNameError'), 'Full Name is required.')) {
            isValid = false;
        }

        // Email Validation
        const $email = $('#email');
        if ($email.val().trim() === '') {
            $('#emailError').text('Email is required.').removeClass('hidden');
            $email.addClass('border-red-500');
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test($email.val())) { // Basic email regex
            $('#emailError').text('Please enter a valid email address.').removeClass('hidden');
            $email.addClass('border-red-500');
            isValid = false;
        }

        // Phone Number Validation (using pattern attribute)
        const $phone = $('#phone');
        if (!validateFieldWithPattern($phone, $('#phoneError'), 'Phone Number is required.')) {
            isValid = false;
        }

        // Password Validation (using pattern attribute)
        const $password = $('#password');
        if (!validateFieldWithPattern($password, $('#passwordError'), 'Password is required.')) {
            isValid = false;
        }

        // Confirm Password Validation
        const $confirmPassword = $('#confirmPassword');
        if ($confirmPassword.val().trim() === '') {
            $('#confirmPasswordError').text('Confirm Password is required.').removeClass('hidden');
            $confirmPassword.addClass('border-red-500');
            isValid = false;
        } else if ($password.val() !== $confirmPassword.val()) {
            $('#confirmPasswordError').removeClass('hidden'); // Message from HTML
            $confirmPassword.addClass('border-red-500');
            isValid = false;
        }


        if (isValid) {
            // Form is valid
            $('#formSuccess').removeClass('hidden');
            $('#formError').addClass('hidden');
            console.log('Registration Form submitted successfully!', $(this).serializeArray());
            // In a real application, you'd send this data to your Node.js backend
            // this.reset(); // Uncomment to reset form after successful submission
        } else {
            // Form is invalid
            $('#formError').removeClass('hidden');
            $('#formSuccess').addClass('hidden');
            console.log('Registration Form has validation errors.');
        }
    });


    // --- Sponsor Form Validation ---
    $('#sponsorForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Clear previous errors for this form
        $(this).find('.text-red-500').addClass('hidden');
        $(this).find('input, select').removeClass('border-red-500');

        // Company Name Validation
        const $companyName = $('#companyName');
        if (!validateField($companyName, $('#companyNameError'), 'Company Name is required.')) {
            isValid = false;
        }

            // Contact Person Validation
        const $contactPerson = $('#contactPerson');
        const contactPersonVal = $contactPerson.val().trim();

        if (contactPersonVal === '') {
            $('#contactPersonError').text('Contact Person Name is required.').removeClass('hidden');
            $contactPerson.addClass('border-red-500');
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(contactPersonVal)) {
            $('#contactPersonError').text('Only alphabets and spaces are allowed.').removeClass('hidden');
            $contactPerson.addClass('border-red-500');
            isValid = false;
        }


        const $contactEmail = $('#contactEmail');
        const emailVal = $contactEmail.val().trim();

        if (emailVal === '') {
            $('#contactEmailError').text('Contact Email is required.').removeClass('hidden');
            $contactEmail.addClass('border-red-500');
            isValid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailVal)) {
            $('#contactEmailError').text('Please enter a valid email address.').removeClass('hidden');
            $contactEmail.addClass('border-red-500');
            isValid = false;
        }


            // Contact Phone Validation (using pattern attribute)
        const $contactPhone = $('#contactPhone');
        const phoneVal = $contactPhone.val().trim();

            // Custom validation logic
        if (phoneVal === '') {
            $('#contactPhoneError').text('Contact Phone Number is required.').removeClass('hidden');
            $contactPhone.addClass('border-red-500');
            isValid = false;
        } else if (!/^\+\d{10,15}$/.test(phoneVal)) {
            $('#contactPhoneError').text("Phone number must start with '+' and contain 10 to 15 digits.").removeClass('hidden');
            $contactPhone.addClass('border-red-500');
            isValid = false;
        }


        // Sponsorship Category Validation for radio buttons
        const $sponsorshipCategory = $('input[name="sponsorshipCategory"]:checked');
        if ($sponsorshipCategory.length === 0) {
            $('#sponsorshipCategoryError').text('Please select a sponsorship category.').removeClass('hidden');
            isValid = false;
        } else {
            $('#sponsorshipCategoryError').addClass('hidden');
        }



        if (isValid) {
            // Form is valid
            $('#sponsorFormSuccess').removeClass('hidden');
            $('#sponsorFormError').addClass('hidden');
            console.log('Sponsor Form submitted successfully!', $(this).serializeArray());
            document.getElementById('sponsorForm').reset();

            // In a real application, you'd send this data to your Node.js backend
            // this.reset(); // Uncomment to reset form after successful submission
        } else {
            // Form is invalid
            $('#sponsorFormError').removeClass('hidden');
            $('#sponsorFormSuccess').addClass('hidden');
            console.log('Sponsor Form has validation errors.');
        }
    });

});