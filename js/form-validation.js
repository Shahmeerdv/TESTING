$(document).ready(function () {

    // Utility: Validate required field
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

    // Utility: Validate field with pattern
    function validateFieldWithPattern($field, $errorElement, defaultMessage) {
        const pattern = new RegExp($field.attr('pattern'));
        if ($field.val().trim() === '') {
            $errorElement.text(defaultMessage || 'This field is required.').removeClass('hidden');
            $field.addClass('border-red-500');
            return false;
        } else if (!pattern.test($field.val())) {
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
        $('#registrationForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // Clear previous errors
        $(this).find('.text-red-500').addClass('hidden');
        $(this).find('input, select').removeClass('border-red-500');

        // Full Name
        const $fullName = $('#fullName');
        if (!validateField($fullName, $('#fullNameError'), 'Full Name is required.')) isValid = false;

        // Email
        const $email = $('#email');
        const emailVal = $email.val().trim();
        if (emailVal === '') {
            $('#emailError').text('Email is required.').removeClass('hidden');
            $email.addClass('border-red-500');
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(emailVal)) {
            $('#emailError').text('Please enter a valid email address.').removeClass('hidden');
            $email.addClass('border-red-500');
            isValid = false;
        }

        // Phone
        const $phone = $('#phone');
        if (!validateFieldWithPattern($phone, $('#phoneError'), 'Phone Number is required.')) isValid = false;

        // Institution
        const $institution = $('#Instution');
        if (!validateFieldWithPattern($institution, $('#instituteError'), 'Institute name is required.')) isValid = false;

        // Student ID
        const $student_id = $('#student_id');
        if (!validateFieldWithPattern($student_id, $('#studentIdError'), 'Student ID is required.')) isValid = false;

        // --- FIXED VALIDATION: Only one of technical or non-technical must be selected ---
        let technicalVal = '';
        let nontechnicalVal = '';

        const $technicalDropdown = $('#technicalSelect');
        const $nontechnicalDropdown = $('#nontechnicalSelect');

        if (!$technicalDropdown.prop('disabled')) {
            technicalVal = $technicalDropdown.val().trim();
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
        

        // Validation logic
        if ((technicalVal && nontechnicalVal) || (!technicalVal && !nontechnicalVal)) {
            $('#technicalError').text('*Select only one: Technical OR Non-Technical event').removeClass('hidden');
            $('#nontechnicalError').text('*Select only one: Technical OR Non-Technical event').removeClass('hidden');
            $('#technicalSelect, #nontechnicalSelect').addClass('border-red-500');
            isValid = false;
        } else {
            $('#technicalError').addClass('hidden');
            $('#nontechnicalError').addClass('hidden');
            $('#technicalSelect, #nontechnicalSelect').removeClass('border-red-500');
        }

        // --- Submit if valid ---
        if (isValid) {
            const selectedCategory = $('input[name="category"]:checked').val();
            const selectedEvent = selectedCategory === 'technical'
                ? technicalVal
                : nontechnicalVal;

            const registrationData = {
                fullName: $fullName.val(),
                email: $email.val(),
                phone: $phone.val(),
                institution: $institution.val(),
                studentId: $student_id.val(),
                category: selectedCategory,
                event: selectedEvent,
                optionalEvent: $('#optionalEvent').val() || null
            };

            $.ajax({
                url: 'http://localhost:3000/submit-registration',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(registrationData),
                success: function () {
                    $('#formSuccess').removeClass('hidden');
                    $('#formError').addClass('hidden');
                    $('#registrationForm')[0].reset();
                },
                error: function () {
                    $('#formError').removeClass('hidden');
                    $('#formSuccess').addClass('hidden');
                }
            });
        } else {
            $('#formError').removeClass('hidden');
            $('#formSuccess').addClass('hidden');
            console.log('❌ Registration Form has validation errors.');
        }

        // Debug log
        console.log('✅ Validating form...');
        console.log('Full Name:', $fullName.val());
        console.log('Email:', $email.val());
        console.log('Phone:', $phone.val());
        console.log('Institution:', $institution.val());
        console.log('Student ID:', $student_id.val());
        console.log('Tech:', technicalVal, 'Non-Tech:', nontechnicalVal);
    });


    // --- Sponsor Form Validation ---
    $('#sponsorForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        $(this).find('.text-red-500').addClass('hidden');
        $(this).find('input, select, textarea').removeClass('border-red-500');

        const $companyName = $('#companyName');
        const $contactPerson = $('#contactPerson');
        const $contactEmail = $('#contactEmail');
        const $contactPhone = $('#contactPhone');
        const $sponsorshipCategory = $('input[name="sponsorshipCategory"]:checked');

        if (!validateField($companyName, $('#companyNameError'), 'Company Name is required.')) isValid = false;

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

        const contactEmailVal = $contactEmail.val().trim();
        if (contactEmailVal === '') {
            $('#contactEmailError').text('Contact Email is required.').removeClass('hidden');
            $contactEmail.addClass('border-red-500');
            isValid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contactEmailVal)) {
            $('#contactEmailError').text('Please enter a valid email address.').removeClass('hidden');
            $contactEmail.addClass('border-red-500');
            isValid = false;
        }

        const contactPhoneVal = $contactPhone.val().trim();
        if (contactPhoneVal === '') {
            $('#contactPhoneError').text('Contact Phone Number is required.').removeClass('hidden');
            $contactPhone.addClass('border-red-500');
            isValid = false;
        } else if (!/^\+\d{10,15}$/.test(contactPhoneVal)) {
            $('#contactPhoneError').text("Phone number must start with '+' and contain 10 to 15 digits.").removeClass('hidden');
            $contactPhone.addClass('border-red-500');
            isValid = false;
        }

        if ($sponsorshipCategory.length === 0) {
            $('#sponsorshipCategoryError').text('Please select a sponsorship category.').removeClass('hidden');
            isValid = false;
        }

        if (isValid) {
            const sponsorData = {
                companyName: $companyName.val(),
                contactPerson: $contactPerson.val(),
                contactEmail: $contactEmail.val(),
                contactPhone: $contactPhone.val(),
                sponsorshipCategory: $sponsorshipCategory.val(),
                message: $('#message').val()
            };

            $.ajax({
                url: 'http://localhost:3000/submit-sponsor',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(sponsorData),
                success: function () {
                    $('#sponsorFormSuccess').removeClass('hidden');
                    $('#sponsorFormError').addClass('hidden');
                    $('#sponsorForm')[0].reset();
                },
                error: function () {
                    $('#sponsorFormError').removeClass('hidden');
                    $('#sponsorFormSuccess').addClass('hidden');
                }
            });
        } else {
            $('#sponsorFormError').removeClass('hidden');
            $('#sponsorFormSuccess').addClass('hidden');
            console.log('Sponsor Form has validation errors.');
        }
    });


    // --- Admin Sign Up Validation ---
    $('#adminSignUpForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const $email = $('#adminSignUpEmail');
        const $password = $('#adminSignUpPassword');

        if (!validateEmail($email, $('#adminSignUpEmailError'))) isValid = false;
        if (!validatePassword($password, $('#adminSignUpPasswordError'))) isValid = false;

        if (isValid) {
            console.log('Admin Sign Up Form is valid');
        }
    });

    // --- Admin Sign In Validation ---
    $('#adminSignInForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const $email = $('#adminSignInEmail');
        const $password = $('#adminSignInPassword');

        if (!validateEmail($email, $('#adminSignInEmailError'))) isValid = false;
        if (!validateField($password, $('#adminSignInPasswordError'), 'Password is required.')) isValid = false;

        if (isValid) {
            console.log('Admin Sign In Form is valid');
        }
    });

    // --- Student Sign Up Validation ---
    $('#signUpForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const $name = $('#signupName');
        const $email = $('#signupEmail');
        const $password = $('#signupPassword');

        if (!validateField($name, $('#signupNameError'), 'Name is required.')) isValid = false;
        if (!validateEmail($email, $('#signupEmailError'))) isValid = false;
        if (!validatePassword($password, $('#signupPasswordError'))) isValid = false;

        if (isValid) {
            console.log('Student Sign Up Form is valid');
        }
    });

    // --- Student Sign In Validation ---
    $('#signInForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const $email = $('#signInEmail');
        const $password = $('#signInPassword');

        if (!validateEmail($email, $('#signInEmailError'))) isValid = false;
        if (!validateField($password, $('#signInPasswordError'), 'Password is required.')) isValid = false;

        if (isValid) {
            console.log('Student Sign In Form is valid');
        }
    });

    // --- Extra Utility Functions ---
    function validateEmail($field, $errorElement) {
        const value = $field.val().trim();
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (value === '') {
            $errorElement.text('Email is required.').show();
            $field.addClass('input-error');
            return false;
        } else if (!emailRegex.test(value)) {
            $errorElement.text('Please enter a valid email address.').show();
            $field.addClass('input-error');
            return false;
        } else {
            $errorElement.hide();
            $field.removeClass('input-error');
            return true;
        }
    }

    function validatePassword($field, $errorElement, minLength = 6) {
        const value = $field.val();
        if (value.length < minLength) {
            $errorElement.text(`Password must be at least ${minLength} characters.`).show();
            $field.addClass('input-error');
            return false;
        } else {
            $errorElement.hide();
            $field.removeClass('input-error');
            return true;
        }
    }

});
