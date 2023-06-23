const Weight = require('../models/weight.model');
const Project = require('../models/project.model');

const sum = function(matrix){
    const lignes = matrix.length;
    const colonnes = matrix[0].length;
  
    let sommes = new Array(colonnes).fill(0);
  
    for (let j = 0; j < colonnes; j++) {
      for (let i = 0; i < lignes; i++) {
        sommes[j] += matrix[i][j];
      }
    }
    return sommes;
};

const normalizePairWiseMAtrix = function(matrix, sum){
    const lignes = matrix.length;
    const colonnes = matrix[0].length;
    let matrice = [];
    for (let i = 0; i < colonnes; j++) {

      for (let j = 0; j < lignes; i++) {
        matrice[i][j] = matrix[i][j]/sum[i];
      }
    }
    return matrice;
}
const criteriaWeight = function(matrix){
    
    const lignes = matrix.length;
    const colonnes = matrix[0].length;
  
    let criteriaWeight = new Array(lignes).fill(0);
  
    for (let i = 0; i < lignes; i++) {
        let sum = 0;
        for (let j = 0; j < colonnes; j++) {
            sum += matrix[i][j];
        }
        criteriaWeight[i] = sum;
    }
    return criteriaWeight;
}

const criteriaWeightSum = function(matrix, criteriaWeight){
    const lignes = matrix.length;
    const colonnes = matrix[0].length;
    let matrice = [];
    let criteriaWeightSum = [];

    for (let i = 0; i < colonnes; j++) {
        let sum = 0 ;
        for (let j = 0; j < lignes; i++) {
            matrice[i][j] = matrix[i][j]*criteriaWeight[j];
            sum += matrice[i][j];
        }
        criteriaWeightSum[i] = sum;
    }
    return criteriaWeightSum;
};

const lamdaI = function(criteriaWeightSum, criteriaWeight){
    const lignes = criteriaWeight.length;
    let lamdaI = [];

    for(let i=0 ; i<lignes; i++){
        lamdaI[i] = criteriaWeightSum[i]/criteriaWeight[i];
    }
    return lamdaI;
}

const lamdaMax = function(lamdaI){
    const lignes = lamdaI.length;
    let lamdaMax = 0;
    for(let i=0; i<lignes; i++){
        lamdaMax += lamdaI[i];
    }
    lamdaMax/4;
    return lamdaMax;
}

const ci = function(lamdaMax){
    const ci = (lamdaMax - 4) / (4-1);
    return ci;
};

const cr = function(ci){
    return ci/0.9;
}

const CreateWeight = (async (req, res) =>{
    const{matrix} = req.body;
    let somme = sum(matrix); 
    let normalize = normalizePairWiseMAtrix(matrix, somme);
    let criteria = criteriaWeight(normalize);
    let criteriaSum = criteriaWeightSum(matrix, criteria);
    let lamdaI1 = lamdaI(criteriaSum, criteria);
    let lamdaMax1 = lamdaMax(lamdaI1);
    let ci1 = ci(lamdaMax1)
    let cr1 = cr(ci1);

    if(cr1 < 0.1){
        let weights = [];
        const projects = await Project.find();
        const n = projects.length;
        let total = 0;
        for(let i =0; i<n; i++)
        {
            total = (projects[i].surface * criteria[i]) + (projects[i].budget * criteria[i]) + (projects[i].cultureType * criteria[i]) + (projects[i].duration * criteria[i]);
            weights.push(total);
        }
        try{
            const weight = await Weight.create({
                investor: req.body.investor,
                projects: projects,
                criteriaWeights: weights
            }) 
        }
        catch(err){

        }
    }
})