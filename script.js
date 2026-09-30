function toggleAccount(id) {

  const content = document.getElementById(id);
  const button = content.previousElementSibling;

  content.classList.toggle("open");
  button.classList.toggle("active");

}
