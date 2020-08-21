const $bar = document.querySelector(".circle-bar");
const $circle = document.querySelector(".circle");
const $container = document.querySelector(".circle-container");

const circleRadius = 320 / 2;
const circleBorderWidth = 10;
const barRadius = 15;

function init() {
    let isDrag = false;
    let mouseOffset = { x: 0, y: 0 };
    $bar.addEventListener("mousedown", (e) => {
        isDrag = true;
        mouseOffset = getMouseOffset(e);
    });

    window.addEventListener("mousemove", (e) => {
        // console.log(mouseOffset);
        if (!isDrag) {
            return;
        }
        const eventOffsetX =
            e.clientX - mouseOffset.x - $container.offsetLeft - circleRadius;
        const eventOffsetY =
            -(e.clientY - mouseOffset.y - $container.offsetTop - circleRadius);
        const radian = Math.atan2(eventOffsetY, eventOffsetX);
        const x = Math.cos(radian) * (circleRadius - circleBorderWidth / 2);
        const y = Math.sin(radian) * (circleRadius - circleBorderWidth / 2);
        $bar.style.left = x - barRadius + circleRadius + "px";
        $bar.style.top = circleRadius - (y + barRadius) + "px";

        updateContent(radian);
    });

    window.addEventListener("mouseup", (e) => {
        isDrag = false;
    });
}

function updateContent(radian) {
    let angle = radian * (180 / Math.PI);
    if (angle > -180 && angle <= 90) {
        angle = 90 - angle;
    } else {
        angle = 360 - (angle - 90);
    }

    $circle.textContent = Math.floor(angle);
}

function getMouseOffset(e) {
    const mouseOffsetX =
        e.clientX -
        $container.offsetLeft -
        e.currentTarget.offsetLeft -
        barRadius;
    const mouseOffsetY = -(
        e.clientY -
        $container.offsetTop -
        e.currentTarget.offsetTop -
        barRadius
    );
    return { x: mouseOffsetX, y: mouseOffsetY };
}

init();
