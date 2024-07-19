document.addEventListener("DOMContentLoaded", function() {
    const circles = document.querySelectorAll('.link');
    const tooltip = document.getElementById('tooltip');

    circles.forEach(circle => {
        circle.addEventListener('mouseenter', function(event) {
            const imageSrc = event.target.getAttribute('data-image');
            const imageName = event.target.getAttribute('data-name');
            console.log(imageSrc)
            tooltip.innerHTML = `
            <img src="${imageSrc}" alt="Tooltip Image">
            <p>${imageName}</p>
            `;
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        });

        circle.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });

        circle.addEventListener('mousemove', function(event) {
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        });
    });
});