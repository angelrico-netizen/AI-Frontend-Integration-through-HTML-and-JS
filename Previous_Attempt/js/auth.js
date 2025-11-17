function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) { alert('Enter email & password'); return; }
    alert(`SignIn attempted for ${email}. Connect to backend here.`);
}

function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    if (password !== confirm) { alert('Passwords do not match'); return; }
    alert(`SignUp attempted for ${email}. Connect to backend here.`);
}

function sendResetCode() {
    const email = document.getElementById('email').value;
    if (!email) { alert('Enter email'); return; }
    alert(`Password reset requested for ${email}. Connect to backend here.`);
}
