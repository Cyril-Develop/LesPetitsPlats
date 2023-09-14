export const openCloseDropdown = () => {
    const dropdownButtons = document.querySelectorAll('.dropdown_btn');

    function toggleDropdown(button) {
        const dropdownContent = button.nextElementSibling;
        dropdownContent.classList.toggle('active');
    };

    function closeOtherDropdowns(clickedButton) {
        dropdownButtons.forEach(button => {
            if (button !== clickedButton) {
                button.nextElementSibling.classList.remove('active');
            }
        });
    };

    function focusableElements(button) {
        const dropdownContent = button.nextElementSibling;
        const focusableElements = dropdownContent.querySelectorAll('input, button, li, label');

        dropdownContent.classList.contains('active') ? 
        focusableElements.forEach(element => element.setAttribute('tabindex', '0')) : 
        focusableElements.forEach(element => element.setAttribute('tabindex', '-1'));

    };

    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleDropdown(button);
            closeOtherDropdowns(button);
            focusableElements(button)
        });
    });
};