const ingredientdiv = document.getElementById("ingredient-inputs");
const instructiondiv = document.getElementById("instruction-inputs"); 
const extraIngredientsdiv = document.getElementById("extra_ingredients");
const extraInstructionsdiv = document.getElementById("extra_instructions");
var numOfIngredientInputs = 0;
var numOfInstructionInputs = 0;

createIngredientInput()
createInstructionInput()

function createIngredientInput(){
    console.log("ingr");
    var inputElem = document.createElement("input");
    inputElem.type="text"
    inputElem.classList.add("newfield");
    var n = "ingredient" + numOfIngredientInputs;
    numOfIngredientInputs += 1;
    inputElem.name=n;
    inputElem.placeholder="Add an ingredient";
    ingredientdiv.appendChild(inputElem);

    extraIngredientsdiv.value = numOfIngredientInputs;

    inputElem.addEventListener('input', () =>{
        if(inputElem.classList.contains("newfield")){
            inputElem.classList.remove("newfield");
            createIngredientInput();
        }
    });
}

function createInstructionInput(){
    console.log("instr");
    var inputElem = document.createElement("input");
    inputElem.type="text"
    inputElem.classList.add("newfield");
    var n = "instruction" + numOfInstructionInputs;
    numOfInstructionInputs += 1;
    inputElem.name=n;
    inputElem.placeholder="Add an instruction";
    instructiondiv.appendChild(inputElem);

    extraInstructionsdiv.value = numOfInstructionInputs;

    inputElem.addEventListener('input', () => {
        if(inputElem.classList.contains("newfield")){
            inputElem.classList.remove("newfield");
            createInstructionInput();
        }
    });
}