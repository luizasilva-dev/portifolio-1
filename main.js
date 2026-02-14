// selesiona todos os itenis do menu
const menuItems = document.querySelector (".menu li")

// percorre cada item
menuItems.forEach(item => {
    
    item.addEvenListener("Click", () => {

//remove "ativo" de todos
menuItems.forEach( li => li.classList.remove("ativo"));

//Adiciona no clicado
item.classList.add("ativo");
    });
);