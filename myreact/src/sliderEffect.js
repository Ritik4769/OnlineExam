function initializeSlider() {
    var lastScrollTop = 0;
    window.addEventListener("scroll", function () {
        if (document.getElementById("text-image-scroll") !== null) {
            var windowWidth = window.innerWidth;
            if (windowWidth > 767) {
                var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                var windowBottom = windowTop + window.innerHeight;

                var scrollSterTop = document.getElementById("text-image-scroll").offsetTop - 60;
                var scrollSterBottom = scrollSterTop + document.getElementById("text-image-scroll").offsetHeight;
                var textWrapperHeight = document.getElementById("text-wrapper").offsetHeight;

                if (windowTop > scrollSterTop) {
                    document.getElementById("images-wrapper").classList.add("images-wrapper-fixed");
                } else {
                    document.getElementById("images-wrapper").classList.remove("images-wrapper-fixed");
                }

                if (windowBottom > scrollSterBottom) {
                    document.getElementById("images-wrapper").classList.remove("images-wrapper-fixed");
                    document.getElementById("images-wrapper").classList.add("images-wrapper-fixed-stop");
                } else {
                    document.getElementById("images-wrapper").classList.remove("images-wrapper-fixed-stop");
                }

                if (
                    document.getElementById("images-wrapper").classList.contains("images-wrapper-fixed") &&
                    windowBottom < scrollSterBottom - 30
                ) {
                    var imageWrapperWidth = document.getElementById("images-wrapper").offsetWidth * 2;
                    var scrolled = windowTop - scrollSterTop;
                    var percScrolledOfScrollSter = scrolled / textWrapperHeight;
                    var pxOfImageWrapper = imageWrapperWidth * percScrolledOfScrollSter;
                    var minus = Math.abs(pxOfImageWrapper) * -1;
                    document.querySelectorAll(".images").forEach(function (image) {
                        image.style.right = minus + "px";
                    });
                }
                lastScrollTop = windowTop;
            }
        }
    });
}

export { initializeSlider };
