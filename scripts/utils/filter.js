const btnDrop = document.querySelectorAll('.dropdown_btn')

btnDrop.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.nextElementSibling.classList.toggle('active')
    })
})