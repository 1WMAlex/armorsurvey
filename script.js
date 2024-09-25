document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.survey-page');
    let currentPage = 0;

    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            page.classList.remove('active');
            if (index === pageIndex) {
                page.classList.add('active');
            }
        });
    }

    function updatePage(direction) {
        if (direction === 'next' && validatePage(currentPage)) {
            currentPage++;
        } else if (direction === 'prev') {
            currentPage--;
        }
        showPage(currentPage);
    }

    function validatePage(pageIndex) {
        const page = pages[pageIndex];
        const inputs = page.querySelectorAll('input[required], textarea[required]');
        for (let input of inputs) {
            if (input.type === 'radio' || input.type === 'checkbox') {
                const name = input.name;
                const checked = page.querySelectorAll(`input[name="${name}"]:checked`);
                if (checked.length === 0) {
                    alert('Please answer all required questions.');
                    return false;
                }
            } else if (!input.value) {
                alert('Please answer all required questions.');
                return false;
            }
        }
        return true;
    }

    // Initial display
    showPage(currentPage);

    // Event listeners for buttons
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');

    nextButtons.forEach(button => {
        button.addEventListener('click', () => updatePage('next'));
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => updatePage('prev'));
    });

    // Form submission
    const form = document.getElementById('survey-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validatePage(currentPage)) {
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                if (data[key]) {
                    if (!Array.isArray(data[key])) {
                        data[key] = [data[key]];
                    }
                    data[key].push(value);
                } else {
                    data[key] = value;
                }
            });
            console.log('Survey Data:', data);
            alert('Thank you for completing the survey!');
            form.reset();
            currentPage = 0;
            showPage(currentPage);
        }
    });
});
