export const openCloseDropdown = () => {
    const dropdownButtons = document.querySelectorAll('.dropdown_btn');

    function toggleDropdown(btn) {
        const dropdownContent = btn.nextElementSibling;
        dropdownContent.classList.toggle('active');
    };

    function closeOtherDropdowns(clickedButton) {
        dropdownButtons.forEach(btn => {
            if (btn !== clickedButton) btn.nextElementSibling.classList.remove('active');
        });
    };

    function focusableElements(btn) {
        const dropdownContent = btn.nextElementSibling;
        const focusableElements = dropdownContent.querySelectorAll('input, button, li, label');

        dropdownContent.classList.contains('active') ? 
        focusableElements.forEach(element => element.setAttribute('tabindex', '0')) : 
        focusableElements.forEach(element => element.setAttribute('tabindex', '-1'));
    };

    dropdownButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleDropdown(btn);
            closeOtherDropdowns(btn);
            focusableElements(btn);
        });
    });
};