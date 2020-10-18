
var taille;   //variable représentant la taille du jeu n dujeu
var limit;  //variable représentant à quel valeure on gagne le jeu
var score;         //variable représentant le score du jeu
var movecount;     //variable représentant l'élément movecount  du jeu
var winningscore;  //variable représentant le score que l'ont a au moment de la victoire
var state="playing";    //variable d'etat pour savoir si on a gagné ou pas encore. Il est soit "playing" soit "winning".
var moves=0;      //variable qui compte le nombre de déplacement
 
function beginGame(){

/* Cette fonction crée le jeu de départ, elle est aussi appelée pour recommencer un nouveau jeu. 
* Elle est toujours directement appelé directement dans le code html des boutons(ligne 23,ligne 33, ligne 37).
*/

    winboard= document.getElementById("winningBoard");
    
    winboard.style.height="100%";  //réinitialise la taille du bloc pour le message du gagnant
    winboard.style.width="100%";
    winboard.style.fontSize="100%";
    winboard.style.visibility="hidden";  //rend le div pour l'affichage gagnant invisible
    
    
    lostboard= document.getElementById("losingBoard");
    
    
    lostboard.style.height="100%";  //réinitialise la taille du bloc pour le message du perdant
    lostboard.style.width="100%";
    lostboard.style.fontSize="100%";
    lostboard.style.visibility="hidden";  //rend le div pour l'affichage perdant invisible
    
    score=document.getElementById("score");
    score.textContent=0;                 //remet le score à 0
    
    movecount=document.getElementById("movecount");
    movecount.textContent=0;
    
    winningscore= document.getElementById("winningScore");
    winningscore.textContent="Score:";   //réinitialise la valeure du winningscore
    
    moves=0;
    
    state="playing";                      //réinitialise l'état du jeu
        
    create();                              //crée le jeu
}

function create(){
/* La fonction crée le jeu dans le div id="game" */

    taille=document.getElementById("size").value;              //initialise la variable taille
    taille=parseInt(taille);
    
    limit=document.getElementById("limitscore").value;
    
    if((taille<=2)||(taille>25)||(isNaN(taille))){ //vérifie que la taille entrée par l'utilisateur est valide
    
        window.alert("La taille du jeu doit être entre 3 et 25(inclu). Veuillez entrer une nouvelle valeur.")
        
    }else{ //si elle est valide on crée le jeu
    
    window.addEventListener("keydown", checkKeyPress, false);  //permet au joueur d'utiliser les fleches
     
    var game=document.getElementById("game");
    
    if((game.firstChild==document.getElementById("table"))){                    /*On vérifie si un jeu a déjà été crée (dans le cas d'un reset).
*Si c'est le cas on enlève le premier élément(le jeu)*/
            game.removeChild(game.firstChild);        
    }
    
    /* Le reste du code crée le jeu dans une balise table. Chaque  cellule (td) a un id de la forme id=(i,j) 
     * pour que l'on puisse avoir la position de chaque cellule.
     * On initialise un table n*n où  n est la taille et chaque cellule est vide.
     * Un fois le table créé on y ajoutes les deux premières cases. */
    var table=document.createElement("table");
    table.setAttribute("align","center");
    table.setAttribute("id","table");
    
    for(var i=0;i<taille;i++){
    
        tr=document.createElement("tr");
        
        for(var j=0;j<taille;j++){
        td=document.createElement("td");
        td.setAttribute("id","("+i+","+j+")"); 
        
        tr.appendChild(td);

        }
        table.appendChild(tr);

    }

    game.insertBefore(table,game.firstChild) /*on veut que le jeu soit le premier element de la balise pour qu'il soit plus
     * facile à repérer au moment de la réinitialisation */
    
    
    generateAlea(); 
    generateAlea();
    
}

}

function generateAlea(){
    /* Cette fonction génére aléatoirement une case dans le jeu. Elle est utilisée à la création du jeu et
     * à chaque mouvement */
     
    var cellID="("+Math.floor(Math.random()*(taille))+","+Math.floor(Math.random()*(taille))+")"; //cherche une position aléatoire
    var cell=document.getElementById(""+cellID);

    

       while(cell.textContent !== ""){ //si il y a deja une case à cette position, on recherche d'autres positions jusqu'a en trouver une livre
          cellID="("+Math.floor(Math.random()*(taille))+","+Math.floor(Math.random()*(taille))+")";
          cell=document.getElementById(cellID);
          
       }
      

    //une fois que la cellule vide a été trouvé, on lui donne une valeur entre 2 et 4 (où le 2 a une plus grande probabilité de sortir
    var value= Math.random()< 0.8 ? 2 : 4;
    createCell(cell,value);    
    
    
}

function createCell(cell,value){
/* La fonction prend en argument une cellule et une valeur, puis la dessine dans le table */
   cell.textContent=value;
   cellcolor(cell);
}

function cellcolor(cell){
//pour chaque valeur de cellule on a un style particulier, cette fonction s'occupe de leur donner le bon style
    switch(cell.textContent){
        case "2":
        cell.style.backgroundColor="#eee4da";
        cell.style.fontSize="25px";
        break;
        case "4":
        cell.style.backgroundColor="#F5F5DC";
        cell.style.fontSize="25px";
        break;
        case "8":
        cell.style.backgroundColor="#ffa366";
        cell.style.color="white";
        cell.style.fontSize="25px";
        break;
        case "16":
        cell.style.backgroundColor="#ff8533";
        cell.style.color="white";
        cell.style.fontSize="25px";
        break;
        case "32":
        cell.style.backgroundColor="#FF7F50";
        cell.style.color="white";
        cell.style.fontSize="25px";
        break;
        case "64":
        cell.style.backgroundColor="#ff471a";
        cell.style.color="white";
        cell.style.fontSize="25px";
        break;
        case "128":
        cell.style.backgroundColor="#fff0b3";
        cell.style.color="white";
        break;
        case "256":
        cell.style.backgroundColor="#ffeb99";
        cell.style.color="white";
        break;
        case "512":
        cell.style.backgroundColor="#ffe680";
        cell.style.color="white";
        break;
        case "1024":
        cell.style.backgroundColor="#ffdb4d";
        cell.style.color="white";
        cell.style.fontSize="15px";
        break;
        case "2048":
        cell.style.backgroundColor="#FFD700";
        cell.style.color="white";
        cell.style.fontSize="15px";
        break;
        default:
        cell.style.backgroundColor="#CDC1B4"; 
        cell.style.color="#79756C";
        cell.style.fontSize="25px";
        break;
    }
}


/* Stratégie de mouvement:
 * Pour les mouvements verticaux (haut et bas), on traverse le tableau par colonne puis par ligne dans une boucle for.
        * La premiere cellule sur laquelle on pointe est toujours la deuxieme en partant du haut (si on fait un haut()) et
        * la deuxieme en partant du bas (si on fait un bas()).
        * A chaque tour, on pointe sur une cellule puis celle au dessus d'elle. Si cette dernière est vide on fait monter la celle actuelle puis on étudie la suivante, 
        * si elle est occupée par une case de la meme valeur on les fait fusionner et on ne touche plus à la cellule, sinon on ne fait rien et on ne touche plus a la cellule.
 * Les mouvements horizontaux (gauche et droite) fonctionne de la meme façon sauf qu'on traverse le tableau par ligne puis par colonne.
 */

function haut() {
var cell;
var cell2;
var changes=0; /*evalue le nombre de fusion ou de déplacement fait. S'il est egal à 0, 
 * il n'y a pas de possibilité de déplacement  donc on ne genere pas de case aléatoirement */
var isfused=[]; /* on va y entrer les id des cellules ayant été fusionner afin de ne pas faire fusionner deux fois la même case
 * par exemple pour que (2 2 2 2) donne(0 0 4 4) au lieu de (0 0 0 8) */

for(var j=0;j<taille;j++){
    for(var i=1;i<taille;i++){
   
           cell=document.getElementById("("+i+","+j+")"); //cellule sur l'id actuel
           
           if(cell.textContent !== ""){//si la case contient une valeure
              var ligne=i; //met en mémoire la ligne sur laquelle on est
              
              while(ligne>0){ /*on va évaluer toutes les cases au dessus de l'id actuel et 
               * monter jusqu'a trouver un obstacle ou fusionner. dans les deux derniers cas, on n'a plus besoin d'évaluer les cases
               * au dessus car on sait qu'elles sont occupées*/
               
                cell=document.getElementById("("+ligne+","+j+")");
                cell2=document.getElementById("("+(ligne-1)+","+j+")"); 
                
                 if(cell2.textContent == ""){ //la case monte d'une ligne
                       createCell(cell2,cell.textContent);
                       createCell(cell,"");
                       ligne--; //décrémentation pour passer à la ligne au dessus
                       changes++;
                 }else if ((cell.textContent == cell2.textContent)&&(!contains(isfused,cell2.id))) {
                 /*dans le cas ou deux valeures identique se suivent, on vérifie si la case du dessus a deja 
                  * été fusionné. Si oui on ne fait rien, si non on fusionne */
                       isfused.push(cell2.id);
                       createCell(cell2, (cell.textContent*2));
                       score.textContent = parseInt(score.textContent) + parseInt(cell.textContent*2)+"" ; //actualise le score
                       
                       
                       if(cell2.textContent==limit){//si la case qui se forme est 2048 on passe a l'état gagnant
                           state="winning";
                       }
                       
                       createCell(cell,"");
                       ligne=0; //plus besoin de vérifier les cases au dessus
                       changes++;
                }else {//obstacle, donc plus besoin de vérifier les cases au dessus
                       ligne=0;
                }
                
             }
             
         }
     }
}

if(changes>0){
generateAlea();
moves++;
movecount.textContent=moves;}	//si un changement a été effectué, on génére une case aléatoirement et on incrémente le nomve de mouvement
}

function bas() {
var cell;
var cell2;
var changes=0;
var isfused=[];

for(var j=0;j<taille;j++){
    for(var i=(taille-2);i>=0;i--){
           
           cell=document.getElementById("("+i+","+j+")");
           
           if(cell.textContent !== ""){
              var ligne=i;
              
              while(ligne<(taille-1)){
                cell=document.getElementById("("+ligne+","+j+")");
                cell2=document.getElementById("("+(ligne+1)+","+j+")"); 
                
                 if(cell2.textContent == ""){
                       createCell(cell2,cell.textContent);
                       createCell(cell,"");
                       ligne++; 
                       changes++;
                 }else if ((cell.textContent == cell2.textContent)&&(!contains(isfused,cell2.id))) {
                       isfused.push(cell2.id);
                       createCell(cell2, (cell.textContent*2));
                       score.textContent = parseInt(score.textContent) + parseInt(cell.textContent*2)+"" ;
                       
                       if(cell2.textContent==limit){
                           state="winning";
                       }
                       
                       createCell(cell,"");
                       ligne=(taille-1);
                       changes++;
                
                }else {
                       ligne=(taille-1);
                } 
             }
             
         }
     }
     
}

if(changes>0){
generateAlea();
moves++;
movecount.textContent=moves;}	
}

function gauche() {
var cell;
var cell2;
var changes=0;
var isfused=[];

for(var i=0;i<taille;i++){
    for(var j=1;j<taille;j++){
        
           cell=document.getElementById("("+i+","+j+")");
           
           if(cell.textContent !== ""){
              var col=j;
              
              while(col>0){
                cell=document.getElementById("("+i+","+(col)+")");
                cell2=document.getElementById("("+i+","+(col-1)+")"); 
                
                 if(cell2.textContent == ""){
                       createCell(cell2,cell.textContent);
                       createCell(cell,"");
                       col--; 
                       changes++;
                 }else if ((cell.textContent == cell2.textContent)&&(!contains(isfused,cell2.id))) {
                       isfused.push(cell2.id);
                       createCell(cell2, (cell.textContent*2));
                       score.textContent = parseInt(score.textContent) + parseInt(cell.textContent*2)+"" ;
                       
                       if(cell2.textContent==limit){
                           state="winning";
                       }
                       
                       createCell(cell,"");
                       col=0;
                       changes++;
                       }else{
                       col=0;
                } 
             }
             
         }
     }
}

if(changes>0){
generateAlea();
moves++;
movecount.textContent=moves;}	
}

function droite() {
var cell;
var cell2;
var changes=0;
var isfused=[];

for(var i=0;i<taille;i++){
    for(var j=(taille-2);j>=0;j--){
    
           cell=document.getElementById("("+i+","+j+")");
           
           if(cell.textContent !== ""){
              var col=j;
              
              while(col<(taille-1)){
                cell=document.getElementById("("+i+","+(col)+")");
                cell2=document.getElementById("("+i+","+(col+1)+")"); 
                
                 if(cell2.textContent == ""){
                       createCell(cell2,cell.textContent);
                       createCell(cell,"");
                       col++; 
                       changes++;
                 }else if ((cell.textContent == cell2.textContent)&&(!contains(isfused,cell2.id))) {
                       isfused.push(cell2.id);
                       createCell(cell2, (cell.textContent*2));
                       score.textContent = parseInt(score.textContent) + parseInt(cell.textContent*2)+"" ;
                       
                       if(cell2.textContent==limit){
                           state="winning";
                       }
                       
                       createCell(cell,"");
                       col=(taille-1);
                       changes++;
                }else {
                       col=(taille-1);
                } 
             }
             
         }
     }
}
if(changes>0){
generateAlea();
moves++;
movecount.textContent=moves;}	
}

function contains(a, obj) { //vérifie si une cellule a été fusioné
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function selectManager(){ //on donne au joueur la possibilité de changer la limite sous condition qu'il n'ait pas trop avancé dans le jeu
    if ((moves<=50)&&(state=="playing")){
    limit=document.getElementById("limitscore").value; 
    window.alert("La limite a été modifiée avec succès");    
    }else{
    window.alert("Vous êtes trop avancé dans le jeu pour changer la limite") ;   
    }
}

function checkKeyPress(key){ /* gère les mouvements de flèche en utilisant leur keycode.
 * pour chaque mouvement, on appelle la fonction correspondante puis on vérifie si le joueur a gagné et ensuite si il a perdu */
 
    if (key.keyCode === 38){
        haut();

		if(state=="winning"){
		winning();    
		}else{
		lostcheck();    
		}
	}
	if (key.keyCode === 40){
	    bas();

		if(state=="winning"){
		winning();    
		}else{
		lostcheck();    
		}
	}
	if (key.keyCode === 37){
	    gauche();

		if(state=="winning"){
		winning();    
		}else{
		lostcheck();    
		}
	}
	if (key.keyCode === 39){
	    droite();

		if(state=="winning"){
		winning();    
		}else{
		lostcheck();    
		}
	}
}

function winning(){ //En cas de victoire on affiche le message gagnant
var winboard= document.getElementById("winningBoard");
var wincell= document.getElementById("wincell");
var wincellcontent=wincell.firstChild;
 
           switch(limit){
               case "1024":
               wincell.style.backgroundColor="#ffdb4d";
               wincell.style.color="white";
               wincell.style.fontSize="25px";
               wincellcontent.textContent="1024";
               break;
               case "512":
               wincell.style.backgroundColor="#ffe680";
               wincell.style.color="white";
               wincellcontent.textContent="512";
               break;
               case "256":
               wincell.style.backgroundColor="#ffeb99";
               wincell.style.color="white";
               wincellcontent.textContent="256";
               break;
               case "128":
               wincell.style.backgroundColor="#fff0b3";
               wincell.style.color="white";
               wincellcontent.textContent="128";
               break;
               default:
               wincell.style.backgroundColor="#ffeb99";
               wincell.style.color="white";
               wincell.style.fontSize="25px";
               wincellcontent.textContent="2048";
           }
            
           winningscore.textContent+=" " + score.textContent; //affiche le score du gagnant
           winboard.style.visibility="visible";//rend le message gagnant visible
           window.removeEventListener("keydown", checkKeyPress, false); //empeche le joueur d'utiliser les fleches une fois le jeu finit

   
         
}

/* Les fonctions upcheck(),downcheck(),leftcheck() et rightcheck() sont des simulations de mouvement.
 * Elles sont comme les fonctions haut(),bas(0),gauche() et droite() sauf qu'elle ne font pas les mouvements.
 * Elle vérifie juste si il y'a des mouvements possible dans chacune des directions retourne une valeur. 
 * Si elle est égale à 0, il n'y a pas de mouvement possible dans la direction.
 * Les fonctions sont utilisée pour savoir si on a perdu. 
 * Si chacune des fonctions retourne 0 il n'y a plus de déplacement possible et le joueur a perdu.
 */
 
function lostcheck(){ //En cas de victoire on affiche le message perdant
    var lostboard= document.getElementById("losingBoard");
    
    var depHaut=upcheck();
    var depBas=downcheck();
    var depGauche=leftcheck();
    var depDroit=rightcheck();
    
    if ((depHaut==0)&&(depBas==0)&&(depGauche==0)&&(depDroit==0)){
       
       lostboard.style.visibility="visible"; //affiche le message perdant
       window.removeEventListener("keydown", checkKeyPress, false); //empeche le joueur d'utiliser les fleches une fois le jeu finit
    }
    
}

function upcheck() {
var cell;
var cell2;
var changes=0;

for(var j=0;j<taille;j++){
    for(var i=1;i<taille;i++){
    
           cell=document.getElementById("("+i+","+j+")");
           
           if(cell.textContent !== ""){
              var ligne=i;
              
              while(ligne>0){
                cell=document.getElementById("("+ligne+","+j+")");
                cell2=document.getElementById("("+(ligne-1)+","+j+")"); 
                
                 if(cell2.textContent == ""){
                       ligne--; 
                       changes++;
                       
                 }else if (cell.textContent == cell2.textContent) {
                       changes++;
                       ligne=0;
                }else{
                       ligne=0;
                } 
             }
             
         }
     }
}

return changes;
}

function downcheck(){
var cell;
var cell2;
var changes=0;

for(var j=0;j<taille;j++){
    for(var i=(taille-2);i>=0;i--){
           
           cell=document.getElementById("("+i+","+j+")");
           
           if(cell.textContent !== ""){
              var ligne=i;
              
              while(ligne<(taille-1)){
                cell=document.getElementById("("+ligne+","+j+")");
                cell2=document.getElementById("("+(ligne+1)+","+j+")"); 
                
                 if(cell2.textContent == ""){
                       ligne++; 
                       changes++;
                 }else if (cell.textContent == cell2.textContent) {
                       ligne=(taille-1);
                       changes++;
                }else{
                       ligne=(taille-1);
                } 
             }
             
         }
     }
     
}   
return changes;
}

function leftcheck(){
var cell;
var cell2;
var changes=0;

for(var i=0;i<taille;i++){
    for(var j=1;j<taille;j++){
    
           cell=document.getElementById("("+i+","+j+")");
           
           if(cell.textContent !== ""){
              var col=j;
              
              while(col>0){
                cell=document.getElementById("("+i+","+col+")");
                cell2=document.getElementById("("+i+","+(col-1)+")"); 
                
                 if(cell2.textContent == ""){
                       col--; 
                       changes++;
                 }else if (cell.textContent == cell2.textContent) {
                       col=0;
                       changes++;
                }else{
                       col=0;
                } 
             }
             
         }
     }
} 
return changes;
}

function rightcheck(){
var cell;
var cell2;
var changes=0;

for(var i=0;i<taille;i++){
    for(var j=(taille-2);j>=0;j--){
    
           cell=document.getElementById("("+i+","+j+")");
           
           if(cell.textContent !== ""){
              var col=j;
              
              while(col<(taille-1)){
                cell=document.getElementById("("+i+","+col+")");
                cell2=document.getElementById("("+i+","+(col+1)+")"); 
                
                 if(cell2.textContent == ""){
                       col++; 
                       changes++;
                 }else if (cell.textContent == cell2.textContent) {
                       col=(taille-1);
                       changes++;
                }else{
                       col=(taille-1);
                } 
             }  
         }
     }
}
 return changes;  
}
