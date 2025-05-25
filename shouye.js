document.addEventListener('DOMContentLoaded', function() {
    const bookList = document.querySelector('.bookList');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const bookBoxes = document.querySelectorAll('.book-box');
    let currentIndex = 0;
    const boxWidth = 290 + 53;
    const visibleBoxes = window.innerWidth > 768 ? 3 :
        window.innerWidth > 480 ? 2 : 1;
    const maxIndex = Math.max(0, bookBoxes.length - visibleBoxes);
    const autoplaySpeed = 7400;
    let autoplayInterval;

    function startAutoplay() {
        if (bookBoxes.length > visibleBoxes) {
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
                updateSlidePosition();
            }, autoplaySpeed);
        }
    }
    startAutoplay();

    function updateSlidePosition() {
        bookList.style.transform = `translateX(-${currentIndex * boxWidth}px)`;
    }
    prevBtn.addEventListener('click', () => {
        clearInterval(autoplayInterval);
        currentIndex = (currentIndex <= 0) ? maxIndex : currentIndex - 1;
        updateSlidePosition();
        startAutoplay();
    });
    nextBtn.addEventListener('click', () => {
        clearInterval(autoplayInterval);
        currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
        updateSlidePosition();
        startAutoplay();
    });
    bookList.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    bookList.addEventListener('mouseleave', () => {
        startAutoplay();
    });
    window.addEventListener('resize', () => {
        const newVisibleBoxes = window.innerWidth > 768 ? 3 :
            window.innerWidth > 480 ? 2 : 1;

        if (newVisibleBoxes !== visibleBoxes) {
            currentIndex = 0;
            updateSlidePosition();
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const persons = document.querySelectorAll('.person');
    const introduces = document.querySelectorAll('.introduce');
    const firstPerson = persons[0];
    firstPerson.classList.add('active');
    const firstTargetId = firstPerson.dataset.target;
    document.getElementById(firstTargetId).classList.add('active');
    persons.forEach(person => {
        person.addEventListener('mouseover', function() {
            persons.forEach(p => p.classList.remove('active'));
            introduces.forEach(intro => intro.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.dataset.target;
            document.getElementById(targetId).classList.add('active');
        });
        person.addEventListener('mouseout', function() {
            if (!this.classList.contains('active')) return;
            setTimeout(() => {
                if (!persons[0].contains(document.elementFromPoint(event.clientX, event.clientY))) {
                    if (this !== persons[0]) {
                        this.classList.remove('active');
                        document.getElementById(this.dataset.target).classList.remove('active');
                        persons[0].classList.add('active');
                        document.getElementById(persons[0].dataset.target).classList.add('active');
                    }
                }
            }, 100);
        });
    });
});