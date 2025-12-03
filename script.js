
function toggleForms(event) {
    if (event) {
        event.preventDefault();
    }
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');

    console.log('toggleForms called', { registerDisplay: registerBox && registerBox.style.display, registerHasHidden: registerBox && registerBox.classList.contains('hidden') });
    const regHidden = registerBox.style.display === 'none' || registerBox.classList.contains('hidden');
    if (regHidden) {
        registerBox.style.display = 'block';
        registerBox.classList.remove('hidden');
        loginBox.style.display = 'none';
        loginBox.classList.add('hidden');
    } else {
        registerBox.style.display = 'none';
        registerBox.classList.add('hidden');
        loginBox.style.display = 'block';
        loginBox.classList.remove('hidden');
    }
}

 
document.addEventListener('DOMContentLoaded', function () {
    const registerBox = document.getElementById('registerBox');
    const loginBox = document.getElementById('loginBox');
    const regPassword = document.getElementById('regPassword');
    const toggleBtn = document.querySelector('.toggle-password');

    if (registerBox) {
        registerBox.classList.add('hidden');
        registerBox.style.display = 'none';
    }
    if (loginBox) {
        loginBox.classList.remove('hidden');
        loginBox.style.display = 'block';
    }

    if (toggleBtn) toggleBtn.style.display = 'none';

    if (regPassword && toggleBtn) {
        regPassword.addEventListener('focus', function () { toggleBtn.style.display = 'block'; });
        regPassword.addEventListener('blur', function () { if (!regPassword.value) toggleBtn.style.display = 'none'; });
        regPassword.addEventListener('input', function () { toggleBtn.style.display = regPassword.value ? 'block' : 'none'; });
    }

    const loginToRegisterBtn = document.querySelector('#loginBox .link-button');
    const registerToLoginBtn = document.querySelector('#registerBox .link-button');

    function showRegister() { if (registerBox) { registerBox.style.display = 'block'; registerBox.classList.remove('hidden'); } if (loginBox) { loginBox.style.display = 'none'; loginBox.classList.add('hidden'); } }
    function showLogin() { if (registerBox) { registerBox.style.display = 'none'; registerBox.classList.add('hidden'); } if (loginBox) { loginBox.style.display = 'block'; loginBox.classList.remove('hidden'); } }

    if (loginToRegisterBtn) { loginToRegisterBtn.addEventListener('click', function (e) { console.log('loginToRegisterBtn clicked', e); e.preventDefault(); showRegister(); }); }
    if (registerToLoginBtn) { registerToLoginBtn.addEventListener('click', function (e) { console.log('registerToLoginBtn clicked', e); e.preventDefault(); showLogin(); }); }
});

 
function togglePassword() {
    const passwordInput = document.getElementById('regPassword');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

 
function register() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const role = document.getElementById('role').value;

    
    if (firstName === '') {
        alert('First Name is required!');
        return;
    }
    
    if (email === '') {
        alert('Email Address is required!');
        return;
    }
    
    if (password === '') {
        alert('Password is required!');
        return;
    }
    
    if (role === '') {
        alert('Please select a role!');
        return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some(user => user.email === email)) {
        alert('Email already registered! Please login or use a different email.');
        return;
    }

    
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role
    };

    
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('role').value = '';
    document.getElementById('regPassword').type = 'password';
    document.getElementById('eyeIcon').textContent = '👁️';

    alert('Registration Successful! Please login with your credentials.');
    toggleForms(new Event('click'));
}

 
function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email === '' || password === '') {
        alert('Please enter email and password!');
        return;
    }

    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Login Successful! Welcome ${user.firstName}!`);
        
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('remember').checked = false;
    } else {
        
        const emailExists = users.some(u => u.email === email);
        if (emailExists) {
            alert('Incorrect password! Please try again.');
        } else {
            alert('Account not registered. Please register yourself.');
        }
    }
}
