const contentTarget = document.querySelector('.navigation')

export const renderNavigation = () => {
    contentTarget.innerHTML = `
        <img class="nav__logo" src="../../styles/images/peanut.svg">
        <div class="nav__title">Nutshell</div>
    `
}