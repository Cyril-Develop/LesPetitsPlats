export const openCloseFilter = () => {
    const dropdownButtons = document.querySelectorAll('.dropdown_btn');

    function toggleDropdown(button) {
        const dropdown = button.nextElementSibling;
        dropdown.classList.toggle('active');
    };

    function closeOtherDropdowns(clickedButton) {
        dropdownButtons.forEach(button => {
            if (button !== clickedButton) {
                button.nextElementSibling.classList.remove('active');
            }
        });
    };

    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleDropdown(button);
            closeOtherDropdowns(button);
        });
    });
};