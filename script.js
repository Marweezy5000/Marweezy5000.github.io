// Pixel portrait: hops when clicked.
// Removing and re-adding the class restarts the animation on every click.
const avatar = document.querySelector(".avatar");
if (avatar) {
  avatar.addEventListener("click", () => {
    avatar.classList.remove("is-hopping");
    void avatar.offsetWidth; // forces the browser to notice the class was removed
    avatar.classList.add("is-hopping");
  });
  avatar.addEventListener("animationend", () => avatar.classList.remove("is-hopping"));
}
