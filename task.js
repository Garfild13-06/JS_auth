const signin = document.querySelector('.signin');
const signinForm = document.forms[0];
document.querySelector('.quit').addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})

const user_id = localStorage.getItem('user_id')
if (user_id != null) {
    signin.classList.remove('signin_active');
    const welcome = document.querySelector('.welcome');
    welcome.classList.add('welcome_active');
    welcome.querySelector('#user_id').innerText = user_id;
    welcome.querySelector('.quit').addEventListener('click', () => {
    })
} else {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const login = signinForm.getElementsByTagName('input').namedItem('login');
        const pass = signinForm.getElementsByTagName('input').namedItem('password');

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == xhr.DONE) {
                // console.log(JSON.parse(xhr.responseText));
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    signin.classList.remove('signin_active');
                    const welcome = document.querySelector('.welcome');
                    welcome.classList.add('welcome_active');
                    welcome.querySelector('#user_id').innerText = response['user_id'];
                    localStorage.setItem('user_id', response['user_id'])
                } else {
                    login.value = '';
                    pass.value = ''
                    alert('Неверный логин/пароль')
                }
            }
        })

        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
        xhr.setRequestHeader('Content-Type', 'application/json');
        const data = {
            login: login.value,
            password: pass.value
        }
        const jsonData = JSON.stringify(data);
        xhr.send(jsonData);
    })
}
