let slideIndex = [];
let slideGroups = document.getElementsByClassName("slideshow-container");

for (let i = 0; i < slideGroups.length; i++) {
  slideIndex[i] = 1;
  showSlides(1, i);  // 初始化每个组
}

function plusSlides(n, groupNo) {
  showSlides(slideIndex[groupNo] += n, groupNo);
}

function showSlides(n, groupNo) {
  let slides = slideGroups[groupNo].getElementsByClassName("slide");
  if (slides.length === 0) return; // 如果组里没有图片，直接跳过

  if (n > slides.length) { slideIndex[groupNo] = 1 }
  if (n < 1) { slideIndex[groupNo] = slides.length }

  // 先全部隐藏
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // 显示当前的
  slides[slideIndex[groupNo] - 1].style.display = "block";
}

// 照片点击放大/缩小
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll(".photo img, .slide img");
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  document.body.appendChild(overlay);

  images.forEach(img => {
    img.addEventListener("click", function() {
      if (this.classList.contains("enlarged")) {
        // 已经放大 → 缩小
        this.classList.remove("enlarged");
        overlay.style.display = "none";
      } else {
        // 点击放大
        // 先把别的放大的取消
        document.querySelectorAll("img.enlarged").forEach(e => e.classList.remove("enlarged"));
        this.classList.add("enlarged");
        overlay.style.display = "block";
      }
    });
  });

  // 点击遮罩也能退出放大
  overlay.addEventListener("click", () => {
    document.querySelectorAll("img.enlarged").forEach(e => e.classList.remove("enlarged"));
    overlay.style.display = "none";
  });
});
