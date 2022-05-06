const inpFile = document.getElementById("inpFile");
const previewContainer = document.getElementById("filePreview");
const previewImage = previewContainer.querySelector(".file-Preview__image");
const previewDefaultText = previewContainer.querySelector(
  ".file-preview__default-text"
);
const x = document.querySelector(".x");

inpFile.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    previewDefaultText.style.display = "none";
    previewImage.style.display = "block";
    x.style.display = "block";
    reader.readAsDataURL(file);
  } else {
    previewDefaultText.style.display = null;
    previewImage.style.display = null;
    x.style.display = null;
    previewImage.setAttribute("src", "");
  }
});

x.addEventListener("click", function (e) {
  previewDefaultText.style.display = null;
  previewImage.style.display = null;
  x.style.display = null;
  previewImage.setAttribute("src", "");
});
