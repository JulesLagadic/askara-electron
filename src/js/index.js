console.log('👋 This message is being logged by "renderer.js", included via webpack');

const readButton = document.getElementById('readButton')
const writeButton = document.getElementById('writeButton')
const loginForm = document.getElementById('loginForm')
readButton.addEventListener('click', () => {
    window.electronAPI.readFile()
})
writeButton.addEventListener('click', () => {
    window.electronAPI.writeFile()
})
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let formData = $('form#loginForm').serializeArray();
    let data = {
        email:formData[0].value,
        password:formData[1].value
    }
    console.log(data);
    let request = $.ajax({
        type: 'POST',
        url: 'https://127.0.0.1:8000/api/login',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            console.log('success');
            window.electronAPI.login(response)
        }
    });
    request.fail(function () {
        alert('error');
    });
    return false;
})