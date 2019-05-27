function determ(matrice) {
    var det=0, colPremLigne, h, k, ligne, colonne;
    var temp = new Array(matrice.length-1);
    for(var i = 0; i < temp.length; i++){
        temp[i] = new Array(temp.length);
    }

    // Si matrice d'ordre 1
    if(matrice.length === 1) {
      return matrice[0][0];
    } 
    // Matrice d'ordre 2
    else if(matrice.length === 2) { 
      det=(matrice[0][0]*matrice[1][1]-matrice[0][1]*matrice[1][0]);
      return det;
    }
    // D'ordre 3 et plus 
    else {
      for(colPremLigne=0; colPremLigne<matrice.length; colPremLigne++) {
        h = 0;
        k = 0;
        for(ligne=1; ligne<matrice.length; ligne++) {
          for( colonne = 0; colonne < matrice.length; colonne++) { 
            if(colonne === colPremLigne) {
              continue;
            }
            temp[h][k] = matrice[ligne][colonne];
            k++;
            if(k === matrice.length-1) {
              h++;
              k = 0;
            }
          }
        }
        det+=matrice[0][colPremLigne]*Math.pow(-1,colPremLigne)*determ(temp);
      }
      return det;
    }
  }


document.querySelector("button").addEventListener("click", function() {
    var dimensions = Number(prompt("Dimensions de la matrice"));
    for(var i = 0; i < dimensions; i++){
        for(var j = 0; j < dimensions; j++) {
            document.getElementById("contenu").insertAdjacentHTML("beforeend", "<label>L"+(i+1)+"C"+(j+1)+"</label><input class=\"case\" value=\"\" maxlength=\"3\" size=\"2\" type=\"text\">");
        }
        document.getElementById("contenu").insertAdjacentHTML("beforeend", "<br>");
    }
    var calculer = document.createElement("button");
    calculer.addEventListener("click", function(){
        var cases = document.getElementsByClassName("case");
        var nombres = new Array(Math.sqrt(cases.length));
        for(var i = 0; i < nombres.length; i++) {
            nombres[i] = new Array(nombres.length);
        }
        var k = 0;
        for(var i = 0; i < nombres.length; i++) {
            for(var j = 0; j < nombres.length; j++) {
                nombres[i][j] = Number(cases[k].value);
                k++;
            }
        }
        var resultat = document.createElement("h3");
        resultat.textContent = "Determinant : " +  determ(nombres);
        document.getElementById("contenu").appendChild(resultat);
    });
    calculer.textContent = "Calculer";
    document.getElementById("contenu").appendChild(calculer);
});