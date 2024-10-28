class AuthSystem {
    constructor() {
        this.username = document.getElementById('username');
        this.password = document.getElementById('password');
        this.email = document.getElementById('email');
        this.phonenum = document.getElementById('phonenum');
        this.score = 5000

        this.errorElement = document.getElementById('error');
        this.form = document.getElementById('form');

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Register function to store user data in local storage
    register() {
        const userData = {
            username: this.username.value,
            password: this.password.value,
            email: this.email.value,
            phonenum: this.phonenum.value,
            score: this.score.valueOf()
        };

        if (JSON.stringify(userData) === localStorage.getItem('user')) {
            console.log('User Already exists')
        } else {
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('Registration successful!');
        }
    }

    // Login function to validate against stored data
    login() {
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (!storedUser) {
            console.log('No user found. Please register first.');
            return false;
        }

        if ((storedUser.username === this.username.value) && (storedUser.password === this.password.value) && 
        (storedUser.email === this.email.value) && (storedUser.phonenum === this.phonenum.value)) {
            console.log('Login successful!');

            sessionStorage.setItem('loggedInUser', JSON.stringify({
                username: storedUser.username
            }));

            return true;
        }
        
        else {
            console.log('Invalid details');
            return false;
        }
    }

    // Function to handle form submission
    handleSubmit(e) {
        let messages = [];

        // Username validation
        if (this.username.value === '' || this.username.value === null) {
            messages.push('Username is empty');
        } else if (this.username.value.length < 4) {
            messages.push('Username is too short (< 4)');
        } else if (this.username.value.length > 30) {
            messages.push('Username is too long (> 30)');
        }

        // Password validation
        if (this.password.value === '' || this.password.value === null) {
            messages.push('Password is empty');
        } else if (this.password.value.length < 6) {
            messages.push('Password is too short (< 6)');
        } else if (this.password.value.length > 30) {
            messages.push('Password is too long (> 30)');
        }

        // Email validation
        if (this.email && (this.email.value === '' || this.email.value === null)) {
            messages.push('Email is empty');
        } else if (this.email && this.email.value.length < 16) {
            messages.push('Email is too short (< 16)');
        }

        // Phone number validation
        if (this.phonenum && (this.phonenum.value === '' || this.phonenum.value === null)) {
            messages.push('Phone Number is empty');
        } else if (this.phonenum && isNaN(this.phonenum.value)) {
            messages.push('Phone Number is not a number');
        } else if (this.phonenum && this.phonenum.value.length > 13) {
            messages.push('Phone Number is too long (> 13)');
        } else if (this.phonenum && this.phonenum.value.length < 10) {
            messages.push('Phone Number is too short (< 10)');
        }

        // Error handling
        if (messages.length > 0) {
            e.preventDefault();
            this.errorElement.innerText = messages.join('\n');
        } else {
            e.preventDefault(); // Prevent the form from submitting
            if (e.submitter.id === 'register') {
                this.register();
            } else if (e.submitter.id === 'login') {
                this.login();
            }
        }
    }
}

// Initialize the AuthSystem class
document.addEventListener('DOMContentLoaded', () => {
    new AuthSystem();
});
