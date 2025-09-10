document.getElementById("btnBuscar").addEventListener("click", () => {
    let input = document.getElementById("search");
    let valor = input.value.trim();

    if(valor !== ""){
         
        console.log("Buscando: " + valor);

         
        input.value = "";
    }
    
    
 
});