const LeftBtn = document.querySelectorAll('.ScrollContainerBtn_FS button')[0];
const RightBtn = document.querySelectorAll('.ScrollContainerBtn_FS button')[1];

// Left button utility
LeftBtn.addEventListener('click', () => {
    document.querySelector('.ScrollContainer_FS').scrollBy({
        left: -500,
        behavior: 'smooth'
    });
});

// Right button utility
RightBtn.addEventListener('click', () => {
    document.querySelector('.ScrollContainer_FS').scrollBy({
        left: 500,
        behavior: 'smooth'
    });
});
