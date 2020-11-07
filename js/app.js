// Variables

const $btnSend = document.querySelector('#enviar')
const $btnReset = document.querySelector('#resetBtn')
const $form = document.querySelector('#enviar-mail')

const $email = document.querySelector('#email')
const $subject = document.querySelector('#asunto')
const $message = document.querySelector('#mensaje')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

bindEvents()

function bindEvents() {
    document.addEventListener('DOMContentLoaded', initApp)

    $email.addEventListener('blur', formValidation)
    $subject.addEventListener('blur', formValidation)
    $message.addEventListener('blur', formValidation)

    $form.addEventListener('submit', sendMail)
    $btnReset.addEventListener('click', resetForm)
}

// Functions

function initApp() {
    $btnSend.disabled = true
    $btnSend.classList.add('cursor-not-allowed', 'opacity-50')
}

function formValidation(e) {
    if(e.target.value.length > 0) {
        const error = document.querySelector('p.error')
        if(error) {
            error.remove()
        }

        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
    } else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')
        
        showError('Todos los campos son obligatorios')
    }

    if(e.target.type === 'email') {
        if(er.test(e.target.value)) {
            const error = document.querySelector('p.error')
            if(error) {
                error.remove()
            }

            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
        } else {
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')

            showError('Email no válido')
        }
    }

    if(er.test($email.value) && $subject.value !== '' && $message.value !== '') {
        $btnSend.disabled = false
        $btnSend.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function showError(message) {
    const errorMessage = document.createElement('p')
    errorMessage.textContent = message
    errorMessage.classList.add('border', 'border-red-500', 'bg-red-500', 'text-white', 'p-3', 'my-5', 'text-center', 'error')

    const errors = document.querySelectorAll('.error')
    if(errors.length === 0) {
        $form.insertBefore(errorMessage, document.querySelector('#spinner'))

        setTimeout(() => {
            errorMessage.remove()
        }, 5000)
    }
}

function sendMail(e) {
    e.preventDefault()

    const $spinner = document.querySelector('#spinner')
    $spinner.style.display = 'flex'

    setTimeout(() => {
        $spinner.style.display = 'none'
        const messageSuccess = document.createElement('p')
        messageSuccess.textContent = 'Mensaje enviado correctamente'
        messageSuccess.classList.add('border', 'border-green-500', 'bg-green-500', 'text-white', 'p-3', 'my-5', 'text-center')

        $form.insertBefore(messageSuccess, $spinner)

        setTimeout(() => {
            messageSuccess.remove()

            resetForm()
        }, 5000)
    }, 3000)
}


function resetForm(e) {
    e.preventDefault()
    
    $form.reset()
    initApp()
}